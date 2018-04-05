'use strict';

const puppeteer = require('puppeteer');
const program = require('commander');

(async () => {

  //program
  program
    .version('0.1.0')
    .option('-u, --url <url>', 'Input URL')
    .option('-p, --pcwidth [size]', 'Set viewport width for PC (default: 1280)')
    .option('-P, --pcheight [size]', 'Set viewport height for PC (default: 1024)')
    .option('-s, --spwidth [size]', 'Set viewport width for smartphone (default: 375)')
    .option('-S, --spheight [size]', 'Set viewport height for smartphone (default: 667)')
    .parse(process.argv);

  if(program.pcwidth)
    var pcWidth = program.pcwidth;
  else
    var pcWidth = 1280;

  if(program.pcheight)
    var pcHeight = program.pcheight;
  else
    var pcHeight = 1024;

  if(program.spwidth)
    var spWidth = program.spwidth;
  else
    var spWidth = 375;
  
  if(program.spheight)
    var spHeight = program.spheight;
  else
    var spHeight = 667;

  //puppeteer
  const browser = await puppeteer.launch({
                    args :[
                      '--hide-scrollbars'
                    ]
                  });
  const page = await browser.newPage();
  const url = program.url;

  await page.goto(url, {
    waitUntil:['domcontentloaded', 'networkidle0']
  });
  const basename = encodeURIComponent(await page.url());

  await page.setViewport({
  	width: pcWidth,
  	height: pcHeight
  });
  await page.screenshot({
    path: `screenshot/${basename}.png`,
    fullPage: true
  });

  await page.setViewport({
  	width: spWidth,
  	height: spHeight
  });
  await page.screenshot({
    path: `screenshot/${basename}-sp.png`,
    fullPage: true
  });

  await browser.close();
})();
