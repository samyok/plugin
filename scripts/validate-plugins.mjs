#!/usr/bin/env node
// Validates the structure of the plugin at the repo root.
// Run: node scripts/validate-plugins.mjs

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const errors = [];
const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function fail(msg) {
  errors.push(msg);
}

function parseJson(path, label) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`${label}: invalid JSON (${e.message})`);
    return null;
  }
}

function frontmatter(path) {
  const text = readFileSync(path, "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx > 0) fields[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return fields;
}

function checkSkillLike(dir, kind) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    if (!statSync(join(dir, entry)).isDirectory()) continue;
    const md = join(dir, entry, `${kind === "skill" ? "SKILL" : "AGENT"}.md`);
    const label = md.slice(root.length + 1);
    if (!existsSync(md)) {
      fail(`${label}: missing ${kind === "skill" ? "SKILL" : "AGENT"}.md in ${entry}/`);
      continue;
    }
    const fm = frontmatter(md);
    if (!fm) fail(`${label}: missing YAML frontmatter`);
    else {
      if (!fm.name) fail(`${label}: frontmatter missing "name"`);
      if (!fm.description) fail(`${label}: frontmatter missing "description"`);
      if (fm.name && fm.name !== entry)
        fail(`${label}: frontmatter name "${fm.name}" should match directory "${entry}"`);
    }
  }
}

const manifestPath = join(root, ".devin-plugin", "plugin.json");
if (!existsSync(manifestPath)) {
  fail("missing .devin-plugin/plugin.json at the repo root");
} else {
  const manifest = parseJson(manifestPath, ".devin-plugin/plugin.json");
  if (manifest) {
    if (!manifest.name) fail('manifest missing "name"');
    else if (!kebab.test(manifest.name))
      fail(`name "${manifest.name}" must be lowercase kebab-case`);
    if (manifest.version && !/^\d+\.\d+\.\d+([-+].*)?$/.test(manifest.version))
      fail(`version "${manifest.version}" is not semver`);
    for (const list of ["requiredPlugins", "optionalPlugins", "forbiddenPlugins"]) {
      if (manifest[list] !== undefined && !Array.isArray(manifest[list]))
        fail(`"${list}" must be an array`);
    }
  }

  checkSkillLike(join(root, "skills"), "skill");
  checkSkillLike(join(root, "agents"), "agent");

  for (const file of ["hooks.json", "mcp_config.json"]) {
    const p = join(root, file);
    if (existsSync(p)) parseJson(p, file);
  }
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("Plugin validation passed.");
