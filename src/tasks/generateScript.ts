import fs from 'fs';
import logger from '../utilities/logger';

function generateScript(name?: string): Promise<void> {
  logger.info(`generating script ${name}`);
  const path = `${process.cwd()}/src/tasks/${name}.ts`;
  const scriptsPath = `${process.cwd()}/src/scripts.ts`;
  const existing = fs.existsSync(path);
  if (existing) {
    logger.warn('script already exists');
    return;
  }
  const content = `
  import logger from "../utilities/logger";
  import models from '../models';
  const {  } = models;

  async function ${name}(): Promise<void> {

  }

  export default ${name};
  `;
  fs.writeFileSync(path, content);

  const rows = fs.readFileSync(scriptsPath).toString().split('\n');

  rows.unshift(`import ${name} from './tasks/${name}';`);
  const index = rows.findIndex((r) => r === 'const scripts = {');
  rows.splice(index + 1, 0, `  ${name},`);
  fs.writeFileSync(scriptsPath, rows.join('\n'));

  logger.info(`script created: ${path}`);
}

export default generateScript;
