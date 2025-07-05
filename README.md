# masem-github-workflows

A centralized repository of reusable GitHub Actions workflows, designed to streamline development and automation across all repositories and projects — both inside and outside the `masem-at` GitHub organization — the tools help developers stay consistent, automate routine work, and accelerate delivery with minimal setup.

## 🔧 What’s Included

This project currently offers the following reusable workflows:

### ✅ README Builder

Automatically generates and commits a project-specific `README.md` based on your package metadata and source code.

- Uses OpenAI to generate developer-friendly documentation
- Includes support for SVG/ASCII usage diagrams
- Writes results to `README.md` and `assets/` folder
- Ideal for monorepos or standardized project setups

## 🔁 How to Use

In your project repo:

```yaml
# .github/workflows/use-shared-readme-builder.yml
name: Use Shared README Builder

on:
  workflow_dispatch:

jobs:
  call-shared-workflow:
    uses: masem-at/masem-github-workflows/.github/workflows/generate-readme.yml@main
    secrets:
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
    permissions:
      contents: write
```

## 💡 Requirements

- Node.js environment with access to source code in `src/`
- `OPENAI_API_KEY` secret must be set in your repo

## 📁 Folder Structure

```
masem-github-workflows/
├── .github/
│   └── workflows/
│       └── generate-readme.yml
└── ...
```

## 📌 Why Centralize?

Centralizing workflows improves consistency, simplifies maintenance, and accelerates onboarding across multiple projects.

## 🌐 Learn More

Visit [masem.at/projects/github-tools](https://masem.at/projects/github-tools) for usage examples and additional automation tools.
