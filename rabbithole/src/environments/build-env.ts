const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    const targetPath = './src/environments/environment.ts';
  
    const appVersion = require('../../package.json').version;

    require('dotenv').config({
      path: 'src/environments/.env'
    });
 
    const envConfigFile = `export const environment = {
        TEST_KEY: '${process.env["TEST_KEY"]}',
        production: true,
    };
  `;

    console.log('environment.ts: \n');
    console.log(envConfigFile);
    
    writeFile(targetPath, envConfigFile, (error: any) => {
      if (error) {
        console.error(error);
        throw error;
      } else {
        console.log(`Rabbithole environment.ts file generated correctly at ${targetPath} \n`);
      }
    });
  };
  
  setEnv();