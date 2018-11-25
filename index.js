const path = require('path');
const exec = require('child-process-promise').exec;

const RENDERER = 'CNCMaps.Renderer.exe';

const fullPath = path.join(__dirname, 'renderer', RENDERER);

const mixDir = '/opt/gamefile';
const inputMap = '/opt/gamefile/amazon.mmx';

// const mixDir = 'E:\\Games\\Westwood\\RA2'; // -m
// const inputMap = 'E:\\Games\\Westwood\\RA2\\amazon.mmx'; // -i

const outputDir = ''; // -d
const outputName = 'amazon'; // -o

let command = `${fullPath} -i "${inputMap}" -j -m "${mixDir}" -r -S -z +\(800,0\)`;

if (outputDir) {
  command += ` -d "${outputDir}"`;
}

if (outputName) {
  command += ` -o "${outputName}"`;
}

if (process.platform !== 'win32') {
  // Unix
  command = `mono ${command}`;
}

console.log('Executing command : ' + command);

exec(command)
  .then(result => {
    const stdout = result.stdout;
    const stderr = result.stderr;
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
  })
  .catch(err => {
    console.error('ERROR: ', err);
  });
