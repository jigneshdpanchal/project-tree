# project-tree 🌳

[![npm version](https://img.shields.io/npm/v/project-tree.svg?style=flat)](https://www.npmjs.com/package/project-tree)
[![Downloads](https://img.shields.io/npm/dt/project-tree.svg)](https://www.npmjs.com/package/project-tree)
[![License](https://img.shields.io/npm/l/project-tree.svg)](https://opensource.org/licenses/ISC)

A simple and fast CLI tool to generate a clean directory tree for **any Node.js project**.  
It automatically ignores common folders like `node_modules`, `.git`, build outputs, and more.

Perfect for:
- Project documentation
- README files
- Code reviews
- Understanding unfamiliar codebases

---

## ✨ Features

- 📂 Works with **any project structure** (frontend, backend, monorepo)
- 🚫 Ignores common clutter (`node_modules`, `.git`, `dist`, etc.)
- ⚡ Fast and dependency-free
- 🖥 Cross-platform (Windows, macOS, Linux)
- 📄 Clean, readable tree output

---

## 📦 Installation

### Option 1: Use without installing (recommended)

```bash
npx project-tree

```

### Option 2: Install globally

```bash
npm install -g project-tree

```

### 🚀 Usage

1. Generate tree for current directory

```bash
project-tree

```

2. Generate tree for a specific folder

```bash
project-tree src
project-tree backend

```

### Example output

```bash
project-tree
├── bin
│   └── project-tree.js
├── package.json
└── README.md

```

### 🚫 Ignored by Default

The following files and folders are ignored automatically:

* node_modules
* .git
* .next
* dist
* build
* coverage
* .env
* .DS_Store
* Lock files (package-lock.json, yarn.lock, pnpm-lock.yaml)

This keeps the output clean and readable.

## ⚙ CLI Options

| Option                   | Description                                |
| ------------------------ | ------------------------------------------ |
| `--help`, `-h`           | Show this help message                     |
| `--depth <number>`       | Limit tree output to a specific depth      |
| `--ignore <file/folder>  | Ignore additional files or folders         |
| `--json`                 | Output tree as JSON (useful for scripting) |

## Examples:

```bash

# Show help
project-tree --help

# Limit depth to 2 levels
project-tree src --depth 2

# Ignore additional folder
project-tree --ignore logs

# Output JSON
project-tree backend --json

```

### 🧰 Requirements

Node.js v14 or higher

### 🛠 Development (Local Testing)

1. Clone the repo and link it locally:

```bash

git clone https://github.com/jigneshdpanchal/project-tree.git
cd project-tree
npm install
npm link

```

2. Run anywhere:

```bash
project-tree

```

### 📌 Use cases

* Add project structure to README
* Quickly inspect backend projects
* Share folder layout in documentation
* Understand large repositories faster

### 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Clone your fork:

```bash

git clone https://github.com/jigneshdpanchal/project-tree.git
cd project-tree

```
3. Install dependencies:

```bash

npm install

```

4. Link locally for testing:

```bash

npm link

```

5. Make your changes and test:

```bash
project-tree

```

6. Commit, push, and create a pull request

### Coding Guidelines:

* Use CommonJS modules (require)
* Keep no unnecessary dependencies
* Maintain cross-platform compatibility
* Write clear and descriptive commit messages

### 📄 License

ISC License

### ⭐ Support

If you find this useful, consider starring the project ⭐
Happy coding! 🚀


---

This version:

- Adds **badges** for npm version, downloads, and license  
- Adds **CLI options** section with examples  
- Fixes spacing and markdown formatting  
- Keeps **installation, usage, ignored files, and requirements** clear  
- Adds **structured contributing guide**  

