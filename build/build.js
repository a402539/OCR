var fs = require('fs'),
    UglifyJS = require('uglify-js'),
    deps = require('./deps.js').deps;

function combineFiles(files) {
	var content = '';
	for (var i = 0, len = files.length; i < len; i++) {
		content += fs.readFileSync('src/' + files[i], 'utf8') + '\n\n';
	}
	return content;
}
function chkDistPath() {
	if(!fs.existsSync('dist')) { 
		fs.mkdirSync('dist');
	}
}

exports.build = function () {

	console.log('Concatenating ' + deps.length + ' files...');
	chkDistPath();

	var copy = fs.readFileSync('src/copyright.js', 'utf8'),
	    intro = '(function () {\n"use strict";\n',
	    outro = '}());',
	    newSrc = copy + intro + combineFiles(deps) + outro,
	    pathPart = 'dist/textExtract',
	    srcPath = pathPart + '-src.js';

	console.log('\tUncompressed size: ' + newSrc.length + ' bytes');

	fs.writeFileSync(srcPath, newSrc);
	console.log('\tSaved to ' + srcPath);

	console.log('Compressing...');

	var path = pathPart + '.js',
		newCompressed = copy + UglifyJS.minify(newSrc, {
			warnings: true,
			fromString: true
		}).code;

	console.log('\tCompressed size: ' + newCompressed.length + ' bytes');
	fs.writeFileSync(path, newCompressed);
	console.log('\tSaved to ' + path);
};

exports.buildDev = function () {
    console.log('\Create development version of textExtract-src.js');
    var deps = fs.readFileSync('build/deps.js', 'utf8'),
        includeWidget = fs.readFileSync('build/include-src.js', 'utf8');

	chkDistPath();

	fs.writeFileSync('dist/textExtract-src.js', deps + includeWidget);
}