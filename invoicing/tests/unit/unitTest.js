const lab = require("lab");
const { describe, it } = (exports.lab = lab.script());
const { expect } = require("code");

describe("an unit test", () => {
    it("passes", () => {
        expect(true).to.be.true();
    });
});
