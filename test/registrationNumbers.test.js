describe("Testing RegistrationNumber Function", function () {
  describe("Valid Plate Numbers", function () {
    it("should set the registration number and return the registration number", function () {
      const regNum = RegNumbers();
      regNum.setRegNum("CJ 456-124");
      assert.equal("CJ 456-124", regNum.validRegNum());
      regNum.setRegNum("cl 293-324");
      assert.equal("CL 293-324", regNum.validRegNum());
      regNum.setRegNum("CA 45679");
      assert.equal("CA 45679", regNum.validRegNum());
      regNum.setRegNum("Ca 248 930");
      assert.equal("CA 248 930", regNum.validRegNum());
      regNum.setRegNum("ck 293324");
      assert.equal("CK 293324", regNum.validRegNum());
    });
  });
  describe("Display Error Message", function () {
    it("return 'invalid registration' for valid plate numbers", function () {
      const regNum = RegNumbers();
      regNum.setRegNum("ck 1293324");
      assert.equal("invalid registration", regNum.errorMsg());
      regNum.setRegNum("CK 19-3324");
      assert.equal("invalid registration", regNum.errorMsg());
      regNum.setRegNum("CK 19 33 24");
      assert.equal("invalid registration", regNum.errorMsg());
      regNum.setRegNum("CK193324");
      assert.equal("invalid registration", regNum.errorMsg());
    });
    it("displays 'please enter a registration number' error message", function () {
      const regNum = RegNumbers();
      regNum.setRegNum("");
      assert.equal("please enter a registration number", regNum.errorMsg());
      regNum.setRegNum("CK 19-3324");
      assert.equal("invalid registration", regNum.errorMsg());
      regNum.setRegNum("ck 293324");
      assert.equal("CK 293324", regNum.validRegNum());
    });
    it("returns 'registration exists' when registration has already been entered", function () {
      const regNum = RegNumbers();
      regNum.setRegNum("CA 222-909");
      regNum.validRegNum();
      regNum.setRegNum("CA 222-909");
      regNum.validRegNum();
      assert.equal("registration exists", regNum.errorMsg());
      regNum.setRegNum("CA 222909");
      regNum.validRegNum();
      regNum.setRegNum("CA 222909");
      regNum.validRegNum();
      assert.equal("registration exists", regNum.errorMsg());
    });
  });
  describe("Get Registration Numbers From A Town", function () {
    it("should return a list of registration numbers from CA", function () {
      const regNum = RegNumbers();
      const CARegNumArr = ["CA 222-909", "CA 22239", "CA 113 909"];
      regNum.setRegNum("CA 222-909");
      regNum.validRegNum();
      regNum.setRegNum("CF 222 923");
      regNum.validRegNum();
      regNum.setRegNum("CA 22239");
      regNum.validRegNum();
      regNum.setRegNum("CA 113 909");
      regNum.validRegNum();
      regNum.setRegNum("CF 334232");
      regNum.validRegNum();
      assert.deepEqual(CARegNumArr, regNum.selectedTown("CA"));
    });
    it("should return a list of registration numbers from CF", function () {
      const regNum = RegNumbers();
      const CFRegNumArr = ["CF 222 923", "CF 334232"];
      regNum.setRegNum("CA 222-909");
      regNum.validRegNum();
      regNum.setRegNum("CF 222 923");
      regNum.validRegNum();
      regNum.setRegNum("CA 22239");
      regNum.validRegNum();
      regNum.setRegNum("CA 113 909");
      regNum.validRegNum();
      regNum.setRegNum("CF 334232");
      regNum.validRegNum();
      assert.deepEqual(CFRegNumArr, regNum.selectedTown("CF"));
    });
    it("should return a list of registration numbers from CK", function () {
      const regNum = RegNumbers();
      const CKRegNumArr = ["CK 222-909", "CK 222 923", "CK 22239", "CK 334232"];
      regNum.setRegNum("CK 222-909");
      regNum.validRegNum();
      regNum.setRegNum("CK 222 923");
      regNum.validRegNum();
      regNum.setRegNum("CK 22239");
      regNum.validRegNum();
      regNum.setRegNum("CA 113 909");
      regNum.validRegNum();
      regNum.setRegNum("CK 334232");
      regNum.validRegNum();
      assert.deepEqual(CKRegNumArr, regNum.selectedTown("CK"));
    });
  });
  describe("Clearing The Registration Map And The Filtered Town Array", function () {
    it("should clear all the data inside the 'regNumbersMap' and return an empty Map", function () {
      let regNum = RegNumbers();
      regNum.setRegNum("CK 222-909");
      regNum.validRegNum();
      regNum.setRegNum("CK 222 923");
      regNum.validRegNum();
      regNum.setRegNum("CK 22239");
      regNum.validRegNum();
      regNum.setRegNum("CA 113 909");
      regNum.validRegNum();
      regNum.setRegNum("CK 334232");
      regNum.validRegNum();
      assert.deepEqual({}, regNum.clearMap());
    });
    it("should clear all the Registration Numbers in the 'filteredTownArr' ", function () {
      let regNum = RegNumbers();
      regNum.setRegNum("CK 222-909");
      regNum.validRegNum();
      regNum.setRegNum("CK 222 923");
      regNum.validRegNum();
      regNum.setRegNum("CK 22239");
      regNum.validRegNum();
      regNum.setRegNum("CA 113 909");
      regNum.validRegNum();
      regNum.setRegNum("CK 334232");
      regNum.validRegNum();
      assert.deepEqual([], regNum.clearFilteredTown());
    });
  });
});
