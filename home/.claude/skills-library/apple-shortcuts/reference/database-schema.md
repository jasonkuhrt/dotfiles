# Shortcuts Database Schema

For advanced exploration of the ToolKit database:

```sql
-- List all third-party actions
SELECT id FROM Tools
WHERE id NOT LIKE 'com.apple.%'
ORDER BY id;

-- Count by vendor
SELECT
    substr(id, 1, instr(substr(id, instr(id, '.') + 1), '.') + instr(id, '.')) as vendor,
    COUNT(*) as count
FROM Tools
WHERE id NOT LIKE 'com.apple.%'
GROUP BY vendor
ORDER BY count DESC;
```
