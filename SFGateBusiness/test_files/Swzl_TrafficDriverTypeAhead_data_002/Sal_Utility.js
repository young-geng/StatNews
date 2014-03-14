function openCommonWindow(strUrl,strWidth,strHeight)
{		
		
		 var subWin = window.open(strUrl,"CommonWindow",
								"toolbar=yes,scrollbars=yes," + 
									"resizable=yes,width=" + strWidth + "," +
										"height=" + strHeight + ",left=0,top=0");		
	
		if (subWin != null)
		subWin.focus();
}

function GoodEmailAddress(strEmail){
				strEmail = trim(strEmail);
				if (strEmail.indexOf(" ")>0 && strEmail.indexOf(" ")<strEmail.length-1){return false;}
				if (strEmail.length < 5) {return false;}
				if (strEmail.indexOf("@") < 1) {return false;}//there must be at least one '@'
				//there can not be two '@' or more
				if (strEmail.indexOf(".",strEmail.indexOf("@")) < strEmail.indexOf("@")){return false;}
				if (strEmail.lastIndexOf("@") != strEmail.indexOf("@")) {return false;}
				if (strEmail.lastIndexOf(".") == strEmail.length-1) {return false;}
				return true;	
}	

function trim(strValue) {
			return trimRight(trimLeft(strValue));	
		}

function trimLeft(strValue) {
			if (strValue == null) return null;
			if (strValue.length == 0) return strValue;
			for (i=0; i<strValue.length; i++) {
				if (strValue.charAt(i) != ' ')
					return strValue.substr(i);
			}
			return "";
		}

function trimRight(strValue) {	
			if (strValue == null) return null;
			if (strValue.length == 0) return strValue;
			for (i=strValue.length-1; i>=0; i--) {
				if (strValue.charAt(i) != ' ')
					return strValue.substring(0, i+1);
			}
			return "";
		}
		
		

function TellafriendForm(strPageUrl)
{
    
	var bolSubmit=true;
	if(document.getElementById("mainform").fromname.value.length==0)
	{
	    alert("Please enter your name.");
	    document.getElementById("mainform").fromname.focus();
	    bolSubmit=false;
	    return;     
	}
	
	if(document.getElementById("mainform").fromaddress.value.length==0)
	{
	    alert("Please enter your email.");
	    document.getElementById("mainform").fromaddress.focus();
	    bolSubmit=false;
	    return;   
	    
	}else{
	
	    if(!GoodEmailAddress(document.getElementById("mainform").fromaddress.value))
	    {
	        alert("Your email address is invalid.");
	        document.getElementById("mainform").fromaddress.select();
	        document.getElementById("mainform").fromaddress.focus();
	        bolSubmit=false;
	        return;           
	    }
	}
	
	if(document.getElementById("mainform").toname.value.length==0)
	{
	    alert("Please enter your friend's name.");
	    document.getElementById("mainform").toname.focus();
	    bolSubmit=false;
	    return;   
	}
	
	if(document.getElementById("mainform").toaddress.value.length==0)
	{
		    alert("Please enter your friend's email.");
		    document.getElementById("mainform").toaddress.focus();
		    bolSubmit=false;
	        return;  
				
    }else{
				if(!GoodEmailAddress(document.getElementById("mainform").toaddress.value))
				{
					alert("Your friend's email address is invalid.");
					document.getElementById("mainform").toaddress.select();
					document.getElementById("mainform").toaddress.focus();
					bolSubmit=false;
	                return; 
               }
	}	
	
	if(bolSubmit)
	{
	    document.getElementById("mainform").isSendEmail.value="1";
	    document.getElementById("mainform").target = "_self";
        document.getElementById("mainform").method = "post";
        document.getElementById("mainform").action = strPageUrl;
        document.getElementById("mainform").submit();	
	}
}

function PageLink(strPageUrl)
{
    if(document.getElementById("mainform"))
    {
        document.getElementById("mainform").target = "_self";
        document.getElementById("mainform").method = "post";
        document.getElementById("mainform").action = strPageUrl;
        document.getElementById("mainform").submit();
    }
    else
    {
        document.getElementById("selectcategoryform").target = "_self";
        document.getElementById("selectcategoryform").method = "post";
        document.getElementById("selectcategoryform").action = strPageUrl;
        document.getElementById("selectcategoryform").submit();
    }
}

function GetCurSiteName()
{
    var strCurSiteName="";
    strCurSiteName=window.location.href.toLowerCase();
    if(trim(strCurSiteName).indexOf("canadasalarywizard")>0 && trim(strCurSiteName).indexOf("canada")>0 )
    {
        strCurSiteName="CanadaSalaryWizard";
    }
    else
    {
        strCurSiteName="SalaryWizard";
    }
    return strCurSiteName;
}


