var deps = [
    "main.js", 
    "utils.js",
    "histogram.js"
];

if (typeof exports !== 'undefined') {
	exports.deps = deps;
}
if (typeof devOnLoad === 'function') {
	devOnLoad(deps);
}