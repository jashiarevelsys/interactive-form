function getFullName(){fullName=document.getElementById("fullName").value,firstName=fullName.split(" ").slice(0,-1).join(" "),lastName=fullName.split(" ").slice(-1).join(" ")}function showTab(e){var t=document.getElementsByTagName("fieldset");if(document.getElementById("RetailBusiness").checked&&1==e?(document.getElementById("Step2PathA").style.display="none",document.getElementById("Step2PathB").style.display="block"):(t[e].style.display="block",document.getElementById("Step2PathB").style.display="none"),document.getElementById("prevBtn").style.display=0===e?"none":"inline-block",e==t.length-1){var n=document.getElementById("nextBtn");n.innerHTML="Submit",n.className="btn-submit",document.getElementById("prevBtn").className="btn-form-control"}else document.getElementById("nextBtn").innerHTML="Next","Next"===document.getElementById("nextBtn").innerHTML&&(document.getElementById("nextBtn").className="btn-form-control",document.getElementById("prevBtn").className="btn-form-control")}function nextPrev(e){var t=document.getElementsByTagName("fieldset");t[currentTab].style.display="none",currentTab+=e;var n=17*currentTab+18+"%";if(jQuery(".progressbar").css("width",n),t.length-1==currentTab?jQuery(".progress").text("Complete!").css("color","white"):jQuery(".progress").text(currentTab+1+" / 6").css("color","373B40"),currentTab>=t.length)return submitMarketoForm(),document.getElementById("hold-for-redirect").style.display="block",!0;window.location="#step"+(currentTab+1),showTab(currentTab),showNextButton(currentTab)}function showNextButton(e){var t=document.getElementsByTagName("fieldset");y=t[e],e==t.length-1?$("#nextBtn").show():0===$(y).find(":radio:checked").length?$("#nextBtn").hide():$("#nextBtn").show()}function submitMarketoForm(){fullName=document.getElementById("fullName").value,firstName=fullName.split(" ").slice(0,-1).join(" "),lastName=fullName.split(" ").slice(-1).join(" "),email=document.getElementById("email").value,companyName=document.getElementById("businessName").value,vertical=document.querySelector('input[name="businessType"]:checked').value,subVertical=document.querySelector('input[name="subBusinessType"]:checked').value,noOfTerminals=document.querySelector('input[name="noOfTerminals"]:checked')?document.querySelector('input[name="noOfTerminals"]:checked').value:"No Selection",noOfLocations=document.querySelector('input[name="noOfLocations"]:checked')?document.querySelector('input[name="noOfLocations"]:checked').value:"No Selection",timeInBusiness=document.querySelector('input[name="newOrExistingBus"]:checked').value,favoriteFeature=document.querySelector('input[name="featureEnteredIn"]:checked').value,phone=document.getElementById("phone").value,notes=firstName+" indicated that they have a "+vertical+" business. Their business is a "+timeInBusiness+" business and have selected "+favoriteFeature+" as their favorite feature.",MktoForms2.loadForm("//app-sj14.marketo.com","804-YHP-876",2568,function(e){email&&fullName&&(e.setValues({FirstName:firstName,LastName:lastName,Email:email,Company:companyName,Core_Vertical__c:vertical,Vertical__c:subVertical,of_Terminals__c:noOfTerminals,No_of_Locations__c:noOfLocations,Phone:phone,Notes__c:notes}),e.submit(),e.onSuccess(function(e,t){return finalDest="Other"==vertical?"":"-"+vertical,location.href="https://revelsystems.com/thank-you"+finalDest,!1}))})}var currentTab=0,fullName,firstName,lastName,email,companyName,vertical,subVertical,noOfTerminals,noOfLocations,timeInBusiness,favoriteFeature,phone,notes;showTab(currentTab),jQuery(":radio").change(function(e){nextPrev(1)});