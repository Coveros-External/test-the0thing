/**
 * A class representing a web scraper.
 */
class WebScraper {
    /**
     * Creates a new instance of the WebScraper class.
     * @param {string} url - The URL of the website to scrape.
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Scrapes the website for links and page titles.
     * @returns {Promise<Array<{pageTitle: string, link: string}>>} - A promise that resolves to an array of objects containing page titles and links.
     */
    async scrape() {
        const response = await fetch(this.url);
        const text = await response.text();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");
        const links = htmlDoc.getElementsByTagName("a");
        const results = [];

        for (let i = 0; i < links.length; i++) {
            const link = links[i].href;
            const title = links[i].textContent.trim();

            if (link && link.startsWith("http") && title) {
                results.push({ pageTitle: title, link: link });
            }
        }

        return results;
    }
}
