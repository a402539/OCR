/*
Leaflet-GeoMixer building scripts.
*/

var build = require('./build/build.js');

desc('Combine and compress Leaflet-GeoMixer source files');
task('build', build.build);

desc('Combine and compress Leaflet-GeoMixer source files for development enviroment');
task('dev', build.buildDev);

task('default', ['build']);
