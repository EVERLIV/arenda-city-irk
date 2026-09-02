# Deploy to supabase-arendacity (72.56.247.221) only. Never touches Thai Renty.
param(
  [string]$EnvFile = ".env.local",
  [string]$AppDir = "/opt/arenda-city-web",
  [string]$Domain = "arendacity.ru"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Read-EnvFile([string]$path) {
  $vars = @{}
  Get-Content $path | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    if ($_ -match '^(?<k>[A-Z0-9_]+)=(?<v>.*)$') {
      $vars[$Matches.k] = $Matches.v
    }
  }
  return $vars
}

if (-not (Test-Path $EnvFile)) { throw "Env file not found: $EnvFile" }

$envVars = Read-EnvFile $EnvFile
$hostName = if ($envVars.SSH_HOST) { $envVars.SSH_HOST } else { "72.56.247.221" }
$user = if ($envVars.SSH_USER) { $envVars.SSH_USER } else { "root" }
$port = if ($envVars.SSH_PORT) { [int]$envVars.SSH_PORT } else { 22 }
$keyFile = $envVars.SSH_IDENTITY_FILE
$password = $envVars.SSH_PASSWORD

if ($hostName -eq "186.246.5.42") {
  throw "Refusing to deploy to Thai Renty. Target must be supabase-arendacity."
}

if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
  Install-Module Posh-SSH -Force -Scope CurrentUser -AllowClobber
}
Import-Module Posh-SSH

if ($keyFile -and (Test-Path $keyFile)) {
  $credential = New-Object System.Management.Automation.PSCredential($user, (New-Object System.Security.SecureString))
  $session = New-SSHSession -ComputerName $hostName -Port $port -Credential $credential -KeyFile $keyFile -AcceptKey -ConnectionTimeout 30
} elseif ($password) {
  $sec = ConvertTo-SecureString $password -AsPlainText -Force
  $credential = New-Object System.Management.Automation.PSCredential($user, $sec)
  $session = New-SSHSession -ComputerName $hostName -Port $port -Credential $credential -AcceptKey -ConnectionTimeout 30
} else {
  throw "No SSH key or SSH_PASSWORD in $EnvFile"
}

if (-not $session) { throw "SSH connection failed to $hostName" }
Write-Host "Connected to $hostName"

function Invoke-Remote([string]$cmd) {
  $result = Invoke-SSHCommand -SessionId $session.SessionId -Command $cmd -TimeOut 1200
  if ($result.Output) { $result.Output | ForEach-Object { Write-Host $_ } }
  if ($result.Error) { $result.Error | ForEach-Object { Write-Host $_ -ForegroundColor Yellow } }
  if ($result.ExitStatus -ne 0) { throw "Remote command failed ($($result.ExitStatus))" }
}

Invoke-Remote "command -v docker >/dev/null 2>&1 || (apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq docker.io docker-compose-plugin nginx)"
Invoke-Remote "mkdir -p $AppDir"

$archive = Join-Path $env:TEMP "arenda-city-web.tar.gz"
if (Test-Path $archive) { Remove-Item $archive -Force }
& tar -czf $archive --exclude=node_modules --exclude=.next --exclude=.git -C $root .

Set-SCPItem -ComputerName $hostName -Port $port -Credential $credential -Path $archive -Destination "/tmp/arenda-city-web.tar.gz" -AcceptKey
Remove-Item $archive -Force

Invoke-Remote "mkdir -p $AppDir && tar -xzf /tmp/arenda-city-web.tar.gz -C $AppDir && rm /tmp/arenda-city-web.tar.gz"

$deployEnvLines = @(
  "NEXT_PUBLIC_SITE_URL=https://$Domain",
  "NEXT_PUBLIC_SUPABASE_URL=$($envVars.NEXT_PUBLIC_SUPABASE_URL)",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY=$($envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY)",
  "SUPABASE_OBJECTS_TABLE=$($envVars.SUPABASE_OBJECTS_TABLE)",
  "SUPABASE_AGENCY_NAME=$($envVars.SUPABASE_AGENCY_NAME)",
  "SUPABASE_MANAGER_NAME=$($envVars.SUPABASE_MANAGER_NAME)",
  "TELEPHONY_PROVIDER=mock"
)
$deployEnvB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(($deployEnvLines -join "`n")))
Invoke-Remote "echo $deployEnvB64 | base64 -d > $AppDir/deploy/.env"
Invoke-Remote "chmod +x $AppDir/deploy/deploy.sh && DOMAIN=$Domain APP_DIR=$AppDir bash $AppDir/deploy/deploy.sh"

Remove-SSHSession -SessionId $session.SessionId | Out-Null
Write-Host "Deploy finished. Site: https://$Domain"
