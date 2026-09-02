# SSH tunnel to self-hosted Supabase Postgres on Timeweb
# Loads values from .env.local automatically.
# Usage: npm run db:tunnel

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env.local"

function Read-DotEnv([string]$path) {
  $map = @{}
  if (-not (Test-Path $path)) { return $map }
  Get-Content $path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) { return }
    $idx = $line.IndexOf("=")
    if ($idx -lt 1) { return }
    $key = $line.Substring(0, $idx).Trim()
    $value = $line.Substring($idx + 1).Trim()
    if (
      ($value.StartsWith('"') -and $value.EndsWith('"')) -or
      ($value.StartsWith("'") -and $value.EndsWith("'"))
    ) {
      $value = $value.Substring(1, $value.Length - 2)
    }
    $map[$key] = $value
  }
  return $map
}

$dotenv = Read-DotEnv $envFile

function Get-Cfg([string]$name, [string]$fallback = "") {
  if ($env:$name) { return $env:$name }
  if ($dotenv.ContainsKey($name) -and $dotenv[$name]) { return $dotenv[$name] }
  return $fallback
}

$SshHost = Get-Cfg "SSH_HOST"
$SshUser = Get-Cfg "SSH_USER"
$SshPort = [int](Get-Cfg "SSH_PORT" "22")
$IdentityFile = Get-Cfg "SSH_IDENTITY_FILE"
$LocalPort = [int](Get-Cfg "SSH_LOCAL_DB_PORT" "54322")
$RemoteDbHost = Get-Cfg "SSH_REMOTE_DB_HOST" "127.0.0.1"
$RemoteDbPort = [int](Get-Cfg "SSH_REMOTE_DB_PORT" "5432")

if (-not $SshHost -or -not $SshUser) {
  Write-Error "Set SSH_HOST and SSH_USER in .env.local"
  exit 1
}

$sshArgs = @(
  "-N",
  "-L", "${LocalPort}:${RemoteDbHost}:${RemoteDbPort}",
  "-p", "$SshPort",
  "-o", "ExitOnForwardFailure=yes",
  "-o", "ServerAliveInterval=30"
)

if ($IdentityFile) {
  if (-not (Test-Path $IdentityFile)) {
    Write-Error "SSH_IDENTITY_FILE not found: $IdentityFile"
    exit 1
  }
  $sshArgs += @("-i", $IdentityFile)
}

$sshArgs += "${SshUser}@${SshHost}"

Write-Host "SSH tunnel: localhost:${LocalPort} -> ${RemoteDbHost}:${RemoteDbPort}"
Write-Host "via ${SshUser}@${SshHost}:${SshPort}"
Write-Host "Keep this window open, then run: npm run db:introspect"
Write-Host ""

& ssh @sshArgs
