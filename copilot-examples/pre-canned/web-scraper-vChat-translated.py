# Translated from javascript using the Copilot Labs translate tool
    import aiohttp
    from bs4 import BeautifulSoup

    class WebScraper:
        def __init__(self, url):
            self.url = url

        async def scrape(self):
            async with aiohttp.ClientSession() as session:
                async with session.get(self.url) as response:
                    text = await response.text()
                    soup = BeautifulSoup(text, 'html.parser')
                    links = soup.find_all('a')
                    results = []

                    for link in links:
                        href = link.get('href')
                        title = link.string

                        if href and href.startswith("http") and title:
                            results.append({"pageTitle": title.strip(), "link": href})

                    return results
