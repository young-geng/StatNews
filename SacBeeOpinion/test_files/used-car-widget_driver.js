    // window.onerror=processError;

    // variables used to change selection when "===" selected
    var nModelPrevSelected = new Number(0);
    var nMakePrevSelected = new Number(0);

    var makesName = new Array();
    // used as a cross reference table for name and number
    // the following are used as a 2D table for makes and models
    var makes = new Array();
    var models = new Array();
    // load the arrays and construct the selections on the page
    function initDocument() {
      K(0,'All');
      D(0,'All');
      initCars();
      fillMakeSelect();
      //fillModelSelect( "1");
      delayModelSelect(0);
    }
    // create car make objects and fill arrays
    function K( makenumber, make ) {
      makesName[make] = new MakesName(make,makenumber);
      makes[makenumber] = new Make( make,makenumber );
    }
    // make name constructor
    function MakesName( makeName,makeNumber ) {
      this.makeNumber = makeNumber;
    }
    // make constructor
    function Make( makeName,makeNumber ) {
      this.makeName = makeName;
      this.makeNumber = makeNumber;
      // create array associated with makes
      this.models = new Array();
    }
    // construct make selection on page
    function fillMakeSelect(  ) {
      document.QuickForm.mknm.options.selectedIndex = 0;
      // init selection index
      document.QuickForm.mknm.options.length = 1;
      // clear select

      // fill selection with makes
      var i = 0;
	//   document.QuickForm.mknm.options[ i ] = new Option( "All" , "All" );
	// i++;
      for ( var make in makesName ) {
        var aMake = makesName[make];
        if (make != undefined && aMake.makeNumber != undefined) {
          document.QuickForm.mknm.options[ i ] = new Option( make, make );
          i++;
        }
      }
      document.QuickForm.mknm.options[ i ] = new Option( "===============" , "" );

      document.QuickForm.mknm.options[ 0 ].selected = true;
      // select first item
    }
    // create car model objects and fill arrays
    function D( makeNumber, model ) {
      var modelObj = new Model( model, makeNumber);
      makes[makeNumber].models[model] = modelObj;
    }
    // model constructor
    function Model( model,makeNumber ) {
      this.modelName = model;
      this.makeNumber = makeNumber;
    }
    // construct model selection on page
    function fillModelSelect( makeNbr ) {
      
      document.QuickForm.mdnm.options.selectedIndex = 0;
      document.QuickForm.mdnm.options.length = 1;
      var selectedModels;
      selectedModels = (makes[makeNbr].models);
	  // fill selection with models
      var i=0;
      if (makeNbr != 0) {
        document.QuickForm.mdnm.options[ i ] = new Option( "All" , "All" );
        i++;
      }
      // console.log(selectedModels);
      for ( aModelIdx in selectedModels ) {
        aModel = selectedModels[ aModelIdx ];
        if (aModel.modelName != undefined) {
          document.QuickForm.mdnm.options[ i ] = new Option( aModel.modelName, aModel.modelName );
          i++;
        }
      }
      //document.QuickForm.mdnm.options[ i ] = new Option( "===============" , "" );
      document.QuickForm.mdnm.options[ 0 ].selected = true;
       if(psMd != 0) {
       document.QuickForm.mdnm.options[psMd].selected = true;
         psMd=0;
       }
    }
    // when make selected fill model selection
    function selectedMake( aSelectedMake ) {
      var selectedIdx = aSelectedMake.selectedIndex;
      var selectedMakeName = (aSelectedMake.options[ selectedIdx ]).value;
        var i = 0;
      for (aIdx in makesName) {
        if (aIdx == selectedMakeName)
        i++;
      }
      if (i == 0 && selectedMakeName != 'All') {
        Populate(document.QuickForm.mknm,0);
      } else {
        var makeNBR = makesName[selectedMakeName].makeNumber;
        // use cross reference table to get makeintid
        fillModelSelect( makeNBR );
      }
    }
    function PopulateClient(listBox, prevSelected) {
      // var selectedValue = new String(listBox.options[listBox.selectedIndex].value);
      with (document.QuickForm) {
        if (listBox.selectedIndex != listBox.options.length-1) {
          selectedMake(listBox);
        } else {
          listBox.options[prevSelected].selected = true;
          selectedMake(listBox);
        }
      }
    }
    // check user selection on model selection list
    function validateModel() {
      with (document.QuickForm) {
        if(mdnm.options[mdnm.selectedIndex].value == "")
        mdnm.options[nModelPrevSelected].selected = true;
      }
    }
    function ValidateUsed() {
      with (document.QuickForm) {
        if (zc.value == "" || zc.value.length < 5)  {
          alert("Please enter a valid five-digit ZIP code to find cars in your area.");
          return false;
        }
        else return true;
      }
    }
    function submitUsedForm() {
      var zipEntered = ValidateUsed();
      if (zipEntered){
        document.QuickForm.submit();
      }
    }
    function processError() {
      with (document.QuickForm) {
        if (mknm.options[mknm.selectedIndex].value != "" && mknm.options[mknm.selectedIndex].value != "All") {
          Populate(mknm,0);
        } else {
          mknm.options[0].selected = true;
        }
      }
      return true;
    }
    var psMd = 0;
    function delayModelSelect(n){
      if(n == 0) {
        window.setTimeout('delayModelSelect(1)', 100);
      } else if(n == 1) {
        psMd = document.getElementById('usedmd').options.selectedIndex;
        window.setTimeout('fillModelSelect('+makesName[document.getElementById('usedmk').options[document.getElementById('usedmk').options.selectedIndex].value].makeNumber+')', 200);
      }
    }
