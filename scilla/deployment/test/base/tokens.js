const TokenContract = require("../../../artifacts/ZRC2_Token.scilla");
const GrphContract = require("../../../artifacts/GraphToken.scilla");

const {
    privateKey,
    api,
    net,
    version,
    admin
} = require('../config');


const {
    tokens
} = require('./addresses');

const grphToken = GrphContract({privateKey, api, net, version, contractAddress: tokens.grphAddress});
const carbToken = TokenContract({privateKey, api, net, version, contractAddress: tokens.carbAddress});
const usdToken = TokenContract({privateKey, api, net, version, contractAddress: tokens.usdAddress});
const gzilToken = TokenContract({privateKey, api, net, version, contractAddress: tokens.gzilAddress});
const xcadToken = TokenContract({privateKey, api, net, version, contractAddress: tokens.xcadAddress});
const portToken = TokenContract({privateKey, api, net, version, contractAddress: tokens.portAddress});
const streamToken = TokenContract({privateKey, api, net, version, contractAddress: tokens.portAddress});

module.exports = {
    grphToken,
    carbToken,
    usdToken,
    gzilToken,
    xcadToken,
    portToken,
    streamToken,
};