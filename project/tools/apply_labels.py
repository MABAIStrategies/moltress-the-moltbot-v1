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
    ap.add_argument("--labels", required=True)
    args = ap.parse_args()

    with open(args.labels, "r", encoding="utf-8") as f:
        labels = json.load(f)

    for lbl in labels:
        name = lbl["name"]
        color = lbl.get("color","ededed").lstrip("#")
        desc = lbl.get("description","")
        create_cmd = ["gh","label","create",name,"-R",f"{args.owner}/{args.repo}","--color",color,"--description",desc]
        p = subprocess.run(create_cmd, capture_output=True, text=True)
        if p.returncode == 0:
            print(f"Created label: {name}")
            continue
        run(["gh","label","edit",name,"-R",f"{args.owner}/{args.repo}","--color",color,"--description",desc])
        print(f"Updated label: {name}")

if __name__ == "__main__":
    main()
