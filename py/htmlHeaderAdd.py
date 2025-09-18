import os
from pathlib import Path


HEADER_CONTENT = """
    <header id="header">
        <a id="headerDivLeft" href="https://mefamex.com">
            <div id="headerDivLefticonDiv"><img src="/src/components/mefamex_logo_bgb.png" alt="mefamex_logo"></div>
            <div id="headerDivLeftText">MEFAMEX</div>
        </a>
        <div id="headerNavBar">
            <a class="pageA showText showImg" href="/" title="ANASAYFA"> <span>ANASAYFA</span></a>
            <a class="pageA showText showImg" href="/about/" title="PLATFORM"> <span>PLATFORM</span></a>
            <a class="pageA showImg" href="/projects/" title="PROJELER"><span>PROJELER</span> </a>
            <a class="pageA showImg" data-list-index="3" href="/blog/" title="BLOG"><span>BLOG</span></a>
            <a class="pageA  showImg" href="/gallery/" title="GALERİ"><span>GALERİ</span></a>
            <a class="pageA  showImg" href="/contact/" title="İLETİŞİM"><span>İLETİŞİM</span></a>
            <a class="pageA  showImg" href="/cv/" title="CV"><span>CV</span></a>
        </div>
    </header>
"""

def add_or_update_header(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if '<header' in content and '</header>' in content: # Replace existing <header>...</header>
        start = content.find('<header')
        end = content.find('</header>') + len('</header>')
        content = content[:start] + HEADER_CONTENT + content[end:]
    else: # Add <header> after <body>
        if '<body' in content:
            body_index = content.find('<body') + content[content.find('<body'):].find('>') + 1
            content = content[:body_index] + HEADER_CONTENT + content[body_index:]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def run(path=os.getcwd()):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                add_or_update_header(file_path)

if __name__ == "__main__":
    run(path=str(Path(__file__).parent.parent))