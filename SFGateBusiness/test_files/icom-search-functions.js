
document.write('<style>#icom_mm11_city, #icom_mm11_city_cd {width:150px;} #icom_mm11_city, #icom_mm11_city_cd, #icom_mm11_state, #icom_mm11_state_cd, #icom_mm11_prod, #icom_mm11_prod_cd, #comparison_loan_amount {font-size: 11px;font-family:Arial, Helvetica, sans-serif;}#comparison_loan_amount {width:100px;}#loanError, #marketError, #marketErrorCD {font-size:11px;font-family:Arial, Helvetica, sans-serif;color:#ff0000;}#compare_rates_form, #compare_rates_form_cd {margin:0px;padding:0px;}</style>');


function clearInput(el) {
		if (el.defaultValue==el.value){ 
			el.value = "";
		}
	}
	
	function isNumeric(sText){
		var ValidChars = "0123456789";
		var IsNumber = true;
		var Char;
		
		for (i = 0; i < sText.length && IsNumber == true; i++){ 
			Char = sText.charAt(i); 
			if(ValidChars.indexOf(Char) == -1){
				IsNumber = false;
			}
		}
		return IsNumber;
	}
	
	function CheckMinMax(invalue, min, max) {
		var invalue_v = invalue;
		var result = true;
		
		if(invalue_v < min){
			result = false;
		}
		if(invalue_v > max){
			result = false;
		}
		if(!isNumeric(invalue_v)){
			result = false;
		}
	
		return result;
	}
	

	function submitMtgRates(){
		
		var state = document.getElementById('icom_mm11_state').value;
		var market = document.getElementById('icom_mm11_city').value;
		var prod = document.getElementById('icom_mm11_prod').value;
		var loan = document.getElementById('comparison_loan_amount').value;
		var pidAc = document.getElementById('pid').value;
		var ecid = document.getElementById('ecid').value;
		
		var result_loan = false;
		
		var url = "http://www.interest.com/mortgage/rates/?pid=" + pidAc + "&state=" + state + "&market=" + market + "&prods=" + prod + "&loan=" + loan + "&points=Zero&perc=20";
		
		if (CheckMinMax(loan, 0, 999999999)) {
        	result_loan = true;
			document.getElementById('loanError').style.display = 'none';
    	}
    	else {
        	document.getElementById('loanError').style.display = 'block';	
    	}
		
		if (market == null || market == ""){
			document.getElementById('marketError').style.display = 'block';	
		}else {
			document.getElementById('marketError').style.display = 'none';		
		}
		
		if (result_loan && market && prod ) {
			
			if(ecid == "" || ecid == null){
				window.location = url;
			}else {
				window.location = url + "&ec_id=" + ecid;
			}
			return true;
		}else {
			return false;
		}
		
		
	}
	
