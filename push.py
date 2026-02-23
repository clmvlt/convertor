import subprocess
import sys


def main():
    commit_msg = input("Commit message: ")
    if not commit_msg.strip():
        print("Commit message cannot be empty.")
        sys.exit(1)

    commands = [
        ["git", "add", "."],
        ["git", "commit", "-m", commit_msg],
        ["git", "push", "-u", "origin", "main"],
    ]

    for cmd in commands:
        result = subprocess.run(cmd)
        if result.returncode != 0:
            print(f"Command failed: {' '.join(cmd)}")
            sys.exit(1)


if __name__ == "__main__":
    main()
