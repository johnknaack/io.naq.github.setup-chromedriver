import fs from 'fs';
import path from 'path';

const sanitizeFilename = (filename) => filename.replace(/[<>:"\/\\|?*]/g, '_');

export const config = {
    runner: 'local',
    specs: [
        './examples/**/*.test.js'
    ],
    exclude: [
    ],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--load-extension=./examples/extension/',
                '--window-size=1920,1080',

                // Required to load browser with extensions
                '--disable-dev-shm-usage',
                '--disable-software-rasterizer',
                '--disable-features=VizDisplayCompositor',

                // Required for linkedin to load with extensions
                "--access-control-allow-origin",
            ].concat(process.env.WITH_HEAD ? [] : [
                // Required for start chromedriver headless
                '--headless=new',
                '--no-sandbox',
                '--disable-gpu',
            ])
        }
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function(test) {
        // Ensure the output directory exists
        if (!fs.existsSync('./output')) {
            fs.mkdirSync('./output');
        }

        // Save the screenshoti
        const testName = test.title.replace(/\s+/g, '_'); // Replace whitespace with underscores
        const safeTestName = sanitizeFilename(testName); // Sanitize the test name to create a file-safe string
        const screenShotPath = path.join('./output', `${safeTestName}.png`);
        await browser.saveScreenshot(screenShotPath);
    },
}
