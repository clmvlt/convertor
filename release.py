import json
import re
import subprocess
import sys
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

REPO = "clmvlt/superconvert"


def get_current_version():
    with open("package.json", "r", encoding="utf-8") as f:
        return json.load(f)["version"]


def update_version(new_version):
    with open("package.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    data["version"] = new_version
    with open("package.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    with open("src-tauri/tauri.conf.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    data["version"] = new_version
    with open("src-tauri/tauri.conf.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    with open("src-tauri/Cargo.toml", "r", encoding="utf-8") as f:
        content = f.read()
    content = re.sub(
        r'^version = ".*?"',
        f'version = "{new_version}"',
        content,
        count=1,
        flags=re.MULTILINE,
    )
    with open("src-tauri/Cargo.toml", "w", encoding="utf-8") as f:
        f.write(content)


def run(cmd, check=True):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"\n  Erreur: {result.stderr.strip()}")
        sys.exit(1)
    return result


def main():
    current = get_current_version()

    print()
    print("  SuperConvert - Release")
    print("  ===================")
    print()

    status = run(["git", "status", "--porcelain"]).stdout.strip()
    if status:
        print("  Il y a des changements non commites.")
        print("  Utilisez push.py d'abord, puis relancez release.py.")
        print()
        sys.exit(1)

    version = input(f"  Version de release [{current}]: ").strip() or current

    if not re.match(r"^\d+\.\d+\.\d+$", version):
        print(f"  Format invalide: {version} (attendu: x.y.z)")
        sys.exit(1)

    tag = f"v{version}"

    existing = run(["git", "tag", "-l", tag], check=False).stdout.strip()
    if existing == tag:
        print(f"  Le tag {tag} existe deja.")
        sys.exit(1)

    if version != current:
        print(f"  Version: {current} -> {version}")
        update_version(version)
        run(["git", "add", "-A"])
        run(["git", "commit", "-m", f"chore: bump version to {version}"])

    print()
    print(f"  Creation du tag {tag}...")
    run(["git", "tag", "-a", tag, "-m", f"Release {tag}"])

    print(f"  Push sur origin...")
    run(["git", "push", "origin", "main"])
    run(["git", "push", "origin", tag])

    print()
    print(f"  Tag {tag} pushe. GitHub Actions va builder:")
    print(f"    - Windows (NSIS + MSI)")
    print(f"    - macOS ARM + Intel (DMG)")
    print(f"    - Linux (AppImage + DEB)")
    print()
    print(f"  Suivre le build: https://github.com/{REPO}/actions")
    print(f"  Release:         https://github.com/{REPO}/releases/tag/{tag}")
    print()


if __name__ == "__main__":
    main()
