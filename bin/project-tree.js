#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

let ROOT_DIR = ".";
let MAX_DEPTH = Infinity;
let JSON_OUTPUT = false;

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

const USER_IGNORE = new Set();

/* ---------------- CLI ARG PARSING ---------------- */

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

    case "--depth": {
      const depth = args[i + 1];
      if (!depth || isNaN(depth)) {
        console.error("Error: --depth requires a number");
        process.exit(1);
      }
      MAX_DEPTH = parseInt(depth, 10);
      i++;
      break;
    }

    case "--ignore": {
      const ignoreName = args[i + 1];
      if (!ignoreName) {
        console.error("Error: --ignore requires a file or folder name");
        process.exit(1);
      }
      USER_IGNORE.add(ignoreName);
      i++;
      break;
    }

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

/* ---------------- TREE GENERATION ---------------- */

function generateTree(dir, depth = 0) {
  let items;

  try {
    items = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  items = items.filter(
    item =>
      !DEFAULT_IGNORE.has(item.name) &&
      !USER_IGNORE.has(item.name)
  );

  // directories first, then files, alphabetical
  items.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  return items.map(item => {
    const node = { name: item.name };

    if (item.isDirectory() && depth + 1 < MAX_DEPTH) {
      node.children = generateTree(
        path.join(dir, item.name),
        depth + 1
      );
    }

    return node;
  });
}

/* ---------------- TREE PRINTING ---------------- */

function printTree(tree, prefix = "") {
  tree.forEach((node, index) => {
    const isLast = index === tree.length - 1;
    const connector = isLast ? "└── " : "├── ";

    console.log(prefix + connector + node.name);

    if (node.children && node.children.length > 0) {
      printTree(
        node.children,
        prefix + (isLast ? "    " : "│   ")
      );
    }
  });
}

/* ---------------- ENTRY POINT ---------------- */

const rootName = path.basename(path.resolve(ROOT_DIR)) || ".";

if (JSON_OUTPUT) {
  const tree = {
    name: rootName,
    children: generateTree(ROOT_DIR)
  };
  console.log(JSON.stringify(tree, null, 2));
} else {
  console.log(rootName);
  const tree = generateTree(ROOT_DIR);
  printTree(tree);
}
