with open("src/components/layout/navbar.tsx", "r", encoding="utf-8") as f:
    content = f.read()
# Fix missing closing quote on line 8
content = content.replace('"仪表盘 }', '"仪表盘" }')
content = content.replace('"仪表盘 }', '"仪表盘" }')
with open("src/components/layout/navbar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed")
