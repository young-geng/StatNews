var qsv = window.location.search;
qsv = unescape(qsv.toString());

if(qsv.match('storylink')) {     
	temp = qsv.split('storylink=');
	temp2 = temp[1].split('&');
	temp3 = temp2[0].split('#');
	mistats.custom2 = "Story Link: " + temp3[0];
}

