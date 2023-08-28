export default function dbFactoryFunc(db) {
  let num_plate = "";
  let town_id = "";
  let town_id_foriegn;
  let regNumbersMap = {};
  let filteredTown;
  /* 
    regex to match a string that starts with a town name(ca,cl,cj,ck,cf)
    string takes minmum of 4 numbers and max of 6 numbers.
  */
  const regex = /^(CA|CL|CJ|CK|CF)\s\d{3}(-? ?\d{1,3})$/i;
  function setRegNum(input) {
    num_plate = input.toUpperCase();
  }
  /*
   use town_id to set a foriegn key for the reg_numbers table
   store current registration number in the reg_numbers table
   get all the registrations from reg_numbers table and return the results
  */
  async function getRegNum() {
    if (regex.test(num_plate)) {
      town_id_foriegn = town_id.town_id;
      await db.none(
        "insert into reg_numbers (reg_numbers, town_id) values ($1, $2)",
        [num_plate, town_id_foriegn]
      );
      let registrationstable = await db.manyOrNone("select * from reg_numbers");
      return registrationstable;
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
      await db.none("truncate table reg_numbers restart identity cascade");
      let totalRegistrations = db.oneOrNone(
        "select count(reg_numbers) from reg_numbers"
      );
      return totalRegistrations;
    } catch (err) {
      console.log(err);
    }
  }
  return { setRegNum, getRegNum, setTown, resetRegistrations };
}
