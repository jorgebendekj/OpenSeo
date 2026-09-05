import fs from "node:fs";
import path from "node:path";

const publicSkills = [
  'competitive-landscape',
  'competitor-analysis',
  'keyword-clustering',
  'keyword-research',
  'link-prospecting',
  'local-seo',
  'seo-audit',
  'seo-coach',
  'seo-project-setup',
];

const skillsData = {};

for (const name of publicSkills) {
  const skillPath = path.join(process.cwd(), '.agents', 'skills', name, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    const raw = fs.readFileSync(skillPath, 'utf8');
    let desc = '';
    const match = raw.match(/description:\s*(.+)/);
    if (match) desc = match[1].replace(/^['"]|['"]$/g, '').trim();

    skillsData[name] = {
      name,
      description: desc,
      body: raw + '\n\nSurface note: you are SAM (now Ada), the in-app AI SEO partner on Findable.',
    };
  }
}

const fileContent = `export interface AdaSkill {
  name: string;
  description?: string;
  body: string;
}

export interface SkillSource {
  list(): Promise<Array<{ name: string; description?: string }>>;
  load(name: string): Promise<AdaSkill | null>;
}

const PUBLIC_SKILLS: Record<string, AdaSkill> = ${JSON.stringify(skillsData, null, 2)};

export function buildAdaSkillSource(_projectId?: string): SkillSource {
  return {
    async list() {
      return Object.values(PUBLIC_SKILLS).map((s) => ({
        name: s.name,
        description: s.description,
      }));
    },
    async load(name: string) {
      return PUBLIC_SKILLS[name] ?? null;
    },
  };
}

export const buildSamSkillSource = buildAdaSkillSource;
`;

fs.writeFileSync('src/server/features/ada/adaSkills.ts', fileContent, 'utf8');
console.log('src/server/features/ada/adaSkills.ts written successfully');