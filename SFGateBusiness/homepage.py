from bs4 import BeautifulSoup
from sys import stdin
import bs4
from urlparse import urljoin



def top_story(dictionary, soup):
    link = soup.find('div', attrs = {"class" : "hide-rss-link hdnce-e hdnce-collection-17062-centerpiece"}).find('a')['href']
    if link:
        dictionary["Top Story"].append(urljoin("http://www.sfgate.com/business/", link))

def main_headlines(dictionary, soup):
    for i in soup.find('div', attrs = {"class": "hide-rss-link hdnce-e hdnce-collection-21274-headline_list_illus"}).find_all('h4'):
        if i.find('a'):
            dictionary["Main Headlines"].append(urljoin("http://www.sfgate.com/business/", i.find('a')['href']))

def latest_blogs(dictionary, soup):
    for i in soup.find("div", attrs = {"class": "hide-rss-link hdnce-e hdnce-collection-17295-blogpromo_vertical"}).find_all('p'):
        if i.find("a"):
            dictionary["Latest Business Blogs"].append(urljoin("http://www.sfgate.com/business/", i.find('a')['href']))

def consumers_checkbook(dictionary, soup):
    for i in soup.find("div",attrs = {"class":"hide-rss-link hdnce-e hdnce-collection-22787-simple_list"}).find_all('h4'):
        if i.find('a'):
            dictionary["Bay Area Consumers' Checkbook"].append(urljoin("http://www.sfgate.com/business/", i.find('a')['href']))
   


def get_links(html):
    soup = BeautifulSoup(html)
    links = {"Top Story" : [], "Main Headlines" : [], "Latest Business Blogs" : [], "Bay Area Consumers' Checkbook" : []}
    top_story(links, soup)
    main_headlines(links, soup)
    latest_blogs(links, soup)
    consumers_checkbook(links, soup)
    return links

if __name__ == "__main__":
    from Scraper.Scraper import scraper
    #scraper.scrape()
     
    
 
