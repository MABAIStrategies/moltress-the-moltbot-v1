#!/usr/bin/env python3
import argparse, json, subprocess, sys

FIELDS = [
  {"name":"Status","type":"single","options":["Backlog","Ready","In Progress","Review","QA","Security Review","Done"]},
  {"name":"Phase","type":"single","options":["Phase 1","Phase 2","Phase 3","Phase 4","Phase 5","Phase 6","Phase 7"]},
  {"name":"Component","type":"single","options":["Agent","Web","Mobile","SDK","Docs","Infra"]},
  {"name":"Priority","type":"single","options":["P0","P1","P2","P3"]},
  {"name":"Risk","type":"single","options":["Low","Medium","High"]},
  {"name":"Sprint","type":"text"},
]

def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        print(p.stderr.strip(), file=sys.stderr)
        sys.exit(p.returncode)
    return p.stdout.strip()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--project-id", required=True)
    args = ap.parse_args()

    for field in FIELDS:
        if field["type"] == "text":
            run(["gh","api","graphql","-f","query=@project/graphql/03-create-text-field.graphql",
                 "-f",f"projectId={args.project_id}",
                 "-f",f"name={field['name']}"])
            print(f"Created text field: {field['name']}")
        else:
            options = [{"name": o} for o in field["options"]]
            run(["gh","api","graphql",
                 "-f","query=@project/graphql/02-create-single-select-field.graphql",
                 "-f",f"projectId={args.project_id}",
                 "-f",f"name={field['name']}",
                 "-f",f"options={json.dumps(options)}"])
            print(f"Created single-select field: {field['name']}")

if __name__ == "__main__":
    main()
