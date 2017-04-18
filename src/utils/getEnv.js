import _ from 'lodash';
import fs from 'fs';
import glob from 'glob';

export function getEnvData() {
  const obj = {};
  const rootDir = process.env.PWD;
  const files = glob.sync(`${rootDir}/*.env`);

  // _.assign(obj, process.env);

  _.map(files, (file) => {
    const str = fs.readFileSync(file);

    _.chain(str)
      .split(/\r?\n|\r/)
      .forEach((line) => {
        if (line) {
          const lineValues = _.split(line, '=');
          _.set(obj, lineValues[0], lineValues[1]);
        }
      })
      .value();
  });
  return obj;
}

export default getEnvData;
