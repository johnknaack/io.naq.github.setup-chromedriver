import { expect } from 'chai';

describe('Sample Test Page', async function() {
  it('should load with example h1', async function() {
    await browser.url('http://localhost:8080/');
    await browser.pause(2000);

    const header = await browser.$('#example-h1');
    await header.waitForDisplayed({ timeout: 3000 })
    const text = await header.getText();
    expect(text).to.equal('Example Header');
  });
});
