var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3')
//for the alert box
var alert = require('alert')
//mongodb
const {MongoClient} = require('mongodb');
//connection string for the mongoDB
const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const client = new MongoClient(uri);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/increment', function(req, res){
   
	sendT();
	res.send("incrementing value");
	
 });


 app.get('/curValue', function(req, res){

	var curVal = currentVal();
	curVal.then(counterVal => {
		console.log(counterVal); 
		res.end(counterVal)
	  });
    
 });

 app.post('/resetValue', function(req, res){

	var resVal = resetVal();
	resVal.then(reset => {
		console.log("value has been reset.");
		res.end("value has been reset")
	  });
    
 });

app.listen(8081);
console.log("server is up");


async function insertValue(incrVal, taskType){

	try{
		var con = await client.connect();
		var today = new Date();
		var time = today.getFullYear() + "-" + today.getMonth()+1 + "-" + today.getDate() + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		
		if(taskType == "increment") {
			console.log("increment Value");
			var myobj = { incVal: incrVal, timestamp: time, comment:"Incremented value"};
			let result = await con.db("Counter").collection("countercoll").insertOne(myobj);
		
		} else if(taskType == "reset") {
			var myobj = { incVal: incrVal, timestamp: time, comment:"Value has been reset to zero."};
			let result = await con.db("Counter").collection("countercoll").insertOne(myobj);
		}

	}catch (e) {
	
		console.error(e);
	} finally {	
	}

}

//web3.js code

// ganache url
const web3 = new Web3("http://127.0.0.1:7545")

const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
// web3.eth.getBalance(address, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') 
// 				console.log("balance");
// 				console.log(balance);
// })

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "incrEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fetchCurrentValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fetchCurrentValue2121",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fetchCurrentValue212sd1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reset",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
	
const contAddr = '0xc717092d19E7B4D7035809216f57837bb7ED38b3' //'0x69ff9805bD7B3EC51dc01Dc94dfcd57390b6Cb06'
const contract = new web3.eth.Contract(abi, contAddr)

async function sendT() {
	
	var inc = await contract.methods.increment().send({from:address});
	console.log("incremented value is");
	console.log(inc.events["incrEvent"]["returnValues"]["_value"]); //worked
    var incrVal= inc.events["incrEvent"]["returnValues"]["_value"];


	if(incrVal == 10) {
		//as the new value is 10 , so will be reset to 0 but this new value will be saved in Db too
		insertValue(incrVal, "increment");
	
		alert("incrVal's  previous value was 9 so, new value is " + incrVal+ " .Reseting the value to 0")
		console.log("Calling reset")
		var resetVal = await contract.methods.reset().send({from:address});
		//reseting the value and logging it to the DB.
		insertValue(0,"reset");
	}else {
		//logging the new incremented value to the DB.
		insertValue(incrVal, "increment");
		console.log("Send completed");
	}
	

} //send ends



async function resetVal() {

		console.log("Calling reset")
		var resetVal = await contract.methods.reset().send({from:address});

} 

async function currentVal() {
		console.log("Calling reset")
		var val=0;
		await contract.methods.fetchCurrentValue().call(  //working
				(err, result) => {
				console.log("current value ")
				console.log(result)
				val = result;
				}
			)
		return val;
} 

