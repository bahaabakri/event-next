// scripts/generate-theme.js
const fs = require("fs");
const { colors } = require("../styles/colors.ts"); // your TS file with colors

function mapColors(name, arr) {
  return arr
    .map((c, i) => {
      const key = i === 0 ? 50 : i * 100;
      return `  --color-${name}-${key}: ${c};`;
    })
    .join("\n");
}

// Generate CSS variables
let css = `@theme {\n`;

// Loop through all color sets
for (const [name, arr] of Object.entries(colors)) {
  css += mapColors(name.toLowerCase(), arr) + "\n";
}

// ✅ Create palette for "primary" using "redRose"
if (colors.roseRed) {
  css += mapColors("primary", colors.roseRed) + "\n";
}

// Add spacing, font sizes, radius (if available)
const { spacing, fontSizes, radius } = require("../styles/tokens.ts"); // adjust path

if (spacing) {
  css += `  /* Spacing */\n`;
  for (const [name, value] of Object.entries(spacing)) {
    css += `  --spacing-${name}: ${value};\n`;
  }
}
if (fontSizes) {
  css += `  /* Font Sizes */\n`;
  for (const [name, value] of Object.entries(fontSizes)) {
    css += `  --font-size-${name}: ${value};\n`;
  }
}
if (radius) {
  css += `  /* Border Radius */\n`;
  for (const [name, value] of Object.entries(radius)) {
    css += `  --radius-${name}: ${value};\n`;
  }
}

css += "}\n";

// Write output
fs.writeFileSync("styles/tailwind-theme.css", css);
console.log("✅ theme.css generated with primary palette!");
