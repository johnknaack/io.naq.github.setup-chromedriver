import fs from 'fs';
import path from 'path';

function sanitizeFilename(filename) {
    return filename.replace(/[<>:"\/\\|?*]/g, '_');
}

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
                '--no-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--remote-debugging-port=9222',
                '--remote-debugging-address=0.0.0.0',
                '--disable-software-rasterizer',
                '--disable-features=VizDisplayCompositor',
                "--load-extension=./pkg_chrome_ext_qa",

                "--webview-enable-modern-cookie-same-site",
                "--disable-cookie-encryption",
                "--window-size=1920,1080",
                "--enable-automation",
                "--ignore-certificate-errors",

                "--disable-web-security",
                "--x-frame-options=SAMEORIGIN",
                "–-allow-file-access-from-files",
                "--enable-allow-all-cookies",
                "--enable-experimental-cookie-features",
                "--disable-features=IsolateOrigins,site-per-process",
                "--access-control-allow-origin",
                "--access-control-allow-methods",
                "--access-control-allow-headers",
                "--access-control-allow-credentials",

                "--disable-infobars",
                "--headless=new",
                "--disable-setuid-sandbox",
                "--allow-insecure-localhost",

                "--disable-site-isolation-trials",
            ]
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
