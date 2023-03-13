// This runs, but I have many questions...

import * as cheerio from "cheerio";

function log(msg) {
  console.log(msg);
}

async function requestAndLoad(url) {
  let response = await fetch(url);
  let html = await response.text();
  let $ = cheerio.load(html);
  return $;
}

let $ = await requestAndLoad("https://www.gold.ac.uk/ba-journalism");

const linkObjects = $("a");
// this is a mass object, not an array - wtf does that mean, what's a mass object??

// Collect the "href" and "title" of each link and add them to an array
const links = [];

// How is this .each working??
linkObjects.each((index, element) => {
  links.push({
    text: $(element).text(), // get the text
    href: $(element).attr("href"), // get the href attribute
  });
});

log(links);

// // I think allLinks should be an array of all <a> on the page, but it doens't seem like that's what this returns?
// let allLinks = $("body").find("a");

// for (let link of allLinks) {
//   log($(link));
// }
