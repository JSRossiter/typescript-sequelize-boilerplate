import generateScript from './tasks/generateScript';
import { sleep } from './utilities/sleep';

const scripts = {
  generateScript,
};

const validScript = (script: string): script is keyof typeof scripts =>
  script in scripts;

// usage: node -r dotenv/config dist/scripts generateScript
const main = async () => {
  try {
    const script = process.argv[2];
    if (validScript(script)) {
      // @ts-expect-error args
      await scripts[script](...process.argv.slice(3));
    } else {
      console.log(`Invalid script "${script}"`);
    }
    await sleep(100);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void main();
