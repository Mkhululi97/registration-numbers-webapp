/* ####### BRING IN ASSERT ####### */
import assert from "assert";
/* ##### BRING IN THE FACTORY FUNCTION ##### */
import RegNumbers from "../RegistrationNumbers.js";
/* ##### BRING IN THE DATABASE ##### */
import db from "../database.js";
/* ##### BRING IN THE DATABASE FACTORY FUNCTION ##### */
import DBFactoryFunc from "../Registrationsdb.js";

describe("Testing RegistrationNumber Function", function () {
  /* SOLVE THE TIMEOUT OF 2000MS EXCEEDED EEROR */
  this.timeout(3000);
  /* START WITH A CLEAN TABLE EACH TIME */
  beforeEach(async function () {
    await db.none("truncate table reg_numbers restart identity cascade;");
  });

  /* ------------------------ TESTS CONNECTED TO THE DATABASE ------------------------ */
  describe("getRegNum function", function () {
    it("should not store repeating registration numbers", async function () {
      try {
        let dbFactoryFunc = DBFactoryFunc(db);

        await dbFactoryFunc.setTown("ca 222-344");
        await dbFactoryFunc.setRegNum("ca 222-344");

        await dbFactoryFunc.setTown("ca 222-344");
        await dbFactoryFunc.setRegNum("ca 222-344");

        let resArr = [{ reg_id: 1, reg_numbers: "CA 222-344", town_id: 5 }];
        assert.deepEqual(resArr, await dbFactoryFunc.getRegNum());
      } catch (err) {
        console.log(err);
      }
    });
  });
  describe("resetRegistrations function", function () {
    it("clear all the registration numbers in the reg_numbers table", async function () {
      let dbFactoryFunc = DBFactoryFunc(db);

      await dbFactoryFunc.setTown("ca 223-988");
      await dbFactoryFunc.setRegNum("ca 223-988");

      await dbFactoryFunc.setTown("cl 997-990");
      await dbFactoryFunc.setRegNum("cl 997 990");
      assert.deepEqual(
        { count: "0" },
        await dbFactoryFunc.resetRegistrations()
      );
    });
  });
  describe("getSelectedTownRegNums function", function () {
    it("show only the registration numbers from the selected town", async function () {
      let dbFactoryFunc = DBFactoryFunc(db);

      await dbFactoryFunc.setTown("ca 997 990");
      await dbFactoryFunc.setRegNum("ca 997 990");

      await dbFactoryFunc.setTown("cl 924950");
      await dbFactoryFunc.setRegNum("cl 924950");

      await dbFactoryFunc.showForTown("CL");
      let resArr = [{ reg_id: 2, town_id: 4, reg_numbers: "CL 924950" }];

      assert.deepEqual(resArr, await dbFactoryFunc.getSelectedTownRegNums());
    });
  });
  // close of the connection to the database.
  after(function () {
    db.$pool.end();
  });
  /* ------------------------ TESTS CONNECTED TO THE DATABASE ------------------------ */
});
