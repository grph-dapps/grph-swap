const {swapStakePoolProxyContract, swapContract} = require('../base/contracts');

const initParams = require('../init');
const {sleep} = require("../base/utils");

(async () => {
    await swapContract.deploy(initParams.swapContract.initial_owner, initParams.swapContract.initial_fee, initParams.swapContract.grph_address);
    console.log('swap contract deployed:', swapContract.getContractAddress());
    await sleep(5);
    await swapStakePoolProxyContract.deploy(initParams.poolStakeProxyContract.contract_owner, swapContract.getContractAddress());
    console.log('swap pool stake proxy contract deployed:', swapContract.getContractAddress());
    await sleep(5);
    await swapContract.SetProxyContract(swapStakePoolProxyContract.getContractAddress());
    console.log('set stake proxy contract address in swap');
})();