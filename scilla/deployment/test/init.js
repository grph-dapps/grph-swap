const {admin} = require("./config");
const {tokens} = require("./base/addresses");

module.exports = {
    swapContract: {
        initial_owner: admin,
        initial_fee: '25',
        grph_address: tokens.grphAddress,
    },
    poolStakeProxyContract: {
        contract_owner: admin,
        grph_swap: '',
    },
    poolStakeContract: {
        contract_owner: admin,
        proxy: '',
        reward_token: '',
        token_multiplier: '',
        is_mint: true,
        is_zil: false
    }
}