const fs = require('fs');
const path = require('path');

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('❌ Missing OPENAI_API_KEY');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const srcDir = path.resolve('src');
const srcFiles = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter(f => f.endsWith('.ts')) : [];
const snippets = srcFiles.map(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  return `### ${file}\n\`\`\`ts\n${content.slice(0, 2000)}\n\`\`\`\n`}).join('\n\n');

const readmePrompt = `
  You're an export developer documentation writer. Create a full README.md for the following TypeScript project:
    - Name: ${pkg.projectName}
    - Description: ${pkg.description}
    - Repo: ${pkg.repoUrl}
    - projectWebsite: ${pkg.websiteUrl}

  Include:
    1. Project Intro
    2. Features List
    3. Installation Instructions
    4. Code example
    5. Placeholder for an usage image (./assets/usage.svg)
    6. Links to masem.at, Github, project page

  Based on this code:
  ${snippets}
`;

fetch('https://api.openai.com/v1/chat/completions', {
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'Authorization':`Bearer ${key}`,
  },
  body: JSON.stringify({
    model:'gpt-3.5-turbo',
    temperature:0.5,
    messages: [
      { role:'system', content:'You are a helpful documentation generator.' },
      { role:'user', content:prompt }
    ]
  })
})
.then(res => res.json())
.then(data => {
  const content = data.choices[0]?.messsage?.content;
  if (!content) {
    console.error('❌ No content from OpenAI', JSON.stringify(data));
    process.exit(1);
  }
  fs.writeFileSync('README.md', content.trim());
  console.log('✅ README.md generated');
})
.catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});