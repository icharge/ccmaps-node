const path = require('path');
const exec = require('child-process-promise').exec;

const NOOP = () => { };

const RENDERER = 'CNCMaps.Renderer.exe';

const fullPath = path.join(__dirname, 'renderer', RENDERER);

// const mixDir = '/opt/gamefile';
const outputDir = ''; // -d
const mixDir = 'E:\\Games\\Westwood\\RA2'; // -m
// const inputMap = 'E:\\Games\\Westwood\\RA2\\amazon.mmx'; // -i

const isCreateThumbnail = true;
const THUMB_MAX_WIDTH = 800;

exports.render = (inputMap, outputName = '', callback = NOOP) => {
  // const inputMap = '/opt/gamefile/amazon.mmx';


  // const outputName = 'amazon'; // -o

  let command = `${fullPath} -i "${inputMap}" -j -m "${mixDir}" -r -S`;

  if (outputDir) {
    command += ` -d "${outputDir}"`;
  }

  if (outputName) {
    command += ` -o "${outputName}"`;
  }

  if (isCreateThumbnail) {
    command += ` -z ${process.platform !== 'win32'
      ? `+\\(${THUMB_MAX_WIDTH},0\\)` : `+(${THUMB_MAX_WIDTH},0)`}`;
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

      callback(null);
    })
    .catch(err => {
      console.error('ERROR: ', err);
      callback(err);
    });
};
