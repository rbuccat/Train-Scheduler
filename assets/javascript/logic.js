  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyALGR9eV1Lw5rxkKcpdPrFnGaAf55qonHA",
    authDomain: "train-scheduler-a1bec.firebaseapp.com",
    databaseURL: "https://train-scheduler-a1bec.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "981353764809"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
	var database = firebase.database();

	// Initial Values
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = "";

// Capture Button Click
$("#addTrain").on("click", function() {

	trainName = $('#trainnameinput').val().trim();
	destination = $('#destinationinput').val().trim();
	firstTrainTime = $('#firsttraininput').val().trim();
	frequency = $('#frequencyinput').val().trim();

	database.ref().set({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	});

	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

	// Print the initial data to the console.
		console.log(snapshot.val());

		console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrainTime);
		console.log(snapshot.val().frequency);

	// Change the HTML
		$(".displayedData").html(
			"<tr><td>" + snapshot.val().trainName + "</td><td>" +
						 snapshot.val().destination + "</td><td>" +
						 snapshot.val().firstTrainTime + "</td><td>" +
						 snapshot.val().frequency + "</td></tr>");

// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);

});