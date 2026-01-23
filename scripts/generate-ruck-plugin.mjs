import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const rootDir = process.cwd();
const toolsDir = path.resolve(rootDir, 'src/tools');
const localesDir = path.resolve(rootDir, 'locales');
const distDir = path.resolve(rootDir, 'dist');
const manifestPath = path.resolve(rootDir, 'ruck-manifest.json');

// Ensure dist dir exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Load resources
const zhLocales = YAML.parse(fs.readFileSync(path.join(localesDir, 'zh.yml'), 'utf8'));
const ruckManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Helper to get tool definition from index.ts content
function extractKeywords(content) {
  const match = content.match(/keywords:\s*\[([\s\S]*?)\]/);
  if (match && match[1]) {
    return match[1]
      .split(',')
      .map(s => s.trim().replace(/['"`]/g, ''))
      .filter(s => s);
  }
  return [];
}

// Helper to get translated strings
function getTranslation(key) {
  const parts = key.split('.');
  let current = zhLocales;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current;
}

const tools = [];
const categories = fs.readdirSync(toolsDir);

console.log('Scanning tools...');

const existingFeaturesMap = new Map(ruckManifest.features.map(f => [f.code, f]));

// Iterate through src/tools directories
for (const toolDirName of categories) {
  const toolDirPath = path.join(toolsDir, toolDirName);
  const indexFile = path.join(toolDirPath, 'index.ts');

  if (fs.statSync(toolDirPath).isDirectory() && fs.existsSync(indexFile)) {
    const content = fs.readFileSync(indexFile, 'utf8');

    // Extract metadata
    // We assume the tool path matches the directory name, or we can extract `path: '/...'`
    // Let's rely on directory name as the code
    const code = toolDirName;

    // Get title and description from locales
    // Key format: tools.<code-without-slash>.title
    const titleKey = `tools.${code}.title`;
    const descKey = `tools.${code}.description`;

    const name = getTranslation(titleKey);
    const description = getTranslation(descKey);

    if (!name) {
      console.warn(`[WARN] Missing translation title for ${code}`);
      continue;
    }

    const keywords = extractKeywords(content);

    // Construct basic commands
    // [Title, Code, ...keywords]
    // Filter duplicates and empty
    const basicCmds = Array.from(new Set([name, code, ...keywords])).filter(Boolean);

    // Check if regex/advanced commands exist in ruck-manifest
    let validCmds = basicCmds;
    const existingFeature = existingFeaturesMap.get(code);

    if (existingFeature && existingFeature.cmds) {
      // Merge strategy:
      // Use existing feature's "complex" commands (objects)
      // And merge keywords?
      // Or just prefer existing if available?
      // User said "automatic... especially feature/cmd".
      // If we strictly use existing, it's not "automatic" for new keywords.
      // So let's keep complex objects from existing, and regenerate string commands.

      const complexCmds = existingFeature.cmds.filter(c => typeof c === 'object');
      // For string commands, we use our generated list to ensure it's up to date with code/locales

      // Wait, ruck-manifest might have manually tuned keywords that are better.
      // But preserving them is hard if we want "automatic" updates from code.
      // Let's append complex cmds to our basic cmds.
      validCmds = [...basicCmds, ...complexCmds];
    } else {
      // If usage of existing feature is preferred entirely:
      // validCmds = existingFeature.cmds
      // But assuming we want to update it: 
      // We keep it as basicCmds
    }

    const feature = {
      code,
      explain: description || name,
      cmds: validCmds,
    };

    tools.push(feature);
  }
}

const pluginJson = {
  ...ruckManifest,
  features: tools,
};

const outputPath = path.join(distDir, 'plugin.json');
fs.writeFileSync(outputPath, JSON.stringify(pluginJson, null, 2));

console.log(`Generated ${outputPath} with ${tools.length} tools.`);
