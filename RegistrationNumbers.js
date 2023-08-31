export default function RegNumbers() {
  const regex = /^(CA|CL|CJ|CK|CF)\s\d{3}(-? ?\d{1,3})$/i;
  let errorText;
  // let num_plate;
  function showErrors(num_plate) {
    errorText = "";
    if (!regex.test(num_plate)) {
      errorText = "Please enter a valid registration number";
    }
    if (num_plate === "") {
      errorText = "Input empty please enter a registration number";
    }
    return errorText;
  }
  return {
    showErrors,
  };
}
