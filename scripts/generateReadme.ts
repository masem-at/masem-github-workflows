import { readFileSync, writeFileSync } from "fs";
import { callOpenAPI } from "./utils/openai";




export async function generateReadme() {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    const bot = pkg.masmBot;
    const prompt = `
        You're a developer documentation writer. Create a full README.md for this project:

        - Name: ${bot.name}
        - Description: ${bot.Description}
        - repoUrl: ${bot.repoUrl || 'no'}
        - websiteUrl: ${bot.websiteUrl || 'no'}

        Include:
        1. Project Intro
        2. Features List
        3. Installations Instructions
        4. Code example
        5. Placeholder for an usage image (./assets/usage.svg)
        6. Links to masem.it, GitHub and project page
    `.trim();

    const content = await callOpenAPI(prompt);
    if (!content) throw new Error('No README content generated');

    writeFileSync('README.md', content.trim());
    console.log('✅ README.md written');
}