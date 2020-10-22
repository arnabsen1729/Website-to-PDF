const puppeteer = require('puppeteer')

async function printPDF(pageLink) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(decodeURI(pageLink), { waitUntil: 'networkidle2' });
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdf
}

module.exports = {printPDF}