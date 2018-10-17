let chai = require("chai");
let sinonChai = require("sinon-chai");
chai.use(sinonChai);
let contract = require("./roundRepositoryTest");
let ArrayRoundRepository = require("../src/arrayRoundRepository");

describe("Array Repository", function() {
    contract(ArrayRoundRepository);
});
