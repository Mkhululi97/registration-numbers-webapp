export default function dbFactoryFunc(db) {
  let num_plate = "";
  let town_id = "";
  let town_id_foriegn;
  let regNumbersMap = {};
  let filteredTown;
  const regex = /^(CA|CL|CJ|CK|CF)\s\d{3}(-? ?\d{1,3})$/i;
  function setRegNum(input) {
    num_plate = input.toUpperCase();
  }
  async function getRegNum() {
    if (regex.test(num_plate)) {
      town_id_foriegn = town_id.town_id;
      await db.none(
        "insert into reg_numbers (reg_numbers, town_id) values ($1, $2)",
        [num_plate, town_id_foriegn]
      );
      let registrationstable = await db.manyOrNone("select * from reg_numbers");

      // let townstable = await db.many("select * from towns");
      // console.log(registrationstable);
      return registrationstable;
    }
  }
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
  return { setRegNum, getRegNum, setTown };
}
