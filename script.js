import * as cheerio from "cheerio";

function log(msg) {
  console.log(msg);
}

async function scrape(url) {
  let response = await fetch(url);
  let htmlBody = await response.text();

  let $ = cheerio.load(htmlBody);
  return $;
}

let result = await scrape("https://www.gold.ac.uk/ba-journalism");

let links = result("a");

// for (let link of links) {
//   log(link.attribs.href);
// }
