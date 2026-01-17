#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// --------------------
// CLI Argument Parsing
// --------------------
const args = process.argv.slice(2);

// Default root directory
let ROOT_DIR = ".";
let MAX_DEPTH = Infinity;
let JSON_OUTPUT = false;

// Default ignore list
const DEFAULT_IGNORE = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".env",
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml"
]);

// User-specified additional ignores
const USER_IGNORE = new Set();

// --------------------
// Parse Arguments
// --------------------
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  switch (arg) {
    case "--help":
    case "-h":
      console.log(`
project-tree 🌳 - Generate a directory tree

Usage:
  project-tree [directory] [options]

Options:
  --help, -h           Show this help message
  --depth <number>     Limit tree to a specific depth
  --ignore <name>      Ignore additional files or folders
  --json               Output tree as JSON

Examples:
  project-tree
  project-tree src --depth 2 --ignore logs
  project-tree backend --json
      `);
      process.exit(0);

    case "--depth":
      const depth = args[i + 1];
      if (!depth || isNaN(depth)) {
        console.error("Error: --depth requires a number");
        process.exit(1);
      }
      MAX_DEPTH = parseInt(depth, 10);
      i++;
      break;

    case "--ignore":
      const ignoreName = args[i + 1];
      if (!ignoreName) {
        console.error("Error: --ignore requires a file or folder name");
        process.exit(1);
      }
      USER_IGNORE.add(ignoreName);
      i++;
      break;

    case "--json":
      JSON_OUTPUT = true;
      break;

    default:
      if (!arg.startsWith("-")) {
        ROOT_DIR = arg;
      }
      break;
  }
}

// --------------------
// Tree Generation
// --------------------
function generateTree(dir, prefix = "", depth = 0) {
  let items;
  try {
    items = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }

  // Filter ignored items
  items = items.filter(
    item => !DEFAULT_IGNORE.has(item.name) && !USER_IGNORE.has(item.name)
  );

  // Sort directories first, optional
  items.sort((a, b) => (a.isDirectory() && !b.isDirectory() ? -1 : 0));

  // Build tree structure
  const tree = [];

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const name = item.name;

    const node = { name };

    if (item.isDirectory() && depth + 1 < MAX_DEPTH) {
      const children = generateTree(path.join(dir, name), prefix + (isLast ? "    " : "│   "), depth + 1);
      if (children) node.children = children;
    }

    tree.push(node);

    // Print text if not JSON
    if (!JSON_OUTPUT) {
      console.log(prefix + connector + name);
      if (node.children && node.children.length > 0) {
        printTree(node.children, prefix + (isLast ? "    " : "│   "));
      }
    }
  });

  return tree;
}

// Helper to print JSON-like tree in text mode
function printTree(tree, prefix = "") {
  tree.forEach((node, index) => {
    const isLast = index === tree.length - 1;
    const connector = isLast ? "└── " : "├── ";
    console.log(prefix + connector + node.name);
    if (node.children) {
      printTree(node.children, prefix + (isLast ? "    " : "│   "));
    }
  });
}

// --------------------
// Run CLI
// --------------------
const rootName = path.basename(path.resolve(ROOT_DIR)) || ".";

if (JSON_OUTPUT) {
  const jsonTree = { name: rootName, children: generateTree(ROOT_DIR) };
  console.log(JSON.stringify(jsonTree, null, 2));
} else {
  console.log(rootName);
  generateTree(ROOT_DIR);
}
