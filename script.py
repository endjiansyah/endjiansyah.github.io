import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/18BZBflJ3xAhw6McwDHtQpdBK8b_L98xX'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Google Drive folder pages usually contain the file data in a script tag
matches = re.findall(r'AF_initDataCallback\(\{key: \'ds:1\',.*?data:(\[.*\])\}\);</script>', html)
if not matches:
    matches = re.findall(r'window\["\_docs\_annotate\_canvas\_data"\]\s*=\s*(\{.*?\});', html)

# A more generic approach is to just look for file IDs if we know they are 33 chars long,
# or we can look for the filenames and find their nearby IDs.
filenames = [
    "foto bersama.jpg", "hasil game.jpg", "kelas.jpg",
    "materi makecode arcade.jpg", "materi prompt.jpg",
    "penyerahan sertifikat.jpg", "suasana kelas.jpg"
]

for name in filenames:
    # Find filename in html
    idx = html.find(name)
    if idx != -1:
        # Extract a chunk of html around the filename
        chunk = html[max(0, idx-1000):min(len(html), idx+1000)]
        # File IDs are usually 33 characters long, alphanumeric with hyphens and underscores
        ids = re.findall(r'\["([a-zA-Z0-9_-]{28,33})"\]', chunk)
        if not ids:
             ids = re.findall(r'https://drive.google.com/file/d/([a-zA-Z0-9_-]{28,33})', chunk)
        if not ids:
             ids = re.findall(r'([a-zA-Z0-9_-]{33})', chunk)
        print(f"Name: {name}, Found IDs near it: {list(set(ids))[:3]}")
    else:
        print(f"Name: {name} not found in HTML.")
