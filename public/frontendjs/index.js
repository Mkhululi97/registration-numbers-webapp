/* ##### GET THE CLEAR BUTTON ##### */
const clearBtn = document.querySelector(".clear-btn");
/* ##### GET THE FILTER BUTTON ##### */
const filterBtn = document.querySelector(".filter-btn");
/* ##### GET THE div registrations ##### */
const filterContainer = document.querySelector(".reg-num-filtered");
/* ##### GET P ELEMENT THAT DISPLAYS ERROR TEXTS ##### */
const errorTextEle = document.querySelector(".error-msg");
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
  errorTextEle.innerHTML !== "" ? (errorTextEle.innerHTML = "") : "";
  infoTextEle.innerHTML !== "" ? (infoTextEle.innerHTML = "") : "";
}, 2500);
// function filterFunction(e) {
// // e.preventDefault();
// filterContainer.classList.remove("show");
// alert("wroks here");
// // alert(filterContainer);
// // console.log(filterContainer);
// }

/* ############## EVETN LISTENERS ############## */
clearBtn.addEventListener("click", clearFunction);
// filterBtn.addEventListener("click", filterFunction);
