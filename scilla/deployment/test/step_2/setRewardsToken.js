const {swapStakePoolProxyContract, swapStakePool} = require('../base/contracts');

const addresses = require('../base/addresses');
const tokens = require('../base/tokens');
const initParams = require('../init');
const {admin} = require("../config");
const {sleep} = require("../base/utils");

(async () => {
    await swapStakePool.deploy(
        initParams.poolStakeContract.contract_owner,
        swapStakePoolProxyContract.getContractAddress(),
        tokens.grphToken.getContractAddress(),
        '100000000',
        true,
        false
    );
    console.log('swap pool stake contract with grph as rewards token deployed:', swapStakePool.getContractAddress());
    await sleep(5);
    await tokens.grphToken.SetMinter(swapStakePool.getContractAddress())
    console.log('set stake contract as grph token minter');
    await sleep(5);
    await swapStakePoolProxyContract.SetRewardsToken(
        addresses.tokens.zilAddress,
        swapStakePool.getContractAddress(),
        tokens.grphToken.getContractAddress(),
        admin,
        '2400000' // 0.024 grph per block => 60 grph daily
    );
    console.log('set grph as reward token in stake contract');
})();