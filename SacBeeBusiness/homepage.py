from bs4 import *
from sys import stdin
from urlparse import urljoin

def get_main_stories(dictionary, soup): 
    dictionary["Main Stories"]= []
    for i in soup.find('div', attrs = {"id" = "left_column"}).find_all('div', attrs = {"class":"story lingo_region"}):
        if i.find('a'):
            dictionary["Main Stories"].append(i.find('a'))  

def get_taxes(dictionary, soup):
    dictionary["Taxes"] = []
    
