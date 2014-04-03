from bs4 import BeautifulSoup
from urlparse import urljoin



def getBayArea(dictionary, soup):
    for i in soup.find("div",attrs = {'class': "hide-rss-link hdnce-e hdnce-collection-14737-home_category"}).find_all("li"):
        if i.find('a'):
            dictionary["Bay Area"].append(urljoin("http://www.sfgate.com/", i.find('a')['href']))

def getBizTech(dictionary, soup):
    for i in soup.find("div",attrs = {"class":"hide-rss-link hdnce-e hdnce-collection-14743-home_category"}).find_all("li"):
        if i.find('a'):
            dictionary["Business & Technology"].append(urljoin("http://www.sfgate.com/", i.find('a')['href']))

def getFoodWine(dictionary, soup):
    for i in soup.find("div",attrs = {"class":"hide-rss-link hdnce-e hdnce-collection-14718-home_category"}).find_all("li"):
        if i.find('a'):
            dictionary["Food & Wine"].append(urljoin("http://www.sfgate.com/", i.find('a')['href']))

def getJobs(dictionary, soup):
    for i in soup.find("div",attrs = {"class":"hide-rss-link hdnce-e hdnce-collection-22405-home_category"}).find_all("li"):
        if i.find('a'):
            dictionary["Jobs"].append(urljoin("http://www.sfgate.com/", i.find('a')['href']))

def getRealEstate(dictionary, soup):
    for i in soup.find("div",attrs = {"class":"hide-rss-link hdnce-e hdnce-collection-22404-home_category"}).find_all("li"):
        if i.find('a'):
            dictionary["Real Estate"].append(urljoin("http://www.sfgate.com/", i.find('a')['href']))

def get_links(html):
    soup = BeautifulSoup(html)
    links = {"Bay Area" : [], "Business & Technology" : [], "Food & Wine" : [], "Jobs" : [], "Real Estate" : []}
    getBayArea(links, soup)
    getBizTech(links, soup)
    getFoodWine(links, soup)
    getJobs(links, soup)
    getRealEstate(links, soup)
    return links

