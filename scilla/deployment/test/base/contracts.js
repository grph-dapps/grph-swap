const {
    privateKey,
    api,
    net,
    version,
} = require('../config');

const {swapAddress, swapStakeProxyAddress} = require('./addresses');

const GrphSwap = require('../../../artifacts/GrphSwap.scilla');
const GrphPoolStakeProxy = require('../../../artifacts/GrphPoolStakeProxy.scilla');
const GrphPoolStake = require('../../../artifacts/GrphPoolStake.scilla');

const swapContract = GrphSwap({privateKey, api, version, net, contractAddress: swapAddress});
const swapStakePoolProxyContract = GrphPoolStakeProxy({privateKey, api, version, net, contractAddress: swapStakeProxyAddress});
const swapStakePool = GrphPoolStake({privateKey, api, version, net});

module.exports = {
    swapContract,
    swapStakePoolProxyContract,
    swapStakePool,
};