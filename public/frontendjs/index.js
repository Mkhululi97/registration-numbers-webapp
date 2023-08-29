/* ##### GET THE CLEAR BUTTON ##### */
const clearBtn = document.querySelector(".clear-btn");
/* ##### GET THE FILTER BUTTON ##### */
const filterBtn = document.querySelector(".filter-btn");
/* ##### GET THE div registrations ##### */
const filterContainer = document.querySelector(".reg-num-filtered");

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
