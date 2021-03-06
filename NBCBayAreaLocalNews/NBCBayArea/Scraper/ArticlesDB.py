import codecs
import sqlite3 as sql


def DB_input(articles, DB_name):
    '''
    Creates or connects to SQLite 3 database DB_name.
    Reads in contents of articles into DB_name as a table called 'articles'.
    
    Parameter articles should be a list of dictionaries, e.g.
        articles = [{'articleText': 'New restaurant opens in ...', 'title': 'Restaurant Review', ... , 
        'comments': 'N/A'}, {'articleText': 'something something', 'title': 'some title', ... , 
        'comments': 'N/A'}]
        
    Dict content must be unicode string except for articlePosition and cleanFormat!
        
    Each dict is read in as a line in the table 'articles'.
    '''
    '''
    NOTES ON VARIABLES i.e. DICT KEYS
    
    id - auto generated by sqlite
    articleText - full text of the article
    title - title of the article
    byline - e.g. 'By Jennifer Graue Bay Area News Group'
    articleDate - data article was published. Format: "YYYY-MM-DD"
    section - e.g. 'Local Blog News' or 'Business'
    articlePosition - [INT] location of the article in its section from top
    cleanFormat - [INT] 1 if text is clean and well organized, 0 if broken up/ contains ads/ scrambled
    newspaperName - name of the newspaper
    source - e.g. 'web scraped', 'Lexis Nexis'
    accessDate - when the site was scraped or Lexis Nexis was accessed 
    comments - any comments or notes you want to add
    
    Some of these variables don't apply to Lexis Nexis data, just use 'N/A' for TEXT fields or -1 for INTEGER fields.
    
 .
    

    NOTES ABOUT SQLITE 3
    
    Only since quotes allowed for text i.e. 'hello' not "hello". 
    
    Here is a quick tutorial: http://www.pythoncentral.io/introduction-to-sqlite-in-python/
    '''
    
    assert type(DB_name) == str 
    assert type(articles) == list 
    assert type(articles[0]) == dict
    
    db = sql.connect(DB_name)
    
    cursor = db.cursor() 
    
    # Create articles table
    # Mixed case indicates column name and upper case indicates variable type
    
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY, articleText TEXT, title TEXT, 
        byline TEXT, articleDate TEXT, section TEXT, articlePosition INTEGER, cleanFormat INTEGER, 
        newspaperName TEXT, source TEXT, accessDate TEXT, comments TEXT)
    ''')
    db.commit()
    
    # Read data into articles database
    cursor = db.cursor()
    
    for article in articles:
        cursor.execute('''INSERT INTO articles(articleText, title, byline,
        articleDate, section, articlePosition, cleanFormat, newspaperName, source, 
        accessDate, comments) 
        VALUES(:articleText, :title, :byline, :articleDate, :section, :articlePosition, 
        :cleanFormat, :newspaperName, :source, :accessDate, :comments)''', article)
        db.commit()
    
    # Close database
    db.close()

def drop_articles(DB_name):
    '''
    Drops articles table from DB if you want to start over.
    '''
    db = sql.connect(DB_name)
    cursor = db.cursor() 
    
    cursor.execute('''DROP TABLE articles''')
    db.commit()
    db.close()

def DB_read(DB_name):
    '''
    Reads entries from articles table.
    '''
    db = sql.connect(DB_name)
    cursor = db.cursor() 

    cursor.execute('''SELECT title, articleDate, section FROM articles''')
    all_rows = cursor.fetchall()
    
    db.close()
    
    for row in all_rows:
        # row[0] returns the first column in the query (name), etc.
        print(row[0], row[1], row[2])
    
    return(all_rows)   

