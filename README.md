# masem-github-workflows

🛠️ Shared GitHub Actions workflows for projects in the [masem-at](https://github.com/masem-at) organization.

## Workflows

### 🔄 `generate-readme.yml`
Generates and updates the `README.md` of a project using OpenAI, based on:
- `package.json` metadata
- Files in the `src/` folder
- Example usage snippets

> This workflow is designed to be reused in any project repo via:
>
> ```yaml
> uses: masem-at/masem-github-workflows/generate-readme.yml@main
> ```

---

## Usage

1. Add a calling workflow like:

```yaml
# .github/workflows/use-shared-readme-builder.yml
name: Use Shared README Builder

on:
  workflow_dispatch:

jobs:
  call-shared-workflow:
    uses: masem-at/masem-github-workflows/generate-readme.yml@main
```

2. Make sure `OPENAI_API_KEY` is available in repo secrets.
3. Trigger manually in the Actions tab.

---

## License

MIT
