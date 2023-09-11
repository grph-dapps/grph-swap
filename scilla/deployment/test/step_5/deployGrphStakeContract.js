const {admin} = require('../config');

const tokens = require('../base/tokens');
const {grphStake} = require('../base/contracts');


(async () => {
    await grphStake.deploy(
        admin,
        tokens.grphToken.getContractAddress(),
        tokens.grphToken.getContractAddress(),
        0.02 * (10 ** 8),
        10 ** 8,
        true,
        false
    );
    await grphStake.Init();
    console.log('grph stake contract deployed:', grphStake.getContractAddress());
    await tokens.grphToken.SetMinter(grphStake.getContractAddress());
    console.log('set grph stake contract as minter in grph token contract');
})();