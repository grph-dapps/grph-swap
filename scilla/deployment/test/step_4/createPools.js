const {tokens: {zilAddress}} = require('../base/addresses');
const tokens = require('../base/tokens');
const {swapContract} = require('../base/contracts');
const {sleep} = require("../base/utils");

const GRPH_AMOUNT = 1000 * (10 ** 8);


(async () => {

    //await swapContract.Unpause();

    const deadline_block = Number.MAX_SAFE_INTEGER;

    await swapContract.AddLiquidity(
        GRPH_AMOUNT,
        tokens.carbToken.getContractAddress(),
        500 * (10 ** 8),
        500 * (10 ** 8),
        deadline_block,
        2500,
        5000,
    ); // pool [carb, grph];
    console.log("carb pool created!");
    await sleep(5);

    await swapContract.AddLiquidity(
        GRPH_AMOUNT,
        tokens.usdToken.getContractAddress(),
        200 * (10 ** 8),
        200 * (10 ** 8),
        deadline_block,
        2500,
        5000,
    ); // pool [usd, grph];
    console.log("usd pool created!");
    await sleep(5);

    await swapContract.AddLiquidity(
        GRPH_AMOUNT,
        zilAddress,
        10000 * (10 ** 12),
        10000 * (10 ** 12),
        deadline_block,
        2500,
        5000,
        (10000 * (10 ** 12)).toString()
    ); // pool [zil, grph];
    console.log("zil pool created!");
    await sleep(5);

})();