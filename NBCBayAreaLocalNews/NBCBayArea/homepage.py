from bs4 import BeautifulSoup
from sys import stdin
import bs4
from urlparse import urljoin



def top_stories(dictionary, soup):
    for i in soup.find('div', attrs = {"id": "top-stories-list"}).find_all("li"):
        if i.find('a'):
            dictionary["Top Stories"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))
            top = soup.find("div", attrs = {"id": "top-stories-thumb"}).find("a")['href']
            if top:
                dictionary["Top Stories"].append(urljoin("http://www.nbcbayarea.com/", top))

def recent_local_news(dictionary, soup):
    for i in soup.find('div', attrs = {"data-vr-zone": "this-just-in-local"}).find_all('li'):
        if i.find('a'):
            dictionary["This Just In - Local"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))

def recent_usworld_news(dictionary, soup):
    for i in soup.find("div",attrs = {"data-vr-zone":"this-just-in-us-world"}).find_all('li'):
        if i.find('a'):
            dictionary["This Just In - US & World"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))

def investigative_unit(dictionary, soup):
    for i in soup.find("div",attrs = {"title":"TheInvestigativeUnit"}).find_all('li'):
        if i.find('a'):
            dictionary["The Investigative Unit"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))
            top = soup.find("div", attrs = {"title":"TheInvestigativeUnit"}).find("div", attrs = {"class" : "topStorySummary"}).find('a')['href']
            if top:
                dictionary["The Investigative Unit"].append(urljoin("http://www.nbcbayarea.com/", top))

def california_news(dictionary, soup):
    for i in soup.find("div",attrs = {"title":"CaliforniaNews"}).find_all('li'):
        if i.find('a'):
            dictionary["California News"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))
            top = soup.find("div", attrs = {"title":"CaliforniaNews"}).find("div", attrs = {"class" : "topStorySummary"}).find('a')['href']
            if top:
                dictionary["California News"].append(urljoin("http://www.nbcbayarea.com", top))

def bay_area_proud(dictionary, soup):
    for i in soup.find("div",attrs = {"title":"BayAreaProud"}).find_all('li'):
        if i.find('a'):
            dictionary["Bay Area Proud"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))
            top = soup.find("div", attrs = {"title":"BayAreaProud"}).find("div", attrs = {"class" : "topStorySummary"}).find('a')['href']
            if top:
                dictionary["Bay Area Proud"].append(urljoin("http://www.nbcbayarea.com", top))

def reality_check(dictionary, soup):
    for i in soup.find("div",attrs = {"title":"RealityCheck"}).find_all('li'):
        if i.find('a'):
            dictionary["Reality Check"].append(urljoin("http://www.nbcbayarea.com/", i.find('a')['href']))
            top = soup.find("div", attrs = {"title":"RealityCheck"}).find("div", attrs = {"class" : "topStorySummary"}).find('a')['href']
            if top:
                dictionary["Reality Check"].append(urljoin("http://www.nbcbayarea.com", top))

def get_links(html):
    soup = BeautifulSoup(html)
    links = {"Top Stories" : [], "This Just In - Local" : [], "This Just In - US & World" : [],\
    "The Investigative Unit" : [], "California News" : [], "Bay Area Proud" : [], "Reality Check" : []}
    top_stories(links, soup)
    recent_usworld_news(links, soup)
    recent_local_news(links, soup)
    investigative_unit(links, soup)
    california_news(links, soup)
    bay_area_proud(links, soup)
    reality_check(links, soup)
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
    scraper.scrape("http://www.nbcbayarea.com/", "NBC Bay Area", "nbc_bay_area", get_links)
