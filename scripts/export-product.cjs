const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Starting Design OS Export...');

const DEST_DIR = 'product-plan';
const ZIP_FILE = 'product-plan.zip';

// Clean previous export
if (fs.existsSync(DEST_DIR)) {
  fs.rmSync(DEST_DIR, { recursive: true, force: true });
}
if (fs.existsSync(ZIP_FILE)) {
  fs.unlinkSync(ZIP_FILE);
}

// Create directories
fs.mkdirSync(DEST_DIR);
fs.mkdirSync(path.join(DEST_DIR, 'prompts'));
fs.mkdirSync(path.join(DEST_DIR, 'instructions'));

// Copy Product Definitions
console.log('📄 Copying product definitions...');
execSync(`cp -r product/* ${DEST_DIR}/`);

// Generate Antigravity Optimized Prompts
console.log('🤖 Generating Antigravity prompts...');

const oneShotPrompt = `
# Product Implementation Request

You are an expert AI coding assistant. You are tasked with building a new web application based on a complete design specification.

## Product Context
The full product definition is provided in the current directory:
- \`product-overview.md\`: Vision and features
- \`product-roadmap.md\`: Development milestones
- \`data-model/data-model.md\`: Entity relationships
- \`design-system/\`: UI tokens

## Your Mission
Implement the entire product description in \`product-overview.md\`.

## Antigravity Workflow (Critical)
If you are Google Antigravity, you MUST follow this workflow:

1.  **Initialize**: Call \`task_boundary\` with TaskName "Project Initialization".
2.  **Plan**: Create \`task.md\` and \`implementation_plan.md\` in your brain directory.
    - \`task.md\`: Breakdown the roadmap into checklist items.
    - \`implementation_plan.md\`: Detail your tech stack (React, Vite, Tailwnd v4) and file structure.
3.  **Approve**: Ask the user for review of the plan using \`notify_user\`.
4.  **Execute**: Implement the sections one by one.
5.  **Verify**: creating \`walkthrough.md\` with evidence of working features.

## Technical Constraints
- Frontend: React 19, Vite, Tailwind CSS v4.
- Icons: Lucide React.
- Components: Use the exported components if available, otherwise build using Radix UI/Shadcn patterns.

Start by reading \`product-overview.md\`.
`;

fs.writeFileSync(path.join(DEST_DIR, 'prompts/one-shot-prompt.md'), oneShotPrompt);

// Create Zip
console.log('🤐 Zipping package...');
execSync(`zip -r ${ZIP_FILE} ${DEST_DIR}`);

console.log('✅ Export complete! Download product-plan.zip');
