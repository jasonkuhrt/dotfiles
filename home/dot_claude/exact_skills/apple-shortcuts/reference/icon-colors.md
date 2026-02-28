# Shortcut Icon Colors & Glyphs

Reference for `scut manage icon --color <name|int> --glyph <name|int>`.

Source: [Cherri Glyph Search](https://glyphs.cherrilang.org/) by electrikmilk ([GitHub](https://github.com/electrikmilk/shortcuts-glyph-search)).

## Colors

Stored as unsigned int32 in `ZSHORTCUTICON.ZBACKGROUNDCOLORVALUE`. Values from Cherri's `colors.json` (authoritative).

### Named colors (supported by `scut manage icon --color`)

| Name       | Value        |
|------------|-------------|
| red        | 4282601983  |
| darkorange | 4251333119  |
| orange     | 4271458815  |
| yellow     | 4274264319  |
| green      | 4292093695  |
| teal       | 431817727   |
| lightblue  | 1440408063  |
| blue       | 463140863   |
| darkblue   | 946986751   |
| violet     | 2071128575  |
| purple     | 3679049983  |
| pink       | 3980825855  |
| taupe      | 2846468607  |
| gray       | 3031607807  |
| darkgray   | 255         |

Any integer value can also be passed directly: `scut manage icon "Name" --color 463140863`

## Glyphs

Stored as integer in `ZSHORTCUTICON.ZGLYPHNUMBER`. 507 named glyphs available in `shortcuts/glyphs.json` (from Cherri).

### Usage

```bash
# By name (resolved via glyphs.json)
scut manage icon "My Shortcut" --glyph musicNote
scut manage icon "My Shortcut" --glyph airPods

# By number (direct code point)
scut manage icon "My Shortcut" --glyph 59790
```

### Common glyphs

| Name         | Code  | Description          |
|--------------|-------|----------------------|
| musicNote    | 59790 | Music note           |
| shortcuts    | 61440 | Shortcuts app icon   |
| brainHead    | 61532 | Brain/head           |
| home         | 59788 | House                |
| car          | 59766 | Car                  |
| airplane     | 59765 | Airplane             |
| phone        | 59800 | Phone                |
| camera       | 59767 | Camera               |
| mail         | 59793 | Mail envelope        |
| clock        | 59771 | Clock                |
| heart        | 59786 | Heart                |
| star         | 59834 | Star                 |
| sun          | 59839 | Sun                  |
| moon         | 61506 | Moon                 |
| globe        | 59785 | Globe                |

Full list: `jq 'keys[]' shortcuts/glyphs.json` (507 entries).

### Discovery query

Find glyphs in use:

```sql
SELECT i.ZGLYPHNUMBER, s.ZNAME
FROM ZSHORTCUT s
JOIN ZSHORTCUTICON i ON s.ZICON = i.Z_PK
WHERE s.ZTOMBSTONED = 0 OR s.ZTOMBSTONED IS NULL
ORDER BY i.ZGLYPHNUMBER;
```
