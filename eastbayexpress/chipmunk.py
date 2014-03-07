#!/usr/bin/python

# Copyright 2014 Edouard Grave
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import bs4

def extract_features(node):
    node.feats = {}

    if isinstance(node, bs4.NavigableString):
        node.feats['text length'] = len(' '.join(node.split()))
        node.feats['html length'] = node.feats['text length']

    if isinstance(node, bs4.Tag):
        node.feats['text length'] = 0
        node.feats['html length'] = len(node.prettify())
        for child in node.children:
            extract_features(child)
            node.feats['text length'] += child.feats['text length']

def compute_score(node):
    feats = node.feats
    
    if feats['html length'] == 0:
        feats['html length'] = 1

    score = float(feats['text length']) / feats['html length']
    if isinstance(node, bs4.Tag):
        if node.name == 'p':
            score += 0.5
        elif node.name == 'div':
            score -= 0.2

    return score

def add_block(block, blocks, scores):
    text_length, html_length = 0, 0

    for node in block:
        text_length += node.feats['text length']
        html_length += node.feats['html length']

    blocks.append(block)
    scores.append(float(text_length**2)/html_length)

def extract_text_blocks(node, blocks, scores):
    block = []
    skips = 0

    if not isinstance(node, bs4.Tag):
        return

    for child in node.children:
        extract_text_blocks(child, blocks, scores)
        
        score = compute_score(child)
        if score > 0.8:
            block.append(child)
            skips = 0
        elif len(block) > 0:
            if isinstance(child, bs4.Tag):
                skips += 1

        if skips > 4:
            add_block(block, blocks, scores)
            block = []
            skips = 0

    if len(block) > 0:
        add_block(block, blocks, scores)

def extract_strings(node, strings=None):
    if strings == None:
        strings = []

    if node == None:
        return strings
    
    if isinstance(node, bs4.NavigableString):
        strings.append(node)
        return strings
    
    for child in node.children:
        extract_strings(child, strings)

    return strings

def remove_multiple_spaces(string):
    return ' '.join(string.split())

def extract_title(soup):
    page_title = extract_strings(soup.find('title'))
    page_title = remove_multiple_spaces(' '.join(page_title))
    page_title_lower = page_title.lower()

    candidates = []
    for node in soup.find_all(['h1', 'h2', 'h3', 'h4']):
        candidates.append(' '.join(extract_strings(node)))
    candidates = map(remove_multiple_spaces, candidates)

    title = ''
    for c in candidates:
        if len(c) > len(title) and page_title_lower.find(c.lower()) != -1:
            title = c

    if title == '':
        return page_title
    else:
        return title

def preprocessing(html_page, encoding=None):
    if encoding == None:
        soup = bs4.BeautifulSoup(html_page)
    else:
        soup = bs4.BeautifulSoup(html_page, from_encoding=encoding)

    for node in soup.find_all(['script', 'style', 'img']):
        node.extract()

    for node in soup.find_all(text=lambda e:isinstance(e, bs4.Comment)):
        node.extract()

    for node in soup.find_all(['a', 'em', 'strong']):
        node.replace_with_children()

    return soup

def get_best_block(blocks, scores):
    best_block = []
    best_score = 0

    for block, score in zip(blocks, scores):
        if score > best_score:
            best_block = block
            best_score = score

    return best_block

def extract_content(html_page, encoding=None):
    soup = preprocessing(html_page, encoding)

    if soup.body == None:
        print 'Unable to find the body of this page.'
        return None

    title = extract_title(soup)
    
    # We extract the block with highest textual content.
    blocks, scores = [], []
    extract_features(soup.body)
    extract_text_blocks(soup.body, blocks, scores)
    best_block = get_best_block(blocks, scores)

    # We extract the strings from the block.
    text = []
    for node in best_block:
        extract_strings(node, text)

    text = remove_multiple_spaces(u' '.join(text))
    return title, text

if __name__ == '__main__':
    import sys
    import urllib2

    url = sys.argv[1]
    fin = urllib2.build_opener(urllib2.HTTPCookieProcessor).open(url)
    html = fin.read()
    fin.close()

    title, text = extract_content(html)

    print 'TITLE:', title
    print 'MAIN TEXT:', text
    print 'TEXT LENGTH:', len(text)
