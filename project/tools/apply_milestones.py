#!/usr/bin/env python3
import argparse, json, subprocess, sys

def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        print(p.stderr.strip(), file=sys.stderr)
        sys.exit(p.returncode)
    return p.stdout.strip()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--owner", required=True)
    ap.add_argument("--repo", required=True)
    ap.add_argument("--milestones", required=True)
    args = ap.parse_args()

    with open(args.milestones, "r", encoding="utf-8") as f:
        milestones = json.load(f)

    existing = run(["gh","api",f"repos/{args.owner}/{args.repo}/milestones?state=all"])
    existing_titles = {m["title"] for m in json.loads(existing)}

    for ms in milestones:
        title = ms["title"]
        desc = ms.get("description","")
        due = ms.get("due_on")
        if title in existing_titles:
            print(f"Milestone exists (skipping): {title}")
            continue
        cmd = ["gh","api","-X","POST",f"repos/{args.owner}/{args.repo}/milestones",
               "-f",f"title={title}","-f",f"description={desc}"]
        if due:
            cmd += ["-f", f"due_on={due}"]
        run(cmd)
        print(f"Created milestone: {title}")

if __name__ == "__main__":
    main()
