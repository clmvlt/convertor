import json
import re
import subprocess
import sys
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))


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


def run(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"\n  Erreur: {result.stderr.strip()}")
        sys.exit(1)
    return result.stdout.strip()


def main():
    current = get_current_version()

    print()
    print("  Convertor - Push to main")
    print("  ========================")
    print()

    msg = input("  Message du commit: ").strip()
    if not msg:
        print("  Le message ne peut pas etre vide.")
        sys.exit(1)

    version = input(f"  Version [{current}]: ").strip() or current

    if not re.match(r"^\d+\.\d+\.\d+$", version):
        print(f"  Format invalide: {version} (attendu: x.y.z)")
        sys.exit(1)

    if version != current:
        print(f"\n  Version: {current} -> {version}")
        update_version(version)

    print()
    run(["git", "add", "-A"])
    run(["git", "commit", "-m", msg])
    run(["git", "push", "origin", "main"])

    print(f"  Pushe sur origin/main (v{version})")
    print()


if __name__ == "__main__":
    main()
