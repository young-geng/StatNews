from bs4 import *
from sys import stdin
from urlparse import urljoin

def get_main_stories(dictionary, soup): 
    dictionary["Main Stories"]= []
    for i in soup.find('div', attrs = {"id" : "left_column"}).find_all('div', attrs = {"class":"story lingo_region"}):
        if i.find('a'):
            dictionary["Main Stories"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))  

def get_crime(dictionary, soup):
    dictionary["Crime Blogs"] = []
    for i in soup.find('div', attrs = {"id" : "sacto911 top #ourregion" }).find_all('li'):
            if i.find('a'):
                dictionary["Crime Blogs"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))

def get_city_beat(dictionary, soup):
    dictionary["City Beat Blog"] = []
    for i in soup.find('div', attrs = {"id" : "city beat 4 OR"}).find_all('li'):
            if i.find('a'):
                dictionary["City Beat Blog"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))
 
def get_health(dictionary, soup):
    dictionary["Healthy Choices Blog"] = []
    for i in soup.find('div', attrs = {"id" : "#healthy blog module OR"}).find_all('li'):
            if i.find('a'):
                dictionary["Healthy Choices Blog"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     
 
def get_real_estate_transportation(dictionary, soup):
    dictionary["Transportation and Real Estate"] = []
    center = soup.find('div', attrs = {"class" : "tier"}).find('div', attrs = {'class' : 'gridunit grid-c'})
    tops = center.find('div', attrs = {'class': "story"}).find_all('a')
    for top in tops:
        dictionary["Transportation and Real Estate"].append(urljoin("http://www.sacbee.com/local/", top['href']))
    for items in center.find_all('div', attrs = {"class" : "story-list"}):
            for i in items.find_all('li'):
                dictionary["Transportation and Real Estate"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     

def get_health_care(dictionary, soup):
    dictionary["Health Care"] = []
    center = soup.find('div', attrs = {"class" : "tier"}).find('div', attrs = {'class' : 'gridunit grid-d'})
    for i in center.find('div', attrs = {"class" : "story-list"}).find_all('li'):
            if i.find('a'):
                dictionary["Health Care"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     

def get_arena(dictionary, soup):
    dictionary["Arena"] = []
    center = soup.find('div', attrs = {"class" : "lower tier"}).find('div', attrs = {'class' : 'gridunit grid-a'})   
    for i in center.find('div', attrs = {"class" : "story-list"}).find_all('li'):
            if i.find('a'):
                dictionary["Arena"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     

def get_boomers(dictionary, soup):
    dictionary["Boomers"] = []
    center = soup.find('div', attrs = {"class" : "lower tier"}).find('div', attrs = {'class' : 'gridunit grid-b'})   
    for i in center.find('div', attrs = {"class" : "story-list"}).find_all('li'):
            if i.find('a'):
                dictionary["Boomers"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     

def get_charity(dictionary, soup):
    dictionary["Helping Others"] = []
    center = soup.find('div', attrs = {"class" : "lower tier"}).find('div', attrs = {'class' : 'gridunit grid-c'})   
    for i in center.find('div', attrs = {"class" : "story-list"}).find_all('li'):
            if i.find('a'):
                dictionary["Helping Others"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     


def get_homeless(dictionary, soup):
    dictionary["Homeless"] = []
    center = soup.find('div', attrs = {"class" : "lower tier"}).find('div', attrs = {'class' : 'gridunit grid-d'})   
    for i in center.find('div', attrs = {"class" : "story-list"}).find_all('li'):
            if i.find('a'):
                dictionary["Homeless"].append(urljoin("http://www.sacbee.com/local/", i.find('a')['href']))     






def get_links(html):
    soup = BeautifulSoup(html)
    links = {}
    get_main_stories(links, soup)
    get_crime(links, soup)
    get_city_beat(links, soup)
    get_health(links, soup)
    get_real_estate_transportation(links, soup)
    get_health_care(links, soup)
    get_arena(links, soup)
    get_boomers(links, soup)
    get_charity(links, soup)
    get_homeless(links, soup)
    return links

#Test Code for Debugging
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
    scraper.scrape("http://www.sacbee.com/local/", "Sacramento Bee Local", "sacbee_local", get_links)