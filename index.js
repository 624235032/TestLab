var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


//Firebase Real Time
var firebase = require("firebase-admin");
var serviceAccount = require("./firebase_key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://bookshop-cfb81-default-rtdb.asia-southeast1.firebasedatabase.app"
});

var db = firebase.database();

var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/books',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("books");

	//Attach an asynchronous callback to read the data
	booksReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
				});


});



app.post('/rectandgle',  function (req, res){
	res.setHeader('Content-Type', 'application/json');

	var side1 = req.body.side1;
	var side2 = req.body.side2;



	res.send('{ "result": ' + (side1*side2) + '}');


});




app.post('/circle',  function (req, res){
	res.setHeader('Content-Type', 'application/json');

	var radius = req.body.radius;
	



	res.send('{ "result": ' + (3.14*radius*radius) + '}');


});



app.post('/student', function (req, res) {
	var students = Number(req.body.students);
	var studentId = req.body.studentId;
	var studentName = req.body.studentName;

	var referencePath = '/students/' + students + '/';
	var studentsReference = db.ref(referencePath);


	if (studentsReference != null) {

		studentsReference.update({ studentId:studentId, studentName:studentName },
			function (error) {
				if (error) {
					res.send("Data could not be saved." + error)
				}
				else {
					res.send("Success!!");
				}

			}

		);
	}

});













app.get('/students',  function (req, res)  {  

	res.setHeader('Content-Type', 'application/json');

	var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
				});
  
});


app.get('/topsellers',  function (req, res)  {  

		res.setHeader('Content-Type', 'application/json');

		var booksReference = db.ref("topsellers");
	
		//Attach an asynchronous callback to read the data
		booksReference.on("value", 
					function(snapshot) {					
						res.json(snapshot.val());
						booksReference.off("value");
						}, 
					function (errorObject) {
						res.send("The read failed: " + errorObject.code);
					});
  
});

// abb



app.get('/student/:studentId',  function (req, res)  {  
  	
		//Code Here
		res.setHeader('Content-Type', 'application/json');
		var studentId = req.params.studentId;

		var booksReference = db.ref("students");

	//Attach an asynchronous callback to read the data
	booksReference.orderByChild("studentId").equalTo(studentId).on("child_added",
				function(snapshot) {					
					res.json(snapshot.val());
					booksReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
				});


});





app.get('/lastorderid',  function (req, res)  {  
  	
	res.setHeader('Content-Type', 'application/json');

	var ordersReference = db.ref("lastOrderId");

	ordersReference.on("value", 
				function(snapshot) {					
					res.json(snapshot.val());
					ordersReference.off("value");
					}, 
				function (errorObject) {
					res.send("The read failed: " + errorObject.code);
			});

});


app.put('/lastorderid',  function (req, res)  {  
	
	//Code Here


});




app.post('/order',  function (req, res)  {  

	//Code Here

});


app.listen(port, function () {
    console.log("Server is up and running...");

});


app.delete('/student/:students', function (req, res){
	
	var students = req.params.students;

	var referencePath = '/students/' + students + '/';
	var studentsReference = db.ref(referencePath);
	if (studentsReference != null){
		studentsReference.remove()
		res.send("Succrss!!")
	}
	if (error) throw error;

});






