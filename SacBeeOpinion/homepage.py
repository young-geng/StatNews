from bs4 import *
from sys import stdin
from urlparse import urljoin

def get_editorials(dictionary, soup):
    dictionary["Editorials"] = []
    top = soup.find('div', attrs = {"class" : "story story-top clearfix last"}).find('a')
    dictionary["Editorials"].append(urljoin("http://www.sacbee.com/opinion/", top['href']))
    for item in soup.find_all('div', attrs = {"class" : "story lingo_region"}):
        if item.find('a'):
                dictionary["Editorials"].append(urljoin("http://www.sacbee.com/opinion/", item.find('a')['href']))     
    last = soup.find('div', attrs = {"class" : "story lingo_region last"}).find('a')
    if last:
        dictionary["Editorials"].append(urljoin("http://www.sacbee.com/opinion/", last['href']))

def get_blogs(dictionary, soup):
    dictionary["Blogs and Letters to the Editor"] = []
    center = soup.find('div', attrs = {"class" : "tier"}).find('div', attrs = {'class' : 'gridunit grid-cd'})
    for i in center.find_all('div', attrs = {"class" : "story-list"}):
            for item in i.find_all('li'):
                    if item.find('a'):
                        dictionary["Blogs and Letters to the Editor"].append(urljoin("http://www.sacbee.com/local/", item.find('a')['href']))     

def get_links(html):
    soup = BeautifulSoup(html)
    links = {}
    get_editorials(links, soup)
    get_blogs(links, soup)
    return links

# Test Code for Debugging
# if __name__ == "__main__":
#     test = open("test.html").read()
#     result = get_links(test)
#     for a, b in result.items():
#         print a + "\n"
#         for i in b:
#             print i + "\n"
#         print "\n\n\n"

if __name__ == "__main__":
    from Scraper.Scraper import scraper
    scraper.scrape("http://www.sacbee.com/opinion/", "Sacramento Bee Opinion", "sacbee_opinion", get_links)
     
