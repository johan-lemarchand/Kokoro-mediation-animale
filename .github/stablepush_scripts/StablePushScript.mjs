
    import puppeteer from 'puppeteer';
    import { AxePuppeteer } from 'axe-puppeteer';
    import axios from 'axios';

    import lighthouse from 'lighthouse';

  (async () => {
    const port = process.env.PORT || 8080;  // Default port for http-server
    const appUrl = `http://localhost:${port}`;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(appUrl, { waitUntil: 'networkidle2' });

    const axeResults = await new AxePuppeteer(page).analyze();

    const html = await page.content();

    const { lhr: lighthouseReport } = await lighthouse(appUrl, {
      port: new URL(browser.wsEndpoint()).port,  // Use Puppeteer's browser
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
    });

    await browser.close();

    const githubMetadata = {
      repository: process.env.GITHUB_REPOSITORY,
      branch: process.env.GITHUB_REF_NAME,
      commit: process.env.GITHUB_SHA,
      evtCreator: process.env.GITHUB_ACTOR,
      triggeredBy: process.env.GITHUB_EVENT_NAME,
    };

    const requestData = {
      html: html,  // Send the raw HTML
      accessibilityResults: axeResults,  // Send accessibility results
      lighthouseResults: lighthouseReport,  // Send Lighthouse results
      metadata: githubMetadata,  // Send GitHub metadata (repository, branch, commit)
    };

    try {
      await axios.post('https://runtests-wa7ihuykea-uc.a.run.app', {
        requestData
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.STABLEPUSH_SECRET_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error sending data to the service:', error);
    }
      })();
    