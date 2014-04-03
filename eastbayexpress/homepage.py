from bs4 import BeautifulSoup
from sys import stdin
import bs4
from urlparse import urljoin



def local_blogs_news(dictionary, soup):
    for i in soup.find('div', attrs = {"id": "LocalBlogsNews"}).find_all('div', attrs = {"class": "title"}):
        if i:
            dictionary["Local News Blogs"].append(urljoin("http://www.eastbayexpress.com/", i.find('a')['href']))


def local_blogs_culture(dictionary, soup):
    for i in soup.find('div', attrs = {"id": "LocalBlogsCulture"}).find_all('div', attrs = {"class": "title"}):
        if i:
            dictionary["Local Culture Blogs"].append(urljoin("http://www.eastbayexpress.com/", i.find('a')['href']))


def home_main_news(dictionary, soup):
    for i in soup.find("div",attrs = {"id":"HomeMainNews"}).find_all("div", attrs = {"class": "storyItem"}):
        if i:
            dictionary["News"].append(urljoin("http://www.eastbayexpress.com/", i.find('a')['href']))


def home_main_food_drink(dictionary, soup):
    for i in soup.find("div", attrs = {"id": "HomeMainFoodDrink"}).find_all("div", attrs = {"class": "storyItem"}):
        for j in i.find_all("a"):
            if j:
                dictionary["Food & Drink"].append(urljoin("http://www.eastbayexpress.com/", j['href']))

def home_main_arts(dictionary, soup):
    for i in soup.find("div", attrs = {"id": "HomeMainArts"}).find_all("div", attrs = {"class": "storyItem"}):
        for j in i.find_all("a"):
            if i:
                dictionary["Arts"].append(urljoin("http://www.eastbayexpress.com/", j['href']))

def get_links(html):
    soup = BeautifulSoup(html)
    links = {"Local News Blogs" : [], "Local Culture Blogs" : [], "Food & Drink" : [], "News" : [], "Arts" : []}
    local_blogs_news(links, soup)
    local_blogs_culture(links, soup)
    home_main_news(links, soup)
    home_main_food_drink(links, soup)
    home_main_arts(links, soup)
    return links

if __name__ == "__main__":
    test = open("test.html").read()
    result = get_links(test)
    for a, b in result.items():
        print a + "\n"
        print b
     
    
 
