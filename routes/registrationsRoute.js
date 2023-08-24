export default function RegistrationsRoute(factoryFunc) {
  async function home(req, res) {
    try {
      // validate the registration number for selected towns and number formats
      factoryFunc.validRegNum();
      // send valid reginumbers to the map.

      res.render("home", {
        mapReg: factoryFunc.getRegNumbersMap(),
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function registrations(req, res) {
    try {
      // get the value of your input field.
      let input = req.body.input;
      // send reginumbers to the server
      factoryFunc.setRegNum(input);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  return { home, registrations };
}
