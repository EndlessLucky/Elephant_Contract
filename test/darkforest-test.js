const { expect, assert, waffle } = require("chai");
const { ethers } = require("hardhat");
describe("DarkForest", function () {
  let DarkForest, DarkForestContract;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    DarkForest = await ethers.getContractFactory("DarkForest");
    DarkForestContract = await DarkForest.deploy(
      "https://ipfs.io/ipfs/QmcTEpUn8Vb4Le11PyomhFLBCkn8Gw1Ns4k8EqKRUyLy2G/"
    );
    await DarkForestContract.deployed();
    console.log("success");
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      console.log("Owner Address:", owner.address);
      // console.log("BaseTokenURI:",await DarkForestContract.baseTokenURI());
      expect(await DarkForestContract.owner()).to.equal(owner.address);
    });
  });

  describe("Contract Name and Symbol check", function () {
    it("should return DarkForestNFT as contract name", async function () {
      const name = await DarkForestContract.name();
      assert.equal(name, "DarkForest");
    });

    it("should return DarkForest as contract symbol", async function () {
      const symbol = await DarkForestContract.symbol();

      assert.equal(symbol, "DF");
    });
  });

  describe("Mint Function Check", function () {
    const tokenAmount = 2;
    it("Should mint success", async function () {
      await DarkForestContract.setPause(false);
   
      const price = await DarkForestContract.getMintPrice(tokenAmount);
      console.log("mint->price:", price.toString());
      await DarkForestContract.connect(addr1).mint(tokenAmount, {
        value: price.toString()
      });
      const bnTokens = await DarkForestContract.walletOfOwner(addr1.address);
      var tokens = [];
      bnTokens.forEach((bn) => tokens.push(bn.toNumber()));
      var tokens = [];
      bnTokens.forEach((bn) => tokens.push(bn.toNumber()));

      assert.deepEqual(tokens.length, tokenAmount);
    });
  });
  describe("WithdrawAll function check", function () {
    // it("should work well", async function (){

    //   await DarkForestContract.connect(owner).withdrawAll();
    // })
    it("should fail with non-owner account", async function () {
      await expect(DarkForestContract.connect(addr1).withdrawAll()).to.be
        .reverted;
    });
  });
  describe("TokenURI function check", function () {
    it("should return .json style", async function () {
      await DarkForestContract.setPause(false);
      const price = await DarkForestContract.getMintPrice(2);
      console.log("mint->price:", price.toString());
      await DarkForestContract.mint(2, { value: price.toString() });
      await DarkForestContract.setMetaReveal(true, 1, 5555);

      const uri = await DarkForestContract.tokenURI(1);
      console.log("return TokenURI", uri);
      expect(uri).to.equal(
        "https://ipfs.io/ipfs/QmcTEpUn8Vb4Le11PyomhFLBCkn8Gw1Ns4k8EqKRUyLy2G/1.json"
      );
    });
  });
});
