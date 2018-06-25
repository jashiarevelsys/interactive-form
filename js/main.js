var currentTab = 0; // Current tab is set to be the first tab (0)
var fullName, firstName, lastName, email, companyName, vertical, subVertical,noOfTerminals, noOfLocations, timeInBusiness, favoriteFeature, phone, notes;

function getFullName() {
	fullName = document.getElementById('fullName').value;
	firstName = fullName.split(' ').slice(0, -1).join(' ');
	lastName = fullName.split(' ').slice(-1).join(' ');
}

showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByTagName('fieldset');

  if ( document.getElementById('RetailBusiness').checked && n == 1 ) {
  	document.getElementById('Step2PathA').style.display = "none";
  	document.getElementById('Step2PathB').style.display = "block";
  //} else if (){
  } else {
  	var element = x[n];
  	element.classList.add('active');
  	element.classList.remove('passed');
  	// element.style.right = "0px";
	document.getElementById('Step2PathB').style.display = "none";
  }


  // ... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline-block";
  }
  if (n == (x.length - 1)) {
  	var nextBtnEl = document.getElementById('nextBtn');
    nextBtnEl.innerHTML = "Submit";
    nextBtnEl.className = 'btn-submit';
	document.getElementById("prevBtn").className = 'btn-form-control';
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    if ( document.getElementById("nextBtn").innerHTML === "Next") {
    	document.getElementById("nextBtn").className = 'btn-form-control';
    	document.getElementById("prevBtn").className = 'btn-form-control';
    }
  }

}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.getElementsByTagName('fieldset');
	// Hide the current tab:
	// x[currentTab].style.display = "none";
	if(n === -1){
		x[currentTab].classList.remove('active');
		x[currentTab].style = "";

	} else {
		x[currentTab].classList.remove('active');
		x[currentTab].classList.add('passed');

		

	}
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	var w = (currentTab * 17 + 18) + "%";
	jQuery('.progressbar').css('width', w);
	if (x.length - 1 == currentTab) {
		jQuery('.progressed').text("Complete!").css('color', 'white');
	} else {
		jQuery('.progressed').text(currentTab + 1 + " / 6").css('color', '#373B40');
	}
	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		submitMarketoForm();
		document.getElementById('hold-for-redirect').style.display = "block";
		return true;
	}
	window.location = '#step' + (currentTab + 1);
	// Otherwise, display the correct tab:
	showTab(currentTab);
	showNextButton(currentTab);
}

jQuery(':radio').change(function(event) {
	nextPrev(1);
});

function showNextButton(currentTab){
	var w = document.getElementsByTagName('fieldset');
	y = w[currentTab];
	if ( currentTab == w.length - 1 ) {
		$('#nextBtn').show();
	} else if ( $(y).find(':radio:checked').length === 0 ) {
		$('#nextBtn').hide();
	} else {
	    $('#nextBtn').show();
	}
}

function submitMarketoForm(){
	fullName = document.getElementById('fullName').value;
	firstName = fullName.split(' ').slice(0, -1).join(' ');
	lastName = fullName.split(' ').slice(-1).join(' ');
	email = document.getElementById('email').value;
	companyName = document.getElementById("businessName").value;
	vertical = document.querySelector( 'input[name="businessType"]:checked' ).value;
	subVertical = ( document.querySelector( 'input[name="subBusinessType"]:checked') ) ? document.querySelector( 'input[name="subBusinessType"]:checked').value : "No Selection";
	noOfTerminals = (document.querySelector( 'input[name="noOfTerminals"]:checked' ) ) ? document.querySelector( 'input[name="noOfTerminals"]:checked' ).value : "No Selection";
	noOfLocations = (document.querySelector( 'input[name="noOfLocations"]:checked' ) ) ? document.querySelector( 'input[name="noOfLocations"]:checked' ).value : "No Selection";
	timeInBusiness = document.querySelector( 'input[name="newOrExistingBus"]:checked' ).value;
	favoriteFeature = document.querySelector( 'input[name="featureEnteredIn"]:checked' ).value;
	phone = document.getElementById("phone").value;
	notes = firstName + " indicated that they have a " + vertical + " business. Their business is a " + timeInBusiness + " business and have selected " + favoriteFeature + " as their favorite feature.";

	MktoForms2.loadForm("//app-sj14.marketo.com", "804-YHP-876", 2568, function(form){
		if (email && fullName) {
			form.setValues({
				"FirstName" : firstName,
				"LastName" : lastName,
				"Email" : email,
				"Company" : companyName,
				"Core_Vertical__c" : vertical,
				"Vertical__c" : subVertical,
				"of_Terminals__c" : noOfTerminals,
				"No_of_Locations__c" : noOfLocations,
				"Phone" : phone,
				"Notes__c" : notes
			});
			form.submit();
			form.onSuccess(function(values, followUpUrl) {
				finalDest = ( vertical == "QuickTable" ) ? "Other" : vertical;
				location.href = "https://revelsystems.com/thank-you/?vertical=" + finalDest + "&fn=" + encodeURI(firstName);
				return false;
			});
		}


	});
}
$('#regForm').validate({
	rules: {
		fullName: {
			required: true,
			minlength: 3
		},
		businessName: {
			required: true,
			minlength: 3
		},
		email: {
			required: true,
			email: true
		},
		phone: {
			required: true,
			minlength: 8
		}
	},
	messages: {
		fullName: "Please specify your full first and last name",
		businessName: "Please specify your company's name",
	    email: {
	      required: "We need your email address to contact you",
	      email: "Your email address must be in the format of name@domain.com"
	    },
	    phone: "Your number should be in 555.555.5555 format"

	}
});
