var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3')

//mongodb
const {MongoClient} = require('mongodb');
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
		console.log(counterVal); // fetched movies
		res.end(counterVal)
	  });
    
 });

app.listen(8081);
console.log("server is up");


// async function  connectToMongo() {
// 	try {
// 		// Connect to the MongoDB cluster
// 		var conn = await client.connect();
// 		console.log("connected");

// 		return conn;

// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		await client.close();
// 	}
// }


async function insertValue(incrVal){

	try{
		console.log("insertValue");
		var con = await client.connect();
		
	
		var myobj = { incVal: incrVal};
		
		const result = await con.db("Counter").collection("countercoll").insertOne(myobj);
	
	
	}catch (e) {
	
		console.error(e);
	} finally {	
	}

}

//web3.js code

// ganache url
const web3 = new Web3("http://127.0.0.1:7545")

const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' // Your account address goes here
web3.eth.getBalance(address, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') 
				console.log("balance");
				console.log(balance);
})

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
	
const contAddr = '0x485b511deF0EEF363bC422B4dA5df0B16BADb372' //'0x69ff9805bD7B3EC51dc01Dc94dfcd57390b6Cb06'
const contract = new web3.eth.Contract(abi, contAddr)

async function sendT() {
	
	var inc = await contract.methods.increment().send({from:'0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A'});
	console.log("incremented value is");
	console.log(inc.events["incrEvent"]["returnValues"]["_value"]); //worked
    var incrVal= inc.events["incrEvent"]["returnValues"]["_value"];
    

	if(incrVal == 10) {
		console.log("Calling reset")
		var resetVal = await contract.methods.reset().send({from:'0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A'});
		insertValue(0);
	}
	
    insertValue(incrVal);
    console.log("Send completed");

} //send ends



async function resetVal() {
	if(incrVal == 10) {
		console.log("Calling reset")
		var resetVal = await contract.methods.reset().send({from:'0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A'});
	}

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

