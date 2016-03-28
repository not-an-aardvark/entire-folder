# entire-folder [![Build Status](https://travis-ci.org/not-an-aardvark/entire-folder.svg?branch=master)](https://travis-ci.org/not-an-aardvark/entire-folder)

Allows you to `require()` all of the modules in a folder.

```bash
npm install entire-folder
```

## Usage

Suppose there is a folder called `myFolder/` in the current directory. It contains the files `file1.js`, `file2.js`, and `file3.js`.

```js
var folder = require('entire-folder')('myFolder');
console.log(folder);
/* => {
  file1: "file1's exports would be here",
  file2: "file2's exports would be here",
  file3: "file3's exports would be here"
} */
```
