#!/usr/bin/env node
const { join, resolve } = require('path');
const { readdirSync, existsSync, unlink, writeFile, appendFile } = require('fs');
const indexFile = 'index.js';
const directoryPath = join(resolve(), 'components');
let data = '';
let components;

function removeExtension(file) {
    return file.split('.').slice(0, -1).join('.');
}

function getFilesByName(files) {
    let filesArray = [];
    files.forEach(file => {
        const fileName = removeExtension(file);
        filesArray.push(fileName);
    });

    return filesArray;
}

function getComponents() {
    const files = readdirSync(directoryPath);
    components = getFilesByName(files);
}

function createDataString() {
  components.forEach(component => {
    data += `
  import ${component} from './components/${component}.mjs'; `;
  });

  data += `
  export { ${components} }`;
}

function logErr(err) {
    if(err) throw err;
}

function fileExists() {
  return existsSync(indexFile) ? true : false;
}

function deleteFile() {
  unlink(indexFile, (err) => logErr(err));
}

function createFile() {
  writeFile(indexFile, '', (err) => logErr(err));
}

function addContentToFile() {
  appendFile(indexFile, data, (err) => logErr(err));
}

function exportComponents() {
  fileExists() ? deleteFile() : createFile();
  addContentToFile();
}

getComponents();
createDataString();
exportComponents();