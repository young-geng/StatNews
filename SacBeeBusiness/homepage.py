from bs4 import *
from sys import stdin
from urlparse import urljoin

def get_main_stories(dictionary, soup): 
    dictionary["Main Stories"]= []
    top = soup.find('div', attrs = {'class' : 'story story-top clearfix last'}).find('a')['href']
    dictionary["Main Stories"].append(urljoin("http://www.sacbee.com/business/", top))
    for i in soup.find('div', attrs = {"id" : "left_column"}).find_all('div', attrs = {"class":"story lingo_region"}):
        if i.find('a'):
            dictionary["Main Stories"].append(i.find('a')['href'])  

def get_departments(dictionary, soup):
    dictionary["Departments"] = []
    center = soup.find('div', attrs = {"id" : "center_column"})
    for i in center.find_all('div', attrs = {"class" : "story lingo_region last"}):
        if i.find('a'):
            dictionary["Departments"].append(urljoin("http://www.sacbee.com/business/", i.find('a')['href']))
    for i in center.find_all('div', attrs = {"class" : "story-list"}):
            for link in i.find_all('a'):
                dictionary["Departments"].append(urljoin("http://www.sacbee.com/business/",link['href']))
    
def get_links(html):
    soup = BeautifulSoup(html)
    links = {}
    get_main_stories(links, soup)
    get_departments(links, soup)
    return links

if __name__ == "__main__":
    test = open("test.html").read()
    result = get_links(test)
    for a, b in result.items():
        print a + "\n"
        for i in b:
            print i + "\n"
        print "\n\n\n"
     