function submitCdRates(){
		
		var state = document.getElementById('icom_mm11_state_cd').value;
		var market = document.getElementById('icom_mm11_city_cd').value;
		var prod = document.getElementById('icom_mm11_prod_cd').value;
		var pidAc = document.getElementById('pid').value;
		var ecid = document.getElementById('ecid').value;
		
		var url = "http://www.interest.com/cd-rates/rates/?local=true&pid=" + pidAc + "&state=" + state + "&market=" + market + "&prods=" + prod;
		
		
		if (market == null || market == ""){
			document.getElementById('marketErrorCD').style.display = 'block';	
		}else {
			document.getElementById('marketErrorCD').style.display = 'none';		
		}
		
		if (market && prod ) {
			
			if(ecid == "" || ecid == null){
				window.location = url;
			}else {
				window.location = url + "&ec_id=" + ecid;
			}
			return true;
		}else {
			return false;
		}
		
		
	}
	function setMarkets(){
			
		var stateID = document.getElementById('icom_mm11_state').value;
		var marketID = document.getElementById('marketHolder');

		switch(stateID){
			case "AL":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1360">Anniston</option><option value="1233">Auburn-Phenix City</option><option value="108">Birmingham</option><option value="1289">Dothan</option><option value="1129">Eufaula</option><option value="499">Fairhope</option><option value="406">Florence</option><option value="255">Huntsville</option><option value="156">Mobile</option><option value="1249">Montgomery-Selma</option><option value="1312">Tuscaloosa</option><option value="1359">Vernon</option></select>';
				break;	
			case "AK":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1412">Aleutians</option><option value="234">Anchorage</option><option value="1410">Barrow</option><option value="1247">Fairbanks</option><option value="1306">Juneau</option><option value="498">Sitka</option></select>';
				break;
				
			case "AZ":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="501">Flagstaff</option><option value="1361">Ft Defiance-Ganado-Chinle</option><option value="40">Phoenix-Mesa</option><option value="502">Prescott</option><option value="503">Scottsdale</option><option value="120">Tucson</option><option value="504">Wickenburg</option><option value="1241">Yuma</option></select>';
				break;
				
			case "AR":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1371">El Dorado</option><option value="1131">Fayetteville</option><option value="1413">Harrison-Mountain Home</option><option value="500">Hot Springs</option><option value="1300">Jonesboro</option><option value="146">Little Rock</option><option value="1284">McGehee-Chicot Junction</option><option value="1372">W. Memphis-Greenville</option></select>';
				break;
				
			case "CA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="505">Arcadia</option><option value="142">Bakersfield</option><option value="506">Berkeley</option><option value="1265">Chico-Redding</option><option value="967">Downey</option><option value="1267">El Centro</option><option value="507">Escondido</option><option value="1268">Eureka</option><option value="969">Fremont</option><option value="114">Fresno</option><option value="513">Healdsburg</option><option value="971">Huntington Beach</option><option value="973">Irvine</option><option value="508">La Jolla</option><option value="1376">Lake Tahoe</option><option value="4">Los Angeles</option><option value="196">Modesto</option><option value="269">Oakland</option><option value="509">Palm Desert</option><option value="1266">Palm Springs</option><option value="510">Palo Alto</option><option value="975">Pasadena</option><option value="977">Rancho Santa Margarita</option><option value="307">Riverside-San Bernardino</option><option value="54">Sacramento</option><option value="979">Salinas</option><option value="208">San Clemente</option><option value="30">San Diego</option><option value="8">San Francisco</option><option value="241">San Gabriel Valley</option><option value="273">San Jose</option><option value="511">San Luis Obispo</option><option value="271">San Rafael-Novato</option><option value="295">Santa Barbara</option><option value="981">Santa Clara</option><option value="512">Santa Cruz</option><option value="281">Santa Rosa</option><option value="154">Stockton-Lodi</option><option value="983">Sunnyvale</option><option value="985">Thousand Oaks</option><option value="283">Ventura</option><option value="1375">Yreka</option></select>';
				break;
				
			case "CO":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="514">Arvada</option><option value="321">Boulder</option><option value="184">Colorado Springs</option><option value="1439">Cortez</option><option value="44">Denver</option><option value="515">Durango</option><option value="516">Fort Collins-Loveland</option><option value="1243">Grand Junction-Montrose</option><option value="323">Greeley</option><option value="517">Lakewood</option><option value="987">Westminster</option></select>';
				break;
				
			case "CT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="404">Bridgeport</option><option value="989">Danbury</option><option value="72">Hartford</option><option value="210">New Haven</option><option value="991">Stamford</option><option value="475">Torrington</option></select>';
				break;
				
			case "DE":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="993">Dover</option><option value="995">Lewes</option><option value="1378">Ocean View</option><option value="214">Wilmington</option></select>';
				break;
				
			case "DC":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="20">DC Metro</option><option value="265">Reston-Manassas</option><option value="261">Rockville-Wheaton</option></select>';
				break;
				
			case "FL":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="518">Aventura</option><option value="519">Boca Raton</option><option value="617">Bradenton</option><option value="997">Cape Coral</option><option value="520">Coconut Creek</option><option value="521">Coral Gables</option><option value="1133">Crystal River</option><option value="178">Daytona Beach</option><option value="522">Deerfield Beach</option><option value="523">DeLand</option><option value="524">Delray Beach</option><option value="525">Dunedin</option><option value="259">Ft Lauderdale</option><option value="291">Ft Myers</option><option value="454">Ft Walton Beach</option><option value="403">Gainesville</option><option value="526">Hallandale</option><option value="311">Hobe Sound-Port St. Lucie</option><option value="527">Hollywood</option><option value="528">Inverness</option><option value="94">Jacksonville</option><option value="529">Key West</option><option value="176">Lakeland </option><option value="530">Largo</option><option value="531">Margate</option><option value="182">Melbourne-Titusville-Palm Bay</option><option value="22">Miami</option><option value="532">Mount Dora</option><option value="618">N. Ft. Myers</option><option value="619">N. Miami Beach</option><option value="289">Naples</option><option value="402">Ocala</option><option value="533">Ojus</option><option value="66">Orlando</option><option value="534">Ormond Beach</option><option value="1288">Panama City</option><option value="456">Pensacola</option><option value="535">Pompano Beach</option><option value="536">Port Charlotte</option><option value="999">Punta Gorda</option><option value="150">Sarasota</option><option value="537">Siesta Key</option><option value="538">St. Augustine</option><option value="341">St. Petersburg</option><option value="539">Sunny Isles</option><option value="249">Tallahassee</option><option value="540">Tamarac</option><option value="42">Tampa </option><option value="541">Venice</option><option value="542">Vero Beach</option><option value="98">West Palm Beach</option><option value="569">Winter Haven</option><option value="543">Winter Park</option></select>';
				break;
				
			case "GA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1346">Albany</option><option value="544">Athens</option><option value="24">Atlanta</option><option value="172">Augusta</option><option value="1231">Columbus</option><option value="545">Gainesville</option><option value="1135">Golden Isles</option><option value="317">Lawrenceville </option><option value="1246">Macon</option><option value="313">Marietta </option><option value="1379">Morganton-Dalton</option><option value="315">Roswell </option><option value="327">Savannah</option><option value="1380">St. Marys</option><option value="1381">Thomasville</option></select>';
				break;
				
			case "HI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="546">Hilo</option><option value="110">Honolulu</option></select>';
				break;
				
			case "ID":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="216">Boise</option><option value="551">Coeur D Alene</option><option value="1245">Idaho Falls-Pocatello</option><option value="1137">Moscow</option><option value="1239">Twin Falls</option></select>';
				break;
				
			case "IL":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1107">Aurora</option><option value="1109">Bloomington</option><option value="1111">Champaign-Urbana</option><option value="6">Chicago</option><option value="253">East St Louis</option><option value="277">Elgin</option><option value="1315">Harrisburg-Mt. Vernon</option><option value="553">Highland Park</option><option value="1115">Kankakee</option><option value="1352">Mt. Carmel-Fairfield-Carmi</option><option value="1003">Naperville</option><option value="1005">Peoria</option><option value="1314">Quincy</option><option value="1358">Rock Island-Moline </option><option value="299">Rockford</option><option value="275">Waukegan</option><option value="1388">Yale-Robinson-Ste. Marie</option></select>';
				break;
				
			case "IN":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="554">Bloomington</option><option value="1391">Brookville-Aurora</option><option value="1007">Elkhart-Goshen</option><option value="301">Evansville</option><option value="158">Fort Wayne</option><option value="212">Gary</option><option value="58">Indianapolis</option><option value="1009">Lafayette</option><option value="1345">Richmond</option><option value="1184">South Bend</option><option value="1390">Tell City-Bedford-Scottsburg</option><option value="1011">Terre Haute</option></select>';
				break;
				
			case "IA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1001">Cedar Rapids</option><option value="293">Davenport</option><option value="190">Des Moines</option><option value="1382">Estherville</option><option value="1385">Harlan-Atlantic-Shenandoah</option><option value="1383">Inwood-Allendorf</option><option value="547">Iowa City</option><option value="1317">Keokuk</option><option value="1384">Mason City</option><option value="1316">Ottumwa</option><option value="1238">Sioux City</option></select>';
				break;
				
			case "KS":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1278">Doniphan </option><option value="1394">Glade-Agenda</option><option value="1139">Hays</option><option value="1393">Independence</option><option value="238">Kansas City</option><option value="309">Lawrence</option><option value="1141">Manhattan</option><option value="1013">Overland Park</option><option value="1318">Pittsburg</option><option value="1015">Topeka</option><option value="152">Wichita</option></select>';
				break;
				
			case "KY":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1397">Ashland-Williamson</option><option value="1320">Bowling Green-Owensboro</option><option value="434">Covington</option><option value="1113">Hopkinsville</option><option value="174">Lexington</option><option value="90">Louisville</option><option value="1319">Paducah</option><option value="1396">Pikeville-Hazard</option></select>';
				break;
				
			case "LA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1364">Alexandria</option><option value="144">Baton Rouge</option><option value="1301">Lafayette</option><option value="1274">Lake Charles</option><option value="1302">Monroe</option><option value="64">New Orleans</option><option value="194">Shreveport - Bossier City</option></select>';
				break;
				
			case "ME":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1023">Bangor</option><option value="559">Brunswick</option><option value="560">Camden</option><option value="445">Lewiston-Auburn </option><option value="218">Portland</option><option value="1321">Presque Isle</option></select>';
				break;
				
			case "MD":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="558">Annapolis</option><option value="36">Baltimore</option><option value="1399">Cumberland</option><option value="1119">Newark</option><option value="263">Rockville-Wheaton</option><option value="1291">Salisbury</option></select>';
				break;
				
			case "MA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="555">Amherst</option><option value="451">Barnstable-Yarmouth</option><option value="14">Boston</option><option value="1017">Cambridge</option><option value="331">Chelmsford</option><option value="556">Chestnut Hill</option><option value="1019">Lowell</option><option value="329">Methuen</option><option value="1398">New Bedford</option><option value="333">Norfolk-Norwood</option><option value="1021">Northampton</option><option value="1370">Pittsfield-Lenox</option><option value="335">Plymouth </option><option value="138">Springfield</option><option value="449">Taunton-Attleboro</option><option value="1143">Williamstown</option><option value="339">Worcester </option></select>';
				break;
				
			case "MI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1401">Adrian-Tecumseh</option><option value="1283">Alpena</option><option value="285">Ann Arbor</option><option value="1400">Benton Harbor-Niles</option><option value="12">Detroit</option><option value="92">Grand Rapids</option><option value="1341">Ishpeming</option><option value="166">Kalamazoo-Battle Creek</option><option value="164">Lansing-East Lansing</option><option value="561">Livonia</option><option value="1324">Marquette</option><option value="1145">Petoskey</option><option value="180">Saginaw-Bay City-Midland</option><option value="563">Sterling Heights</option><option value="1322">Traverse City-Cadillac</option><option value="1025">Warren</option></select>';
				break;
				
			case "MN":
				marketID.innerHTML = '<select class="rates-singlewide-field" name="market" id="icom_mm11_city"><option value="">Select City</option><option value="564">Duluth</option><option value="1323">Mankato</option><option value="32">Minneapolis </option><option value="1027">Moorhead</option><option value="1029">Rochester</option><option value="1031">St. Cloud</option><option value="1182">St. Paul</option><option value="1033">White Bear Lake</option><option value="1035">Woodbury</option><option value="1403">Worthington-Hadley</option></select>';
				break;
				
			case "MS":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1304">Biloxi-Gulfport</option><option value="1357">Centreville-Woodville</option><option value="1407">Clarksdale-Batesville-Holly Springs</option><option value="1281">Columbus-Tupelo-West Point</option><option value="1285">Greenwood-Greenville</option><option value="1277">Hattiesburg-Laurel</option><option value="186">Jackson</option><option value="1313">Meridian</option><option value="1147">Oxford</option><option value="1406">Pascagoula</option><option value="957">Southaven</option></select>';
				break;
				
			case "MO":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="565">Branson</option><option value="1325">Cape Girardeau</option><option value="566">Columbia</option><option value="1326">Hannibal</option><option value="1037">Independence</option><option value="1299">Joplin</option><option value="50">Kansas City</option><option value="1276">Kirksville</option><option value="1339">Mercer </option><option value="567">Rolla</option><option value="303">Springfield</option><option value="1273">St. Joseph</option><option value="34">St. Louis</option><option value="1404">Westboro-Fairfax</option></select>';
				break;
				
			case "MT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1409">Baker-Capitol</option><option value="220">Billings</option><option value="1149">Bozeman</option><option value="1327">Glendive</option><option value="1244">Great Falls</option><option value="1328">Helena</option><option value="1408">Libby</option><option value="1151">Missoula</option></select>';
				break;
				
			case "NE":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1330">Chadron</option><option value="1292">Homer-Wynot</option><option value="1045">Lincoln</option><option value="1329">North Platte</option><option value="122">Omaha</option><option value="1435">Scottsbluff</option><option value="1436">Valentine-Elsmere</option></select>';
				break;
				
			case "NV":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="557">Carson City</option><option value="1414">Ely-West Wendover</option><option value="1057">Henderson</option><option value="104">Las Vegas</option><option value="257">Reno</option></select>';
				break;
				
			case "NH":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1433">Berlin-Laconia</option><option value="1363">Claremont-Plymouth</option><option value="1049">Concord</option><option value="575">Hanover</option><option value="1047">Keene</option><option value="222">Manchester</option><option value="1051">Nashua</option><option value="576">Portsmouth</option></select>';
				break;
				
			case "NJ":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="202">Atlantic City-Vineland</option><option value="245">Cherry Hill</option><option value="236">Elizabeth</option><option value="204">Neptune-Lakewood</option><option value="1055">Newark</option><option value="1053">Paterson-Paramus</option><option value="247">Trenton-Princeton</option><option value="206">Washington-Montgomery</option></select>';
				break;
				
			case "NM":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="134">Albuquerque</option><option value="1287">Carlsbad</option><option value="577">Las Cruces</option><option value="1242">Raton-Mosquero</option><option value="578">Santa Fe</option><option value="579">Silver City</option></select>';
				break;
				
			case "NY":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="100">Albany</option><option value="1303">Binghamton</option><option value="580">Bronxville</option><option value="68">Buffalo</option><option value="1248">Elmira</option><option value="1059">Glens Falls</option><option value="581">Irondequoit</option><option value="582">Ithaca</option><option value="251">Long Island</option><option value="2">New York Metro</option><option value="1155">Oneonta</option><option value="1415">Plattsburgh</option><option value="279">Poughkeepsie</option><option value="78">Rochester</option><option value="116">Syracuse</option><option value="1331">Utica</option><option value="1290">Watertown</option><option value="1061">Yonkers</option></select>';
				break;
				
			case "NC":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="552">Asheville</option><option value="570">Brevard</option><option value="1039">Cary</option><option value="1178">Chapel Hill</option><option value="70">Charlotte</option><option value="1180">Durham</option><option value="571">Edenton</option><option value="1437">Elizabeth City-Murfreesboro</option><option value="80">Greensboro-Winston Salem-High Pt</option><option value="572">Greenville</option><option value="1438">Hayesville-Murphy</option><option value="573">Hendersonville</option><option value="1041">Hickory-Morganton</option><option value="1043">Jacksonville</option><option value="574">Pinehurst</option><option value="102">Raleigh </option><option value="1434">Wilmington</option></select>';
				break;
				
			case "ND":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1153">Bismarck</option><option value="224">Fargo</option></select>';
				break;
			
			case "OH":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="242">Akron</option><option value="1417">Athens-Wellston-Portsmouth</option><option value="583">Beaver Creek</option><option value="188">Canton-Massillon</option><option value="46">Cincinnati</option><option value="26">Cleveland</option><option value="584">Cleveland Heights</option><option value="60">Columbus</option><option value="88">Dayton</option><option value="585">Lakewood</option><option value="1063">Lima</option><option value="1065">Lorain-Elyria</option><option value="1332">Marietta</option><option value="1117">Steubenville</option><option value="126">Toledo</option><option value="128">Youngstown-Warren</option><option value="1280">Zanesville</option></select>';
				break;
				
			case "OK":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1309">Ada</option><option value="1067">Enid</option><option value="1286">Guymon-Knowles</option><option value="1308">Lawton</option><option value="1307">Miami</option><option value="86">Oklahoma City</option><option value="1416">Smithville-Idabel</option><option value="118">Tulsa-Muskogee</option></select>';
				break;
				
			case "OR":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="586">Ashland</option><option value="1367">Baker City-Mount Vernon-Nyssa</option><option value="587">Bend</option><option value="1418">Enterprise-Flora</option><option value="588">Eugene</option><option value="589">Grants Pass</option><option value="1240">Hermiston-Pendleton</option><option value="590">Medford</option><option value="52">Portland</option><option value="1069">Salem</option></select>';
				break;
				
			case "PA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="130">Allentown-Bethlehem</option><option value="1369">Bradford</option><option value="1419">Chambersburg-Waynesboro</option><option value="591">Drexel Hill</option><option value="1071">Erie</option><option value="136">Harrisburg - Lebanon</option><option value="1293">Johnstown-Altoona</option><option value="592">King of Prussia</option><option value="170">Lancaster</option><option value="10">Philadelphia</option><option value="38">Pittsburgh</option><option value="325">Reading</option><option value="124">Scranton-Wilkes Barre</option><option value="1420">Sharon </option><option value="593">State College</option><option value="1421">Stroudsburg-Port Jervis</option><option value="1354">Wellsboro</option><option value="297">York</option></select>';
				break;
				
			case "RI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="74">Providence</option></select>';
				break;
				
			case "SC":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1365">Aiken-N. Augusta</option><option value="148">Charleston-North Charleston</option><option value="160">Columbia</option><option value="594">Conway</option><option value="1157">Edisto</option><option value="112">Greenville - Spartanburg</option><option value="595">Hilton Head</option><option value="596">Myrtle Beach</option><option value="597">Seabrook Island</option><option value="1423">Walterboro-Beaufort</option></select>';
				break;
				
			case "SD":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="598">Brookings</option><option value="1333">Rapid City</option><option value="1424">Redig-Camp Crook</option><option value="226">Sioux Falls</option></select>';
				break;
				
			case "TN":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="162">Bristol-Kingsport</option><option value="168">Chattanooga</option><option value="1125">Clarksville</option><option value="599">Franklin</option><option value="1334">Jackson</option><option value="140">Knoxville</option><option value="1073">Maryville</option><option value="82">Memphis</option><option value="84">Nashville</option><option value="600">Paris</option><option value="1298">Tri-Cities</option><option value="1282">Union City</option></select>';
				break;
				
			case "TX":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1258">Abilene-Sweetwater</option><option value="1255">Amarillo</option><option value="106">Austin - San Marcos</option><option value="1270">Beaumont-Port Arthur</option><option value="1075">Carrollton</option><option value="601">College Station</option><option value="604">Conroe</option><option value="1261">Corpus Christi</option><option value="18">Dallas</option><option value="132">El Paso</option><option value="287">Fort Worth</option><option value="602">Galveston</option><option value="16">Houston</option><option value="603">Kerrville</option><option value="1260">Laredo</option><option value="1425">Longview</option><option value="1259">Lubbock</option><option value="1159">Marble Falls</option><option value="192">McAllen-Edinburg-Mission</option><option value="1263">Odessa-Midland</option><option value="1077">Plano</option><option value="1161">Rockport</option><option value="1254">San Angelo</option><option value="62">San Antonio</option><option value="1262">Sherman</option><option value="1079">Texas City</option><option value="1257">Tyler-Lufkin-Nacogdoches</option><option value="1264">Victoria</option><option value="1256">Waco-Temple-Bryan</option><option value="1271">Wichita Falls</option><option value="1163">Wimberley</option></select>';
				break;
				
			case "UT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="605">Bountiful</option><option value="1081">Ogden</option><option value="1083">Orem</option><option value="606">Provo</option><option value="76">Salt Lake City</option><option value="607">St. George</option></select>';
				break;
				
			case "VT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1344">Bennington-Shaftsbury-Dorset</option><option value="1368">Brattleboro-Bellows Falls</option><option value="228">Burlington</option><option value="609">Middlebury</option></select>';
				break;
				
			case "VA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="562">Alexandria</option><option value="1085">Arlington</option><option value="1275">Bluefield</option><option value="608">Charlottesville</option><option value="1087">Chesapeake</option><option value="1337">Danville-Martinsville</option><option value="56">Hampton Roads</option><option value="1252">Harrisonburg</option><option value="1089">Lynchburg</option><option value="267">Reston-Manassas</option><option value="96">Richmond</option><option value="305">Roanoke</option><option value="1426">South Hill</option><option value="1090">Sugarland Run</option><option value="1250">Tri-Cities</option></select>';
				break;
				
			case "WA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1092">Bellevue</option><option value="610">Bellingham</option><option value="1094">Bremerton</option><option value="611">Olympia</option><option value="612">Port Townsend</option><option value="613">San Juan Islands</option><option value="28">Seattle</option><option value="200">Spokane</option><option value="614">Vancouver-Longview</option><option value="615">Whidbey Island</option><option value="1253">Yakima-Pasco-Richland-Kennewick</option></select>';
				break;
				
			case "WV":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1297">Bluefield-Beckley-Oak Hill</option><option value="230">Charleston</option><option value="1294">Clarksburg-Weston</option><option value="1251">Fort Seybert</option><option value="1104">Huntington</option><option value="1430">Martinsburg</option><option value="1429">Morgantown-Fairmont</option><option value="1296">Parkersburg</option><option value="1295">Wheeling</option></select>';
				break;
				
			case "WI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1096">Appleton-Oshkosh-Neenah</option><option value="1167">Eagle River</option><option value="1098">Green Bay</option><option value="1100">Kenosha</option><option value="1121">La Crosse-Eau Claire</option><option value="198">Madison</option><option value="1169">Menomonie</option><option value="48">Milwaukee</option><option value="319">Racine</option><option value="616">Sheboygan</option><option value="1165">Sturgeon Bay</option><option value="1356">Superior</option><option value="1102">Waukesha</option><option value="1232">Wausau-Rhinelander</option></select>';
				break;
				
			case "WY":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1173">Casper</option><option value="232">Cheyenne</option><option value="1366">Cody</option><option value="1335">Jackson</option><option value="1171">Laramie</option><option value="1347">Newcastle</option><option value="1432">Rock Springs-Green River</option></select>';
				break;
				
			default:
				marketID.innerHTML = '<select name="market" id="icom_mm11_city"><option value="">Select City</option><option value="1360">Anniston</option><option value="1233">Auburn-Phenix City</option><option value="108">Birmingham</option><option value="1289">Dothan</option><option value="1129">Eufaula</option><option value="499">Fairhope</option><option value="406">Florence</option><option value="255">Huntsville</option><option value="156">Mobile</option><option value="1249">Montgomery-Selma</option><option value="1312">Tuscaloosa</option><option value="1359">Vernon</option></select>';
				break;
				
		}
		
	}
	
	
	function setMarketsCd(){
			
		var stateID = document.getElementById('icom_mm11_state_cd').value;
		var marketID = document.getElementById('marketHolderCD');

		switch(stateID){
			case "AL":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1360">Anniston</option><option value="1233">Auburn-Phenix City</option><option value="108">Birmingham</option><option value="1289">Dothan</option><option value="1129">Eufaula</option><option value="499">Fairhope</option><option value="406">Florence</option><option value="255">Huntsville</option><option value="156">Mobile</option><option value="1249">Montgomery-Selma</option><option value="1312">Tuscaloosa</option><option value="1359">Vernon</option></select>';
				break;	
			case "AK":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1412">Aleutians</option><option value="234">Anchorage</option><option value="1410">Barrow</option><option value="1247">Fairbanks</option><option value="1306">Juneau</option><option value="498">Sitka</option></select>';
				break;
				
			case "AZ":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="501">Flagstaff</option><option value="1361">Ft Defiance-Ganado-Chinle</option><option value="40">Phoenix-Mesa</option><option value="502">Prescott</option><option value="503">Scottsdale</option><option value="120">Tucson</option><option value="504">Wickenburg</option><option value="1241">Yuma</option></select>';
				break;
				
			case "AR":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1371">El Dorado</option><option value="1131">Fayetteville</option><option value="1413">Harrison-Mountain Home</option><option value="500">Hot Springs</option><option value="1300">Jonesboro</option><option value="146">Little Rock</option><option value="1284">McGehee-Chicot Junction</option><option value="1372">W. Memphis-Greenville</option></select>';
				break;
				
			case "CA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="505">Arcadia</option><option value="142">Bakersfield</option><option value="506">Berkeley</option><option value="1265">Chico-Redding</option><option value="967">Downey</option><option value="1267">El Centro</option><option value="507">Escondido</option><option value="1268">Eureka</option><option value="969">Fremont</option><option value="114">Fresno</option><option value="513">Healdsburg</option><option value="971">Huntington Beach</option><option value="973">Irvine</option><option value="508">La Jolla</option><option value="1376">Lake Tahoe</option><option value="4">Los Angeles</option><option value="196">Modesto</option><option value="269">Oakland</option><option value="509">Palm Desert</option><option value="1266">Palm Springs</option><option value="510">Palo Alto</option><option value="975">Pasadena</option><option value="977">Rancho Santa Margarita</option><option value="307">Riverside-San Bernardino</option><option value="54">Sacramento</option><option value="979">Salinas</option><option value="208">San Clemente</option><option value="30">San Diego</option><option value="8">San Francisco</option><option value="241">San Gabriel Valley</option><option value="273">San Jose</option><option value="511">San Luis Obispo</option><option value="271">San Rafael-Novato</option><option value="295">Santa Barbara</option><option value="981">Santa Clara</option><option value="512">Santa Cruz</option><option value="281">Santa Rosa</option><option value="154">Stockton-Lodi</option><option value="983">Sunnyvale</option><option value="985">Thousand Oaks</option><option value="283">Ventura</option><option value="1375">Yreka</option></select>';
				break;
				
			case "CO":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="514">Arvada</option><option value="321">Boulder</option><option value="184">Colorado Springs</option><option value="1439">Cortez</option><option value="44">Denver</option><option value="515">Durango</option><option value="516">Fort Collins-Loveland</option><option value="1243">Grand Junction-Montrose</option><option value="323">Greeley</option><option value="517">Lakewood</option><option value="987">Westminster</option></select>';
				break;
				
			case "CT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="404">Bridgeport</option><option value="989">Danbury</option><option value="72">Hartford</option><option value="210">New Haven</option><option value="991">Stamford</option><option value="475">Torrington</option></select>';
				break;
				
			case "DE":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="993">Dover</option><option value="995">Lewes</option><option value="1378">Ocean View</option><option value="214">Wilmington</option></select>';
				break;
				
			case "DC":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="20">DC Metro</option><option value="265">Reston-Manassas</option><option value="261">Rockville-Wheaton</option></select>';
				break;
				
			case "FL":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="518">Aventura</option><option value="519">Boca Raton</option><option value="617">Bradenton</option><option value="997">Cape Coral</option><option value="520">Coconut Creek</option><option value="521">Coral Gables</option><option value="1133">Crystal River</option><option value="178">Daytona Beach</option><option value="522">Deerfield Beach</option><option value="523">DeLand</option><option value="524">Delray Beach</option><option value="525">Dunedin</option><option value="259">Ft Lauderdale</option><option value="291">Ft Myers</option><option value="454">Ft Walton Beach</option><option value="403">Gainesville</option><option value="526">Hallandale</option><option value="311">Hobe Sound-Port St. Lucie</option><option value="527">Hollywood</option><option value="528">Inverness</option><option value="94">Jacksonville</option><option value="529">Key West</option><option value="176">Lakeland </option><option value="530">Largo</option><option value="531">Margate</option><option value="182">Melbourne-Titusville-Palm Bay</option><option value="22">Miami</option><option value="532">Mount Dora</option><option value="618">N. Ft. Myers</option><option value="619">N. Miami Beach</option><option value="289">Naples</option><option value="402">Ocala</option><option value="533">Ojus</option><option value="66">Orlando</option><option value="534">Ormond Beach</option><option value="1288">Panama City</option><option value="456">Pensacola</option><option value="535">Pompano Beach</option><option value="536">Port Charlotte</option><option value="999">Punta Gorda</option><option value="150">Sarasota</option><option value="537">Siesta Key</option><option value="538">St. Augustine</option><option value="341">St. Petersburg</option><option value="539">Sunny Isles</option><option value="249">Tallahassee</option><option value="540">Tamarac</option><option value="42">Tampa </option><option value="541">Venice</option><option value="542">Vero Beach</option><option value="98">West Palm Beach</option><option value="569">Winter Haven</option><option value="543">Winter Park</option></select>';
				break;
				
			case "GA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1346">Albany</option><option value="544">Athens</option><option value="24">Atlanta</option><option value="172">Augusta</option><option value="1231">Columbus</option><option value="545">Gainesville</option><option value="1135">Golden Isles</option><option value="317">Lawrenceville </option><option value="1246">Macon</option><option value="313">Marietta </option><option value="1379">Morganton-Dalton</option><option value="315">Roswell </option><option value="327">Savannah</option><option value="1380">St. Marys</option><option value="1381">Thomasville</option></select>';
				break;
				
			case "HI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="546">Hilo</option><option value="110">Honolulu</option></select>';
				break;
				
			case "ID":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="216">Boise</option><option value="551">Coeur D Alene</option><option value="1245">Idaho Falls-Pocatello</option><option value="1137">Moscow</option><option value="1239">Twin Falls</option></select>';
				break;
				
			case "IL":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1107">Aurora</option><option value="1109">Bloomington</option><option value="1111">Champaign-Urbana</option><option value="6">Chicago</option><option value="253">East St Louis</option><option value="277">Elgin</option><option value="1315">Harrisburg-Mt. Vernon</option><option value="553">Highland Park</option><option value="1115">Kankakee</option><option value="1352">Mt. Carmel-Fairfield-Carmi</option><option value="1003">Naperville</option><option value="1005">Peoria</option><option value="1314">Quincy</option><option value="1358">Rock Island-Moline </option><option value="299">Rockford</option><option value="275">Waukegan</option><option value="1388">Yale-Robinson-Ste. Marie</option></select>';
				break;
				
			case "IN":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="554">Bloomington</option><option value="1391">Brookville-Aurora</option><option value="1007">Elkhart-Goshen</option><option value="301">Evansville</option><option value="158">Fort Wayne</option><option value="212">Gary</option><option value="58">Indianapolis</option><option value="1009">Lafayette</option><option value="1345">Richmond</option><option value="1184">South Bend</option><option value="1390">Tell City-Bedford-Scottsburg</option><option value="1011">Terre Haute</option></select>';
				break;
				
			case "IA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1001">Cedar Rapids</option><option value="293">Davenport</option><option value="190">Des Moines</option><option value="1382">Estherville</option><option value="1385">Harlan-Atlantic-Shenandoah</option><option value="1383">Inwood-Allendorf</option><option value="547">Iowa City</option><option value="1317">Keokuk</option><option value="1384">Mason City</option><option value="1316">Ottumwa</option><option value="1238">Sioux City</option></select>';
				break;
				
			case "KS":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1278">Doniphan </option><option value="1394">Glade-Agenda</option><option value="1139">Hays</option><option value="1393">Independence</option><option value="238">Kansas City</option><option value="309">Lawrence</option><option value="1141">Manhattan</option><option value="1013">Overland Park</option><option value="1318">Pittsburg</option><option value="1015">Topeka</option><option value="152">Wichita</option></select>';
				break;
				
			case "KY":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1397">Ashland-Williamson</option><option value="1320">Bowling Green-Owensboro</option><option value="434">Covington</option><option value="1113">Hopkinsville</option><option value="174">Lexington</option><option value="90">Louisville</option><option value="1319">Paducah</option><option value="1396">Pikeville-Hazard</option></select>';
				break;
				
			case "LA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1364">Alexandria</option><option value="144">Baton Rouge</option><option value="1301">Lafayette</option><option value="1274">Lake Charles</option><option value="1302">Monroe</option><option value="64">New Orleans</option><option value="194">Shreveport - Bossier City</option></select>';
				break;
				
			case "ME":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1023">Bangor</option><option value="559">Brunswick</option><option value="560">Camden</option><option value="445">Lewiston-Auburn </option><option value="218">Portland</option><option value="1321">Presque Isle</option></select>';
				break;
				
			case "MD":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="558">Annapolis</option><option value="36">Baltimore</option><option value="1399">Cumberland</option><option value="1119">Newark</option><option value="263">Rockville-Wheaton</option><option value="1291">Salisbury</option></select>';
				break;
				
			case "MA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="555">Amherst</option><option value="451">Barnstable-Yarmouth</option><option value="14">Boston</option><option value="1017">Cambridge</option><option value="331">Chelmsford</option><option value="556">Chestnut Hill</option><option value="1019">Lowell</option><option value="329">Methuen</option><option value="1398">New Bedford</option><option value="333">Norfolk-Norwood</option><option value="1021">Northampton</option><option value="1370">Pittsfield-Lenox</option><option value="335">Plymouth </option><option value="138">Springfield</option><option value="449">Taunton-Attleboro</option><option value="1143">Williamstown</option><option value="339">Worcester </option></select>';
				break;
				
			case "MI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1401">Adrian-Tecumseh</option><option value="1283">Alpena</option><option value="285">Ann Arbor</option><option value="1400">Benton Harbor-Niles</option><option value="12">Detroit</option><option value="92">Grand Rapids</option><option value="1341">Ishpeming</option><option value="166">Kalamazoo-Battle Creek</option><option value="164">Lansing-East Lansing</option><option value="561">Livonia</option><option value="1324">Marquette</option><option value="1145">Petoskey</option><option value="180">Saginaw-Bay City-Midland</option><option value="563">Sterling Heights</option><option value="1322">Traverse City-Cadillac</option><option value="1025">Warren</option></select>';
				break;
				
			case "MN":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="564">Duluth</option><option value="1323">Mankato</option><option value="32">Minneapolis </option><option value="1027">Moorhead</option><option value="1029">Rochester</option><option value="1031">St. Cloud</option><option value="1182">St. Paul</option><option value="1033">White Bear Lake</option><option value="1035">Woodbury</option><option value="1403">Worthington-Hadley</option></select>';
				break;
				
			case "MS":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1304">Biloxi-Gulfport</option><option value="1357">Centreville-Woodville</option><option value="1407">Clarksdale-Batesville-Holly Springs</option><option value="1281">Columbus-Tupelo-West Point</option><option value="1285">Greenwood-Greenville</option><option value="1277">Hattiesburg-Laurel</option><option value="186">Jackson</option><option value="1313">Meridian</option><option value="1147">Oxford</option><option value="1406">Pascagoula</option><option value="957">Southaven</option></select>';
				break;
				
			case "MO":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="565">Branson</option><option value="1325">Cape Girardeau</option><option value="566">Columbia</option><option value="1326">Hannibal</option><option value="1037">Independence</option><option value="1299">Joplin</option><option value="50">Kansas City</option><option value="1276">Kirksville</option><option value="1339">Mercer </option><option value="567">Rolla</option><option value="303">Springfield</option><option value="1273">St. Joseph</option><option value="34">St. Louis</option><option value="1404">Westboro-Fairfax</option></select>';
				break;
				
			case "MT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1409">Baker-Capitol</option><option value="220">Billings</option><option value="1149">Bozeman</option><option value="1327">Glendive</option><option value="1244">Great Falls</option><option value="1328">Helena</option><option value="1408">Libby</option><option value="1151">Missoula</option></select>';
				break;
				
			case "NE":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1330">Chadron</option><option value="1292">Homer-Wynot</option><option value="1045">Lincoln</option><option value="1329">North Platte</option><option value="122">Omaha</option><option value="1435">Scottsbluff</option><option value="1436">Valentine-Elsmere</option></select>';
				break;
				
			case "NV":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="557">Carson City</option><option value="1414">Ely-West Wendover</option><option value="1057">Henderson</option><option value="104">Las Vegas</option><option value="257">Reno</option></select>';
				break;
				
			case "NH":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1433">Berlin-Laconia</option><option value="1363">Claremont-Plymouth</option><option value="1049">Concord</option><option value="575">Hanover</option><option value="1047">Keene</option><option value="222">Manchester</option><option value="1051">Nashua</option><option value="576">Portsmouth</option></select>';
				break;
				
			case "NJ":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="202">Atlantic City-Vineland</option><option value="245">Cherry Hill</option><option value="236">Elizabeth</option><option value="204">Neptune-Lakewood</option><option value="1055">Newark</option><option value="1053">Paterson-Paramus</option><option value="247">Trenton-Princeton</option><option value="206">Washington-Montgomery</option></select>';
				break;
				
			case "NM":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="134">Albuquerque</option><option value="1287">Carlsbad</option><option value="577">Las Cruces</option><option value="1242">Raton-Mosquero</option><option value="578">Santa Fe</option><option value="579">Silver City</option></select>';
				break;
				
			case "NY":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="100">Albany</option><option value="1303">Binghamton</option><option value="580">Bronxville</option><option value="68">Buffalo</option><option value="1248">Elmira</option><option value="1059">Glens Falls</option><option value="581">Irondequoit</option><option value="582">Ithaca</option><option value="251">Long Island</option><option value="2">New York Metro</option><option value="1155">Oneonta</option><option value="1415">Plattsburgh</option><option value="279">Poughkeepsie</option><option value="78">Rochester</option><option value="116">Syracuse</option><option value="1331">Utica</option><option value="1290">Watertown</option><option value="1061">Yonkers</option></select>';
				break;
				
			case "NC":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="552">Asheville</option><option value="570">Brevard</option><option value="1039">Cary</option><option value="1178">Chapel Hill</option><option value="70">Charlotte</option><option value="1180">Durham</option><option value="571">Edenton</option><option value="1437">Elizabeth City-Murfreesboro</option><option value="80">Greensboro-Winston Salem-High Pt</option><option value="572">Greenville</option><option value="1438">Hayesville-Murphy</option><option value="573">Hendersonville</option><option value="1041">Hickory-Morganton</option><option value="1043">Jacksonville</option><option value="574">Pinehurst</option><option value="102">Raleigh </option><option value="1434">Wilmington</option></select>';
				break;
				
			case "ND":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1153">Bismarck</option><option value="224">Fargo</option></select>';
				break;
			
			case "OH":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="242">Akron</option><option value="1417">Athens-Wellston-Portsmouth</option><option value="583">Beaver Creek</option><option value="188">Canton-Massillon</option><option value="46">Cincinnati</option><option value="26">Cleveland</option><option value="584">Cleveland Heights</option><option value="60">Columbus</option><option value="88">Dayton</option><option value="585">Lakewood</option><option value="1063">Lima</option><option value="1065">Lorain-Elyria</option><option value="1332">Marietta</option><option value="1117">Steubenville</option><option value="126">Toledo</option><option value="128">Youngstown-Warren</option><option value="1280">Zanesville</option></select>';
				break;
				
			case "OK":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1309">Ada</option><option value="1067">Enid</option><option value="1286">Guymon-Knowles</option><option value="1308">Lawton</option><option value="1307">Miami</option><option value="86">Oklahoma City</option><option value="1416">Smithville-Idabel</option><option value="118">Tulsa-Muskogee</option></select>';
				break;
				
			case "OR":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="586">Ashland</option><option value="1367">Baker City-Mount Vernon-Nyssa</option><option value="587">Bend</option><option value="1418">Enterprise-Flora</option><option value="588">Eugene</option><option value="589">Grants Pass</option><option value="1240">Hermiston-Pendleton</option><option value="590">Medford</option><option value="52">Portland</option><option value="1069">Salem</option></select>';
				break;
				
			case "PA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="130">Allentown-Bethlehem</option><option value="1369">Bradford</option><option value="1419">Chambersburg-Waynesboro</option><option value="591">Drexel Hill</option><option value="1071">Erie</option><option value="136">Harrisburg - Lebanon</option><option value="1293">Johnstown-Altoona</option><option value="592">King of Prussia</option><option value="170">Lancaster</option><option value="10">Philadelphia</option><option value="38">Pittsburgh</option><option value="325">Reading</option><option value="124">Scranton-Wilkes Barre</option><option value="1420">Sharon </option><option value="593">State College</option><option value="1421">Stroudsburg-Port Jervis</option><option value="1354">Wellsboro</option><option value="297">York</option></select>';
				break;
				
			case "RI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="74">Providence</option></select>';
				break;
				
			case "SC":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1365">Aiken-N. Augusta</option><option value="148">Charleston-North Charleston</option><option value="160">Columbia</option><option value="594">Conway</option><option value="1157">Edisto</option><option value="112">Greenville - Spartanburg</option><option value="595">Hilton Head</option><option value="596">Myrtle Beach</option><option value="597">Seabrook Island</option><option value="1423">Walterboro-Beaufort</option></select>';
				break;
				
			case "SD":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="598">Brookings</option><option value="1333">Rapid City</option><option value="1424">Redig-Camp Crook</option><option value="226">Sioux Falls</option></select>';
				break;
				
			case "TN":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="162">Bristol-Kingsport</option><option value="168">Chattanooga</option><option value="1125">Clarksville</option><option value="599">Franklin</option><option value="1334">Jackson</option><option value="140">Knoxville</option><option value="1073">Maryville</option><option value="82">Memphis</option><option value="84">Nashville</option><option value="600">Paris</option><option value="1298">Tri-Cities</option><option value="1282">Union City</option></select>';
				break;
				
			case "TX":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1258">Abilene-Sweetwater</option><option value="1255">Amarillo</option><option value="106">Austin - San Marcos</option><option value="1270">Beaumont-Port Arthur</option><option value="1075">Carrollton</option><option value="601">College Station</option><option value="604">Conroe</option><option value="1261">Corpus Christi</option><option value="18">Dallas</option><option value="132">El Paso</option><option value="287">Fort Worth</option><option value="602">Galveston</option><option value="16">Houston</option><option value="603">Kerrville</option><option value="1260">Laredo</option><option value="1425">Longview</option><option value="1259">Lubbock</option><option value="1159">Marble Falls</option><option value="192">McAllen-Edinburg-Mission</option><option value="1263">Odessa-Midland</option><option value="1077">Plano</option><option value="1161">Rockport</option><option value="1254">San Angelo</option><option value="62">San Antonio</option><option value="1262">Sherman</option><option value="1079">Texas City</option><option value="1257">Tyler-Lufkin-Nacogdoches</option><option value="1264">Victoria</option><option value="1256">Waco-Temple-Bryan</option><option value="1271">Wichita Falls</option><option value="1163">Wimberley</option></select>';
				break;
				
			case "UT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="605">Bountiful</option><option value="1081">Ogden</option><option value="1083">Orem</option><option value="606">Provo</option><option value="76">Salt Lake City</option><option value="607">St. George</option></select>';
				break;
				
			case "VT":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1344">Bennington-Shaftsbury-Dorset</option><option value="1368">Brattleboro-Bellows Falls</option><option value="228">Burlington</option><option value="609">Middlebury</option></select>';
				break;
				
			case "VA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="562">Alexandria</option><option value="1085">Arlington</option><option value="1275">Bluefield</option><option value="608">Charlottesville</option><option value="1087">Chesapeake</option><option value="1337">Danville-Martinsville</option><option value="56">Hampton Roads</option><option value="1252">Harrisonburg</option><option value="1089">Lynchburg</option><option value="267">Reston-Manassas</option><option value="96">Richmond</option><option value="305">Roanoke</option><option value="1426">South Hill</option><option value="1090">Sugarland Run</option><option value="1250">Tri-Cities</option></select>';
				break;
				
			case "WA":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1092">Bellevue</option><option value="610">Bellingham</option><option value="1094">Bremerton</option><option value="611">Olympia</option><option value="612">Port Townsend</option><option value="613">San Juan Islands</option><option value="28">Seattle</option><option value="200">Spokane</option><option value="614">Vancouver-Longview</option><option value="615">Whidbey Island</option><option value="1253">Yakima-Pasco-Richland-Kennewick</option></select>';
				break;
				
			case "WV":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1297">Bluefield-Beckley-Oak Hill</option><option value="230">Charleston</option><option value="1294">Clarksburg-Weston</option><option value="1251">Fort Seybert</option><option value="1104">Huntington</option><option value="1430">Martinsburg</option><option value="1429">Morgantown-Fairmont</option><option value="1296">Parkersburg</option><option value="1295">Wheeling</option></select>';
				break;
				
			case "WI":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1096">Appleton-Oshkosh-Neenah</option><option value="1167">Eagle River</option><option value="1098">Green Bay</option><option value="1100">Kenosha</option><option value="1121">La Crosse-Eau Claire</option><option value="198">Madison</option><option value="1169">Menomonie</option><option value="48">Milwaukee</option><option value="319">Racine</option><option value="616">Sheboygan</option><option value="1165">Sturgeon Bay</option><option value="1356">Superior</option><option value="1102">Waukesha</option><option value="1232">Wausau-Rhinelander</option></select>';
				break;
				
			case "WY":
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1173">Casper</option><option value="232">Cheyenne</option><option value="1366">Cody</option><option value="1335">Jackson</option><option value="1171">Laramie</option><option value="1347">Newcastle</option><option value="1432">Rock Springs-Green River</option></select>';
				break;
				
			default:
				marketID.innerHTML = '<select name="market" id="icom_mm11_city_cd"><option value="">Select City</option><option value="1360">Anniston</option><option value="1233">Auburn-Phenix City</option><option value="108">Birmingham</option><option value="1289">Dothan</option><option value="1129">Eufaula</option><option value="499">Fairhope</option><option value="406">Florence</option><option value="255">Huntsville</option><option value="156">Mobile</option><option value="1249">Montgomery-Selma</option><option value="1312">Tuscaloosa</option><option value="1359">Vernon</option></select>';
				break;
				
		}
		
	}// JavaScript Document