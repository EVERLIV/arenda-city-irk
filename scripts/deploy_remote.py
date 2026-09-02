#!/usr/bin/env python3
"""Deploy to supabase-arendacity only. Never targets Thai Renty (186.246.5.42)."""

from __future__ import annotations

import base64
import os
import subprocess
import sys
import tarfile
import tempfile
from pathlib import Path

import paramiko

ROOT = Path(__file__).resolve().parents[1]
THAI_RENTY_IP = "186.246.5.42"
DEFAULT_HOST = "72.56.247.221"
APP_DIR = "/opt/arenda-city-web"
DOMAIN = "arendacity.ru"


def read_env(path: Path) -> dict[str, str]:
    data: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        data[key.strip()] = value.strip()
    return data


def run_remote(client: paramiko.SSHClient, command: str, timeout: int = 1200) -> None:
    print(f"$ {command[:120]}{'...' if len(command) > 120 else ''}")
    _, stdout, stderr = client.exec_command(command, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    if out:
        print(out.rstrip())
    if err:
        print(err.rstrip(), file=sys.stderr)
    if code != 0:
        raise RuntimeError(f"Remote command failed with exit code {code}")


def main() -> None:
    env_file = ROOT / ".env.local"
    if not env_file.exists():
        raise SystemExit(f"Missing {env_file}")

    env = read_env(env_file)
    host = env.get("SSH_HOST", DEFAULT_HOST)
    if host == THAI_RENTY_IP:
        raise SystemExit("Refusing to deploy to Thai Renty server.")

    user = env.get("SSH_USER", "root")
    port = int(env.get("SSH_PORT", "22"))
    password = env.get("SSH_PASSWORD")
    key_file = env.get("SSH_IDENTITY_FILE")

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    connect_kwargs: dict = {"hostname": host, "port": port, "username": user, "timeout": 30}
    if key_file and Path(key_file).exists():
        connect_kwargs["key_filename"] = key_file
    elif password:
        connect_kwargs["password"] = password
    else:
        raise SystemExit("No SSH key or SSH_PASSWORD in .env.local")

    print(f"Connecting to {host}...")
    client.connect(**connect_kwargs)
    print("Connected.")

    run_remote(
        client,
        "command -v docker >/dev/null 2>&1 || "
        "(apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq docker.io docker-compose-plugin nginx)",
    )
    run_remote(client, f"mkdir -p {APP_DIR}")

    with tempfile.NamedTemporaryFile(suffix=".tar.gz", delete=False) as tmp:
        archive_path = Path(tmp.name)

    exclude = {".git", "node_modules", ".next"}
    with tarfile.open(archive_path, "w:gz") as tar:
        for item in ROOT.iterdir():
            if item.name in exclude:
                continue
            tar.add(item, arcname=item.name)

    sftp = client.open_sftp()
    remote_archive = "/tmp/arenda-city-web.tar.gz"
    print(f"Uploading archive to {remote_archive}...")
    sftp.put(str(archive_path), remote_archive)
    sftp.close()
    archive_path.unlink(missing_ok=True)

    run_remote(
        client,
        f"mkdir -p {APP_DIR} && tar -xzf {remote_archive} -C {APP_DIR} && rm {remote_archive}",
    )

    deploy_env = "\n".join(
        [
            f"NEXT_PUBLIC_SITE_URL=https://{DOMAIN}",
            f"NEXT_PUBLIC_SUPABASE_URL={env.get('NEXT_PUBLIC_SUPABASE_URL', '')}",
            f"NEXT_PUBLIC_SUPABASE_ANON_KEY={env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')}",
            f"SUPABASE_OBJECTS_TABLE={env.get('SUPABASE_OBJECTS_TABLE', 'properties')}",
            f"SUPABASE_AGENCY_NAME={env.get('SUPABASE_AGENCY_NAME', 'АрендаСити')}",
            f"SUPABASE_MANAGER_NAME={env.get('SUPABASE_MANAGER_NAME', 'Анастасия Романова')}",
            "TELEPHONY_PROVIDER=mock",
        ]
    )
    encoded = base64.b64encode(deploy_env.encode("utf-8")).decode("ascii")
    run_remote(client, f"echo {encoded} | base64 -d > {APP_DIR}/deploy/.env")
    run_remote(
        client,
        f"chmod +x {APP_DIR}/deploy/deploy.sh && DOMAIN={DOMAIN} APP_DIR={APP_DIR} bash {APP_DIR}/deploy/deploy.sh",
        timeout=1800,
    )

    client.close()
    print(f"Deploy finished. Check https://{DOMAIN}")


if __name__ == "__main__":
    main()
