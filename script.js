import * as cheerio from "cheerio";

function log(msg) {
  console.log(msg);
}

// Fetch the gold.ac.uk sitemap
async function fetchSiteMap() {
  let response = await fetch("https://www.gold.ac.uk/sitemap-en.xml");
  let xmlBody = await response.text();

  let sitemapObject = cheerio.load(xmlBody, {
    xml: true,
  });
  return sitemapObject;
}

async function buildUrlList() {
  let sitemapObj = await fetchSiteMap();
  let xmlUrls = sitemapObj("loc");
  let urlList = [];

  for (let url of xmlUrls) {
    let link = url.children[0].data;
    link = link.replace(/^.*\/\/[^\/]+/, "");
    urlList.push(link);
  }
  return urlList;
}

let sitemap = await buildUrlList();

log(sitemap.length);

// async function scrape(url) {
//   let response = await fetch(url);
//   let htmlBody = await response.text();

//   let $ = cheerio.load(htmlBody);
//   return $;
// }

// let result = await scrape("https://www.gold.ac.uk/ba-journalism");

// let links = result("a");

// for (let link of links) {
//   log(link.attribs.href);
// }
