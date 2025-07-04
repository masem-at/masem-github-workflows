import { generateReadme } from "./generateReadme";
import { generateDiagram } from "./generateDiagram";





async function main() {
  await generateReadme();
  await generateDiagram();
}


main().catch(err => {
  console.error('❌ Failed to build README or diagram:', err);
  process.exit(1);
});