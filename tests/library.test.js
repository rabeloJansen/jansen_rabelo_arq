import test from 'node:test';import assert from 'node:assert/strict';import {readFile,access} from 'node:fs/promises';
const ids=['databim','echoiq','fxone-studio','vstick'];
test('library routes and project pages exist',async()=>{const html=await readFile('library.html','utf8');assert.match(html,/data-project-grid/);for(const id of ids){await access(`projects/${id}.html`);const page=await readFile(`projects/${id}.html`,'utf8');assert.match(page,/Voltar à Biblioteca/);assert.match(page,/src\/styles\/library\.css/)}});
test('project data exposes all portfolio products',async()=>{const source=await readFile('src/data/projects.js','utf8');for(const name of ['dataBIM','EchoIQ','FXone Studio','vStick'])assert.match(source,new RegExp(name));});
