# CC Plugins -- Design Notes

## Team Detection Rationale

Why the team-detection flow matters for permission configuration:

- User-level `Skill(*)` doesn't help teammates
- Team projects need project-level permissions
- Without this check, you might configure only for one user while breaking team workflow
