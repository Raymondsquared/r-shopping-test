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

Shopping emulator requires the following to run:

- [Node.js][node] 10+
- [npm][npm] (normally comes with Node.js)

## Usage

Intalling dependencies:
-- We only use lodash to do array manipulations for the mock database.

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
- Free promotion only works with free 1 item, buy x amount of `atv` will get one free atv, would be aweomse if that number free item can be customisable.
- Bundle item `mbp` only works when we are giving away free items or items with 0 price `vga`, it could be made to be more customisable.

## Assumptions Made

- Item will always have SKU, name and price.
- SKU is limited to just 3 characters.
- SKU is unique.
- Price must be above \$0.
- Buying a bundle item such as `mbp` will always get a `vga` for free, without scanning it.

# Other Information

Time breakdown:

- development: 2.5 hours.
- documentation: 0.5 hours.
- operations: 0.5 hours.

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[shield-coverage]: https://img.shields.io/badge/coverage-92%25-brightgreen.svg
[shield-dependencies]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-10.16.2-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v6.9.0-blue.svg
