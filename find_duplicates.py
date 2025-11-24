import re
import sys

with open('src/utils/translations.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

keys_seen = {}
duplicates = []

for i, line in enumerate(lines, 1):
    match = re.match(r"^\s*'([^']+)'\s*:", line)
    if match:
        key = match.group(1)
        if key in keys_seen:
            duplicates.append((i, key, keys_seen[key]))
        else:
            keys_seen[key] = i

if duplicates:
    print(f"Found {len(duplicates)} duplicate keys:")
    for line_num, key, first_line in duplicates:
        print(f"  Line {line_num}: '{key}' (first at line {first_line})")
else:
    print("No duplicates found!")
