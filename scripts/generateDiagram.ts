import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { callOpenAPI } from "./utils/openai";





export async function generateDiagram() {
    const prompt = `
        Generate a concise SVG diagram that shows a developer uses this TypeScript package,
        focusing on method chaining or API flow. No description. Max 50 lines.
    `;

    const content = await callOpenAPI(prompt);
    if (!content) throw new Error('No diagram content generated');

    mkdirSync('assets', { recursive:true });
    writeFileSync('assets/usage.svg', content.trim());
    console.log('✅ Diagram saved to assets/usage.svg');
}