import dateutil.parser as dparser
from sys import stdin
import re




def parse_date(text):
    date_list = re.findall(r"([Dd]ate.)(.{30})", text)
    big = None
    for i in date_list:
        try:
            x = dparser.parse(i[1], fuzzy=True, ignoretz=True)
            if str(x) == str(dparser.parse("", fuzzy=True, ignoretz=True)):
                continue
            if big == None or x > big:
                big = x
        except Exception:
            continue
    if big == None:
        return "N/A"
    return big

def parse_date_str(text):
    return str(parse_date(text))[0:10]


if __name__ == "__main__":
    print parse_date_str(stdin.read())



