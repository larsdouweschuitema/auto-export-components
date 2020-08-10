#!/usr/bin/env node
const { join, resolve } = require('path');
const { readdirSync, existsSync, unlink, writeFile, appendFile } = require('fs');
const { camelCase } = require('lodash');

const dir = join(resolve(), 'src/components');
const indexPath = 'src/index.js';
const extension = '.vue';
let data = '';
let components = [];

function filterByVueExtension(file) {
    return file.indexOf(extension) !== -1;
}

function getFilesFromDir() {
    return readdirSync(dir).filter(filterByVueExtension);
}

function removeExtensionFromFiles(items) {
    let componentsArr = [];
    items.forEach(item => {
        let tempItem = {};
        tempItem['name'] = createComponentName(item);
        tempItem['file'] = item;
        componentsArr.push(tempItem);
    });
    return componentsArr;
}

function removeExtension(file) {
    return file.split('.').slice(0, -1).join('.');
}

function createComponentName(component) {
    let tempComponentName;
    tempComponentName = removeExtension(component);
    tempComponentName = camelCase(tempComponentName);
    tempComponentName = capitalizeFirstLetter(tempComponentName);
    return tempComponentName;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getComponents() {
    const componentsArr = getFilesFromDir();
    components = removeExtensionFromFiles(componentsArr);
}

function createDataString() {
    if(components.length) {
        components.forEach(component => {
        data += `
import ${component.name} from './components/${component.file}'; `;
        });

        data += `

export { ${components.map(component => component.name)} };`;
    }
}

function logError(err) {
    if (err) throw err;
}

function deleteIndexFile() {
    unlink(indexPath, (err) => logError(err));
}

function createIndexFile() {
    writeFile(indexPath, '', (err) => logError(err));
}

function addDataToFile() {
    appendFile(indexPath, data, (err) => logError(err));
}

function exportComponents() {
    existsSync(indexPath) ? deleteIndexFile() : createIndexFile();
    addDataToFile();
}

function autoExportComponents() {
    getComponents();
    createDataString();
    exportComponents();
}

autoExportComponents();