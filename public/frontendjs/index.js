/* ##### GET THE CLEAR BUTTON ##### */
const clearBtn = document.querySelector(".clear-btn");
/* ##### GET THE FILTER BUTTON ##### */
const filterBtn = document.querySelector(".filter-btn");
/* ##### GET THE div registrations ##### */
const filterContainer = document.querySelector(".reg-num-filtered");
/* ##### GET P ELEMENT THAT DISPLAYS ERROR TEXTS ##### */
const errorMsgEle = document.querySelector(".error-msg");
const errorTextEle = document.querySelector(".error-text");
/* ##### GET P ELEMENT THAT DISPLAYS INFORMATION TEXTS ##### */
const infoTextEle = document.querySelector(".msg");

/* ############## FUNCTIONS ############## */

/* Create function that double checks if user
    wants to clear the database.
*/
function clearFunction(e) {
  const clearData = window.confirm(
    "Are you sure you want to clear all registrations ⚠?"
  );
  clearData ? "" : e.preventDefault();
}
setTimeout(function () {
  errorMsgEle.innerHTML !== "" ? (errorMsgEle.innerHTML = "") : "";
  errorTextEle.innerHTML !== "" ? (errorTextEle.innerHTML = "") : "";
  infoTextEle.innerHTML !== "" ? (infoTextEle.innerHTML = "") : "";
}, 2500);

/* ############## EVETN LISTENERS ############## */
clearBtn.addEventListener("click", clearFunction);
