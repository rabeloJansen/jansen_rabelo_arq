import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const pages = ['index.html', 'professional.html', 'library.html', 'contact.html'];
test('all pages include language, viewport and main content', async () => {
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    assert.match(html, /lang="pt-BR"/);
    assert.match(html, /name="viewport"/);
    assert.match(html, /<main id="conteudo"/);
    assert.match(html, /src\/scripts\/app\.js/);
  }
});
test('contact configuration does not contain placeholder secrets', async () => {
  const js = await readFile('src/scripts/contact-config.js', 'utf8');
  assert.doesNotMatch(js, /token|password|secret/i);
});
