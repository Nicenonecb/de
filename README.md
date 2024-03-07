

# Dep-Solver (Refactored Version)

Dep-Solver is a Node.js module designed to resolve dependencies between packages or modules within a project. It utilizes a topological sorting algorithm to determine the order in which modules should be loaded or executed, ensuring that all dependencies are satisfied before a module is run. Additionally, it provides functionality to build and visualize dependency graphs, aiding in the management and troubleshooting of project dependencies.

## Features

- **Dependency Resolution**: Efficiently resolve package dependencies to determine a safe load order.
- **Cycle Detection**: Identify and report circular dependencies that could lead to runtime errors.
- **Visualization**: Generate a visual representation of the dependency graph (feature planned).

## Getting Started

### Prerequisites

- Node.js (version 12.x or higher recommended)

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/dep-solver.git
cd dep-solver
```

Install the required dependencies:
```bash
npm install
```

### Usage
To use the dep-solver in your project, first import the module:

```javascript
const { getRelatedPackages, findOrder } = require('./dependencyResolver');
```
Then, you can use it to resolve dependencies and determine the load order:

```javascript
const packages = [
  // Define your packages and dependencies here
];

const dependencies = getRelatedPackages(packages);
const order = findOrder(dependencies);
console.log(order); // Outputs the load order of the packages
```

### Running Tests
To run the tests and ensure the module is working as expected, execute:
```bash
npm test
```

