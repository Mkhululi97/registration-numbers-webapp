/* ##### GET THE CLEAR BUTTON ##### */
const clearBtn = document.querySelector(".clear-btn");
/* Create function that double checks if user
   wants to clear the database.
*/
function clearFunction(e) {
  const clearData = window.confirm(
    "Are you sure you want to clear all registrations ⚠?"
  );
  clearData ? "" : e.preventDefault();
}
clearBtn.addEventListener("click", clearFunction);
