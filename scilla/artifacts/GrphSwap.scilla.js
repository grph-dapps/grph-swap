const {Zilliqa} = require("@zilliqa-js/zilliqa");
const {readFileSync} = require("fs");
const {units, Long, BN} = require("@zilliqa-js/util");  
const {resolve} = require("path");          
function contract({privateKey, api, version, net, contractAddress}) {
  let zilliqa = new Zilliqa(api);
  zilliqa.wallet.addByPrivateKey(privateKey);
  const code = readFileSync(resolve(process.cwd(), "scilla/contracts", "GrphSwap.scilla"), "utf8");
  let initParams = [{"vname":"initial_owner","type":"ByStr20"},{"vname":"initial_fee","type":"Uint256"},{"vname":"grph_address","type":"ByStr20"}];
  let myAddress = contractAddress;
  return {
    init({privateKey, address}) {
      myAddress = address;
      if(privateKey) {
          zilliqa = new Zilliqa(api);
          zilliqa.wallet.addByPrivateKey(privateKey);
      }
    },
    replacePrivateKey(privateKey) {
         zilliqa = new Zilliqa(api);
         zilliqa.wallet.addByPrivateKey(privateKey);
    },
    getContractAddress() {
        return myAddress;
    },
    async deploy(initial_owner, initial_fee, grph_address, gasLimit = 60000) {
        const args = arguments;
        initParams = initParams.filter(({vname}) => vname !== "_scilla_version").map((param, index) => {
            param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        initParams.push({
            vname: '_scilla_version',
            type: 'Uint32',
            value: '0',
        });
        const zilliqaContract = zilliqa.contracts.new(code, initParams);
        const [deployTx, deployedContract] = await zilliqaContract.deployWithoutConfirm({
            version,
            gasPrice: units.toQa('3500', units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        }, net === "Main");
        const confirmedTxn = await deployTx.confirm(deployTx.id);
        if (confirmedTxn.receipt.success === true) {
            myAddress = "0x" + deployedContract.address;
            return this;
        } else {
            throw new Error("something went wrong by contract deployment with txId: 0x" + deployTx.id);
        }
    },
    async SetProxyContract(proxy, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"proxy","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SetAdmin(account, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"account","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async Pause(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async Unpause(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async AddToWhitelistRemoveLiquidity(account, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"account","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RemoveWhitelistRemoveLiquidity(account, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"account","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SetMinGrph(amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RecipientAcceptTransfer(sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RecipientAcceptTransferFrom(initiator, sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"initiator","type":"ByStr20"},{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async WithdrawGrph(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async TransferOwnership(new_owner, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"new_owner","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async AcceptPendingOwnership(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SetFee(new_fee, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"new_fee","type":"Uint256"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SetTokenToWhiteList(token, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"token","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async BurnSwapFees(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async AddLiquidity(grph_amount, token_address, min_contribution_amount, max_token_amount, deadline_block, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"grph_amount","type":"Uint128"},{"vname":"token_address","type":"ByStr20"},{"vname":"min_contribution_amount","type":"Uint128"},{"vname":"max_token_amount","type":"Uint128"},{"vname":"deadline_block","type":"BNum"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RemoveLiquidity(token_address, contribution_amount, min_grph_amount, min_token_amount, deadline_block, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"token_address","type":"ByStr20"},{"vname":"contribution_amount","type":"Uint128"},{"vname":"min_grph_amount","type":"Uint128"},{"vname":"min_token_amount","type":"Uint128"},{"vname":"deadline_block","type":"BNum"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SwapExactGrphForTokens(amount, token_address, min_token_amount, deadline_block, recipient_address, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"amount","type":"Uint128"},{"vname":"token_address","type":"ByStr20"},{"vname":"min_token_amount","type":"Uint128"},{"vname":"deadline_block","type":"BNum"},{"vname":"recipient_address","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SwapExactTokensForGrph(token_address, token_amount, min_grph_amount, deadline_block, recipient_address, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"token_address","type":"ByStr20"},{"vname":"token_amount","type":"Uint128"},{"vname":"min_grph_amount","type":"Uint128"},{"vname":"deadline_block","type":"BNum"},{"vname":"recipient_address","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async SwapExactTokensForTokens(token0_address, token1_address, token0_amount, min_token1_amount, deadline_block, recipient_address, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"token0_address","type":"ByStr20"},{"vname":"token1_address","type":"ByStr20"},{"vname":"token0_amount","type":"Uint128"},{"vname":"min_token1_amount","type":"Uint128"},{"vname":"deadline_block","type":"BNum"},{"vname":"recipient_address","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async TransferFromSuccessCallBack(initiator, sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"initiator","type":"ByStr20"},{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async TransferSuccessCallBack(sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },
    events: {"Burnt":{"name":"Burnt","params":[{"name":"pool","type":"ByStr20"},{"name":"address","type":"ByStr20"},{"name":"amount","type":"b1c28d20-33e7-4d22-a97f-97c1ccbf7e2c.Coins"},{"name":"grph_amount","type":"Uint128"},{"name":"total_contributions","type":"Uint128"}]},"FeeSet":{"name":"FeeSet","params":[{"name":"fee","type":"Uint256"}]},"OwnershipTransferred":{"name":"OwnershipTransferred","params":[{"name":"owner","type":"ByStr20"}]},"AddGrphForFees":{"name":"AddGrphForFees","params":[{"name":"amount","type":"Uint128"},{"name":"account","type":"ByStr20"}]},"Mint":{"name":"Mint","params":[{"name":"pool","type":"ByStr20"},{"name":"address","type":"ByStr20"},{"name":"amount","type":"Uint128"},{"name":"grph_amount","type":"Uint128"},{"name":"total_contribution","type":"Uint128"}]},"Swapped":{"name":"Swapped","params":[{"name":"pool","type":"ByStr20"},{"name":"address","type":"ByStr20"},{"name":"input","type":"b1c28d20-33e7-4d22-a97f-97c1ccbf7e2c.Coins"},{"name":"output","type":"b1c28d20-33e7-4d22-a97f-97c1ccbf7e2c.Coins"}]}},
    fields: {"pools":{"pools":"pools","Map (ByStr20) (b1c28d20-33e7-4d22-a97f-97c1ccbf7e2c.Pool)":"Map (ByStr20) (b1c28d20-33e7-4d22-a97f-97c1ccbf7e2c.Pool)"},"balances":{"balances":"balances","Map (ByStr20) (Map (ByStr20) (Uint128))":"Map (ByStr20) (Map (ByStr20) (Uint128))"},"total_contributions":{"total_contributions":"total_contributions","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"min_grph":{"min_grph":"min_grph","Uint128":"Uint128"},"output_after_fee":{"output_after_fee":"output_after_fee","Uint256":"Uint256"},"stake_proxy":{"stake_proxy":"stake_proxy","ByStr20":"ByStr20"},"grph_balances":{"grph_balances":"grph_balances","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"owner":{"owner":"owner","ByStr20":"ByStr20"},"pending_owner":{"pending_owner":"pending_owner","ByStr20":"ByStr20"},"admin":{"admin":"admin","ByStr20":"ByStr20"},"can_remove_liquidity":{"can_remove_liquidity":"can_remove_liquidity","Map (ByStr20) (Bool)":"Map (ByStr20) (Bool)"},"whitelisted_token":{"whitelisted_token":"whitelisted_token","Map (ByStr20) (Bool)":"Map (ByStr20) (Bool)"},"blacklist_token":{"blacklist_token":"blacklist_token","Map (ByStr20) (Bool)":"Map (ByStr20) (Bool)"},"zil_address":{"zil_address":"zil_address","ByStr20":"ByStr20"},"is_paused":{"is_paused":"is_paused","Bool":"Bool"},"total_input":{"total_input":"total_input","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"total_output":{"total_output":"total_output","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"total_fees_used":{"total_fees_used":"total_fees_used","Map (ByStr20) (Map (ByStr20) (Uint128))":"Map (ByStr20) (Map (ByStr20) (Uint128))"},"swap_fees_balance":{"swap_fees_balance":"swap_fees_balance","Uint128":"Uint128"},"total_burnt_fees":{"total_burnt_fees":"total_burnt_fees","Uint128":"Uint128"}}
  };  
};

module.exports = contract;