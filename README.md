# Shopping Test with TypeScript

A small codebase for emulating shopping transactions.

[![NPM version][shield-npm]](#)
[![Node.js version support][shield-node]](#)
[![Code coverage][shield-coverage]](#)
[![Dependencies][shield-dependencies]](#)

## Table of Contents

- [Requirements](#requirements)
- [Usage](#usage)
- [Design Decision](#design-decision)
- [To Do](#to-do)
- [Assumption Made](#assumptions-made)
- [Other Information](#other-information)

## Requirements

Bank emulator requires the following to run:

- [Node.js][node] 10+
- [npm][npm] (normally comes with Node.js)

## Usage

Intalling dependencies

```sh
npm install
```

Where to start?

- `main.js` is the first points of entry in this application.

### Test

```sh
npm test
```

### Run

```sh
npm start
```

## Design Decision

- Programming Language: TypeScript (JavaScript), I have been doing JavaScript for the past 1 year, It's what I am used to at the moment.

## To Do

- The ability to handle multiple shopping carts.
- The ability to save and retrieve shopping carts.
- The ability to support mutiple currencies.

## Assumptions Made

- Item will always have SKU, name and price.
- SKU is limited to just 3 characters.
- SKU is unique.
- Price must be above \$0.

# Other Information

Time breakdown:

- development: 2.5 hours.
- documentation: 0.5 hours.
- operations: 0.5 hours.

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[shield-coverage]: https://img.shields.io/badge/coverage-84%25-brightgreen.svg
[shield-dependencies]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-10.16.2-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v6.9.0-blue.svg
