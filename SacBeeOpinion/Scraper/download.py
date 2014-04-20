import urllib2


def download(url):
    response = urllib2.urlopen(url, timeout = 10)
    return str(response.read())