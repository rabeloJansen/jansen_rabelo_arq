import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { PROJECTS } from '../src/data/projects.js';

test('library routes and project pages exist', async () => {
  const html = await readFile('library.html', 'utf8');
  assert.match(html, /data-project-grid/);
  for (const project of PROJECTS) {
    const page = await readFile(project.page, 'utf8');
    assert.match(page, /Voltar à Biblioteca/);
    assert.match(page, /src\/styles\/library\.css/);
    assert.match(page, /class="skip-link"/);
    assert.ok(page.includes(project.name), `${project.page} deve citar ${project.name}`);
  }
});

test('every library filter has projects and every project has a filter', async () => {
  const html = await readFile('library.html', 'utf8');
  const filters = [...html.matchAll(/data-filter="([^"]+)"/g)].map(match => match[1]);
  for (const project of PROJECTS) assert.ok(filters.includes(project.filter), project.id);
  for (const filter of filters.filter(item => item !== 'all'))
    assert.ok(
      PROJECTS.some(project => project.filter === filter),
      `filtro vazio: ${filter}`
    );
});

test('project icons and screenshots exist', async () => {
  for (const project of PROJECTS) {
    await access(project.icon);
    for (const screen of project.screens) {
      await access(screen.src);
      assert.ok(screen.caption && screen.width && screen.height, screen.src);
    }
  }
});

test('generated pages are in sync with project data', async () => {
  for (const project of PROJECTS) {
    const page = await readFile(project.page, 'utf8');
    assert.ok(page.includes(project.lead), `rode npm run build:projects (${project.id})`);
    for (const screen of project.screens) assert.ok(page.includes(screen.src), screen.src);
  }
});

test('excluded projects stay out of the library', async () => {
  const ids = PROJECTS.map(project => project.id);
  for (const id of ['fpsync', 'youtube2download', 'veye']) assert.ok(!ids.includes(id), id);
});
