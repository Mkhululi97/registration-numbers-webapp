export default function RegistrationsRoute(factoryFunc, dbFunc) {
  // create an async funtion to call on the GET '/' route in the index.js file
  async function home(req, res) {
    try {
      // render the html template on home.handlebars
      res.render("home", {
        // send an array of object/s which contain all field names for the
        // reg_numbers tables as well as the records, to the frontend.
        registrations: await dbFunc.getRegNum(),
        filteredRegNums: await dbFunc.getSelectedTownRegNums(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  // create an async funtion to call on the POST '/reg_numbers' route in the index.js file
  async function registrations(req, res) {
    try {
      // get the value of your input field.
      let input = req.body.input;
      // send the reginumbers to the database factory function.
      await dbFunc.setTown(input);
      // send reginumbers to the server
      await dbFunc.setRegNum(input);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  async function reset(req, res) {
    try {
      await dbFunc.resetRegistrations();
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  async function filter(req, res) {
    try {
      let currentTown = req.body.towns;
      await dbFunc.showForTown(currentTown);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  return { home, registrations, reset, filter };
}
