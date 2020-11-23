import example from './tasks/example';
import { sleep } from './utilities/sleep';

const scripts = {
  example,
};

const validScript = (script: string): script is keyof typeof scripts =>
  script in scripts;

// usage: node -r dotenv/config dist/scripts example
const main = async () => {
  try {
    const script = process.argv[2];
    if (validScript(script)) {
      await scripts[script]();
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

main();
