import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
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
    const arrayContent = match[1];
    // 匹配所有带单引号、双引号或反引号的字符串
    const stringMatches = arrayContent.match(/(['"`])(.*?)\1/g);
    if (stringMatches) {
      return stringMatches.map(s => s.slice(1, -1)).filter(s => s);
    }
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
    // Fallback to directory name based key, but try to extract from code
    const i18nMatch = content.match(/translate\(['"]tools\.(.*?)\.(title|description)['"]\)/);
    const i18nKeyBase = i18nMatch ? i18nMatch[1] : code;

    const titleKey = `tools.${i18nKeyBase}.title`;
    const descKey = `tools.${i18nKeyBase}.description`;

    const name = getTranslation(titleKey);
    const description = getTranslation(descKey);

    if (!name) {
      console.warn(`[WARN] Missing translation title for ${code} (key: ${titleKey})`);
      continue;
    }

    const keywords = extractKeywords(content);

    // 获取现有配置（如果有）
    const existingFeature = existingFeaturesMap.get(code);

    // 构造基础命令：[名称, 路径代码, ...关键词]
    const basicCmds = Array.from(new Set([name, code, ...keywords])).filter(Boolean);

    // 提取清单中的复杂命令（对象类型）
    const complexCmds = (existingFeature?.cmds || []).filter(c => typeof c === 'object');

    const feature = {
      code,
      explain: description || name,
      cmds: [...basicCmds, ...complexCmds],
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
