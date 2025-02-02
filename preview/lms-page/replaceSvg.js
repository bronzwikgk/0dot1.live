const fs = require('fs');

const inputFile = 'index.html';  // Your HTML file
const outputFile = 'output.html'; // New HTML file with replaced SVGs

// Read the HTML file
let html = fs.readFileSync(inputFile, 'utf8');

// First replacement: SVG with class="w-5 h-5" width="32" height="32"
const svgPattern1 = /<svg\s+class="w-5 h-5"\s+width="32"\s+height="32"[\s\S]*?<\/svg>/g;
const newSVG1 = `<svg class="w-5 h-5" width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
</svg>`;

// Second replacement: SVG with width="6" height="10"
const svgPattern2 = /<svg\s+[^>]*width="6"\s+height="10"[\s\S]*?<\/svg>/g;
const newSVG2 = `<svg width="6" height="10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>`;

// Perform the replacements
html = html.replace(svgPattern1, newSVG1);
html = html.replace(svgPattern2, newSVG2);

// Write the modified HTML to a new file
fs.writeFileSync(outputFile, html, 'utf8');

console.log(`SVG replacements complete. Check ${outputFile}`);

