
var assert = require('assert');
var scan = require('scan-folder');
var path = require('path');

var patternPath = __dirname + '/../../styleguide/public/patterns/';

/**
 * Scan for page patterns.
 */
var files = scan(patternPath, 'html')
    .filter(function(f) {
        // Only include pages that are not index.html or *.markup-only.html.
        return !f.match(/\/index.html$/)
            && !f.match(/markup-only.html$/)
            && f.match(/\/05-pages/)
    })
    .map(function(file) {
        return {
            name: path.basename(file, '.html').replace('05-pages-', ''),
            url: `/patterns/${path.relative(patternPath, file)}`
        }
    });

describe('Visual Regression', function() {
    files.forEach(function(page) {
        it(page.name, function() {
            browser.url(page.url);
            const report = browser.checkDocument();
            assertNoDiff(report, 'Matches designs');
        });
    })
});

function assertNoDiff(results, message) {
    results.forEach(result => assert.ok(result.isWithinMisMatchTolerance, message));
}
