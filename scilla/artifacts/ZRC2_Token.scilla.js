const {Zilliqa} = require("@zilliqa-js/zilliqa");
const {readFileSync} = require("fs");
const {units, Long, BN} = require("@zilliqa-js/util");  
const {resolve} = require("path");          
function contract({privateKey, api, version, net, contractAddress}) {
  let zilliqa = new Zilliqa(api);
  zilliqa.wallet.addByPrivateKey(privateKey);
  const code = readFileSync(resolve(process.cwd(), "scilla/contracts", "ZRC2_Token.scilla"), "utf8");
  let initParams = [{"vname":"contract_owner","type":"ByStr20"},{"vname":"name","type":"String"},{"vname":"symbol","type":"String"},{"vname":"decimals","type":"Uint32"},{"vname":"init_supply","type":"Uint128"}];
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
    async deploy(contract_owner, name, symbol, decimals, init_supply, gasLimit = 60000) {
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
    async IncreaseAllowance(spender, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"spender","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
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
    },async DecreaseAllowance(spender, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"spender","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
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
    },async Transfer(to, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"to","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
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
    },async TransferFrom(from, to, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"from","type":"ByStr20"},{"vname":"to","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
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
    events: {"TransferFromSuccess":{"name":"TransferFromSuccess","params":[{"name":"initiator","type":"ByStr20"},{"name":"sender","type":"ByStr20"},{"name":"recipient","type":"ByStr20"},{"name":"amount","type":"Uint128"}]},"TransferSuccess":{"name":"TransferSuccess","params":[{"name":"sender","type":"ByStr20"},{"name":"recipient","type":"ByStr20"},{"name":"amount","type":"Uint128"}]},"DecreasedAllowance":{"name":"DecreasedAllowance","params":[{"name":"token_owner","type":"ByStr20"},{"name":"spender","type":"ByStr20"},{"name":"new_allowance","type":"Uint128"}]},"IncreasedAllowance":{"name":"IncreasedAllowance","params":[{"name":"token_owner","type":"ByStr20"},{"name":"spender","type":"ByStr20"},{"name":"new_allowance","type":"Uint128"}]}},
    fields: {"total_supply":{"total_supply":"total_supply","Uint128":"Uint128"},"balances":{"balances":"balances","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"allowances":{"allowances":"allowances","Map (ByStr20) (Map (ByStr20) (Uint128))":"Map (ByStr20) (Map (ByStr20) (Uint128))"}}
  };  
};

module.exports = contract;