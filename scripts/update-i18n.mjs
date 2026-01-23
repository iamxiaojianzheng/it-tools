import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';

// Usage: node scripts/update-i18n.mjs <locale> <keyPath> <value>
// Example: node scripts/update-i18n.mjs zh tools.json-to-xml.title "JSON 到 XML"

const [locale, keyPath, value] = process.argv.slice(2);

if (!locale || !keyPath || value === undefined) {
  console.error('Usage: node scripts/update-i18n.mjs <locale> <keyPath> <value>');
  process.exit(1);
}

const rootDir = process.cwd();
const localeFile = resolve(rootDir, `locales/${locale}.yml`);

try {
  const content = readFileSync(localeFile, 'utf8');
  const doc = YAML.parseDocument(content);

  // Split key path (e.g., "tools.json-to-xml.title")
  const path = keyPath.split('.');
  
  // Set value at path
  doc.setIn(path, value);

  // Stringify with specific options to maintain style if possible
  // doc.toString() usually does a good job with parseDocument
  writeFileSync(localeFile, doc.toString(), 'utf8');
  
  console.log(`Successfully updated ${keyPath} in ${locale}.yml`);
} catch (error) {
  console.error(`Error updating i18n file: ${error.message}`);
  process.exit(1);
}
