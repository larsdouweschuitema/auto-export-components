<div align="center">
  <h1>Auto Export Components</h1>
</div>

Automatic importing & exporting of Vue components within the components directory.

## Table of contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to import](#how-to-import)


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

- Node.js v10.21.0 - [Download & Install Node.js](https://nodejs.org/en/download/)
- NPM v 6.14.4 [Download & Install NPM](https://www.npmjs.com/get-npm)

## Installation

Clone the repository and change the directory

```bash
$ git clone https://git.funda.nl/scm/frn/ui-vue.git && cd ui-vue
```

Install dependencies using `npm`. The autoExport script inside of the package.json will start, because it runs preinstall, and generate the index file.
```
$ npm install
```

Manual trigger of auto export
```
$ npm run autoExport
```