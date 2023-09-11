const {
    privateKey,
    api,
    net,
    version,
} = require('../config');

const {swapAddress, swapStakeProxyAddress, grphStakeAddress} = require('./addresses');

const GrphSwap = require('../../../artifacts/GrphSwap.scilla');
const GrphPoolStakeProxy = require('../../../artifacts/GrphPoolStakeProxy.scilla');
const GrphPoolStake = require('../../../artifacts/GrphPoolStake.scilla');
const GrphStake = require('../../../artifacts/GrphStake.scilla');

const swapContract = GrphSwap({privateKey, api, version, net, contractAddress: swapAddress});
const swapStakePoolProxyContract = GrphPoolStakeProxy({privateKey, api, version, net, contractAddress: swapStakeProxyAddress});
const swapStakePool = GrphPoolStake({privateKey, api, version, net});
const grphStake = GrphStake({privateKey, api, version, net, contractAddress: grphStakeAddress});

module.exports = {
    swapContract,
    swapStakePoolProxyContract,
    swapStakePool,
    grphStake
};