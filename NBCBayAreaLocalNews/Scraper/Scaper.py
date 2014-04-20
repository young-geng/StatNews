from download import download
from extract_date import parse_date_str
from chipmunk import extract_content
from ArticlesDB import DB_input
import datetime



def get_articles(homepage_url, link_extracter, site_name):
    index_page = download(homepage_url)

    links = link_extracter(index_page)

    counter = 0
    article_list = []


    for section in links:
        temp = 1
        for link in links[section]:
            print "processing link " + str(temp) + " of " + str(len(links[section])) + " in section " + section
            temp += 1
            page = download(link)
            title, text = extract_content(page)
            date = parse_date_str(page)


            article = {}
            article["articleText"] = text
            article["title"] = title
            article["byline"] = "N/A"
            article["articleDate"] = date
            article["section"] = section
            article["articlePosition"] = counter
            article["cleanFormat"] = 1
            article["newspaperName"] = site_name
            article["source"] = "web scraped"
            article["accessDate"] = str(datetime.date.today())
            article["comments"] = "N/A"
            counter += 1;
            article_list.append(article)
        return article_list



def scrape(homepage_url, site_name, db_name, link_extracter):
    article_list = get_articles(homepage_url, link_extracter, site_name)
    DB_input(article_list, db_name)

