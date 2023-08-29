export default function dbFactoryFunc(db) {
  let num_plate = "";
  let town_id = "";
  let town_id_foriegn;
  let registrationstable;
  let registrationsArrayFromTown;
  let filterOn = false;
  let errorText;
  let infoText;
  let filteredTown;
  /* 
    regex to match a string that starts with a town name(ca,cl,cj,ck,cf)
    string takes minmum of 4 numbers and max of 6 numbers.
  */
  const regex = /^(CA|CL|CJ|CK|CF)\s\d{3}(-? ?\d{1,3})$/i;
  /*
   use town_id to set a foriegn key for the reg_numbers table
   store current registration number in the reg_numbers table
   get all the registrations from reg_numbers table and return the results
  */
  async function setRegNum(input) {
    num_plate = input.toUpperCase();
    if (regex.test(num_plate)) {
      let existingReg = await db.oneOrNone(
        "select * from reg_numbers where reg_numbers=$1",
        [num_plate]
      );
      if (!existingReg) {
        town_id_foriegn = town_id.town_id;
        await db.none(
          "insert into reg_numbers (reg_numbers, town_id) values ($1, $2)",
          [num_plate, town_id_foriegn]
        );
      } else {
        errorText = "Registration Exists";
      }
      registrationstable = await db.manyOrNone("select * from reg_numbers");
      filterOn = false;
    }
  }

  /* update town_id variable according town of the current registration number */
  async function setTown(input) {
    let twoLetters = input.slice(0, 2).toUpperCase();
    try {
      town_id = await db.oneOrNone(
        "select town_id from towns where starting_letters = $1",
        [twoLetters]
      );
    } catch (err) {
      console.log(err);
    }
  }
  /* Clear Data From reg_numbers Table On The DB */
  async function resetRegistrations() {
    try {
      num_plate = "";
      town_id = "";
      registrationsArrayFromTown = [];
      registrationstable = [];
      await db.none("truncate table reg_numbers restart identity cascade");
      let totalRegistrations = await db.oneOrNone(
        "select count(reg_numbers) from reg_numbers"
      );
      if (totalRegistrations["count"] === "0") {
        infoText = "No Registrations to clear";
      }
      return totalRegistrations;
    } catch (err) {
      console.log(err);
    }
  }
  /* Only Show Registrations From The Selected Town */
  async function showForTown(inputTown) {
    try {
      if (inputTown !== "") {
        num_plate = "";
        town_id = "";
        let town_id_obj;
        town_id_obj = await db.oneOrNone(
          "select town_id from towns where starting_letters = $1",
          [inputTown]
        );
        let show_from_town_id = town_id_obj.town_id;
        registrationsArrayFromTown = await db.manyOrNone(
          "select * from reg_numbers where town_id=$1",
          [show_from_town_id]
        );
      } else {
        registrationsArrayFromTown = await db.manyOrNone(
          "select * from reg_numbers"
        );
      }
    } catch (err) {
      console.log(err);
    }
    filterOn = true;
  }

  /* ------------------------- FUNCTIONS TO CALL ON YOUR HOME ROUTE ------------------------- */
  async function getRegNum() {
    if (filterOn) {
      return registrationsArrayFromTown;
    } else {
      return registrationstable;
    }
  }
  function getErrorText() {
    return errorText;
  }
  function getinfoText() {
    return infoText;
  }
  /* ------------------------- FUNCTIONS TO CALL ON YOUR HOME ROUTE ------------------------- */

  return {
    setRegNum,
    getRegNum,
    setTown,
    resetRegistrations,
    showForTown,
    getErrorText,
    getinfoText,
  };
}
