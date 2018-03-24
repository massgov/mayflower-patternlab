/* eslint strict: ["error", "global"] */
/**
 * Configuration file for webdriverio.
 *
 * @see docs/wdio.md
 */
'use strict';
var path = require('path');
var os = require('os');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
    return function (context) {
        var testName = context.test.title;
        var resolution = `${context.meta.viewport.width}x${context.meta.viewport.height}`;
        var browserVersion = parseInt(/\d+/.exec(context.browser.version)[0]);
        var browserName = context.browser.name;
        return path.join(basePath, `${testName}_${resolution}_${browserName}_v${browserVersion}.png`);
    };
}

const reporters = process.env.JUNIT ? ['dot', 'junit'] : ['dot'];
const reporterOptions = process.env.JUNIT ? {
    junit: {
        outputDir: process.env.JUNIT
    }
} : {};

exports.config = {
    host: process.env.SELENIUM_HOST || 'localhost', // hostname for the Selenium server.
    specs: [path.join(__dirname, 'specs/*.js')], // test files kept here.
    capabilities: [{ // browsers to test in.
        browserName: 'chrome'
    }],
    maxInstances: 1,
    // The URL for the static server.
    baseUrl: `http://${os.hostname()}:4567`,
    plugins: {
        'wdio-screenshot': {}
    },
    services: [
        'static-server',
        'visual-regression'
    ],
    staticServerFolders: [
        {mount: '/', path: `${__dirname}/../styleguide/public`}
    ],
    staticServerPort: 4567,
    mochaOpts: {
        timeout: 30000,
    },
    waitforTimeout: 300,
    waitForInterval: 200,
    visualRegression: {
        compare: new VisualRegressionCompare.LocalCompare({
            referenceName: getScreenshotName(path.join(__dirname, 'screenshots/reference')),
            screenshotName: getScreenshotName(path.join(__dirname, 'screenshots/taken')),
            diffName: getScreenshotName(path.join(__dirname, 'screenshots/diff')),
        }),
        viewports: [
            {width: 320, height: 480},
            {width: 1024, height: 768}
        ]
    },
    reporters,
    reporterOptions
};