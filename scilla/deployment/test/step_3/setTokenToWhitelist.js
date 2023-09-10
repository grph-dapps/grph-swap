const {tokens: {zilAddress}} = require('../base/addresses');
const tokens = require('../base/tokens');
const {swapContract} = require('../base/contracts');
const {sleep} = require("../base/utils");


(async () => {
    const amount = '326487324253476253423432434';

    await tokens.grphToken.IncreaseAllowance(swapContract.getContractAddress(), amount);
    console.log('grph token done');
    await sleep(5);

    await tokens.carbToken.IncreaseAllowance(swapContract.getContractAddress(), amount);
    await swapContract.SetTokenToWhiteList(tokens.carbToken.getContractAddress());
    console.log('carb token done');
    await sleep(5);

    await tokens.usdToken.IncreaseAllowance(swapContract.getContractAddress(), amount);
    await swapContract.SetTokenToWhiteList(tokens.usdToken.getContractAddress());
    console.log('usd token done');
    await sleep(5);

    await swapContract.SetTokenToWhiteList(zilAddress);
    console.log('zil token done');
})();