from bs4 import BeautifulSoup
from sys import stdin
import bs4
from urlparse import urljoin



def top_stories(dictionary, soup):
    for i in soup.find('div', attrs = {"id": "most-read-module"}).find("ul", attrs = {"class": "topFive selected"}).find_all('a'):
        if i:
            dictionary["Top Stories"].append(urljoin("http://www.nbcbayarea.com/news/local/", i['href']))
    for i in soup.find('div', attrs = {"id": "most-read-module"}).find("ul", attrs = {"class": "topFive"}).find_all('a'):
        if i:
            dictionary["Top Stories"].append(urljoin("http://www.nbcbayarea.com/news/local/", i['href']))

def all_stories(dictionary, soup):
    for i in soup.find('div', attrs = {"id": "main"}).find_all('p'):
        if i.find('a'):
            dictionary["All Stories"].append(urljoin("http://www.nbcbayarea.com/news/local/", i.find('a')['href']))



def get_links(html):
    soup = BeautifulSoup(html)
    links = {"Top Stories" : [], "All Stories" : []}
    top_stories(links, soup)
    all_stories(links, soup)
    return links

#Test Code for Debugging
# if __name__ == "__main__":
#     test = open("test.html").read()
#     result = get_links(test)
#     for a, b in result.items():
#         print a + "\n"
#         print b
     
if __name__ == "__main__":
    from Scraper.Scraper import scraper
    scraper.scrape("http://www.nbcbayarea.com/news/local", "NBC Bay Area Local", "nbc_bay_area_local", get_links)
 
