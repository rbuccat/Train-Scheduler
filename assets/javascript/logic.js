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

	

// Capture Button Click
$("#addTrain").on("click", function() {

	var trainName = $('#trainnameinput').val().trim();
	var destination = $('#destinationinput').val().trim();
	var firstTrainTime = moment($('#firsttraininput').val().trim(), "hh:mm").format("h:mm a");
	var frequency = $('#frequencyinput').val().trim();

	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency,
		date: firebase.database.ServerValue.TIMESTAMP
	}

	database.ref().push(newTrain);

	console.log(newTrain.trainName);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrainTime);
	console.log(newTrain.frequency);
	console.log(newTrain.date);
	
	// Clears all of the text-boxes
	$("#trainnameinput").val("");
	$("#destinationinput").val("");
	$("#firsttraininput").val("");
	$("#frequencyinput").val("");

	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	// Print the initial data to the console.
		console.log(childSnapshot.val());

		var trainName = childSnapshot.val().trainName;
		var destination = childSnapshot.val().destination;
		var firstTrainTime = childSnapshot.val().firstTrainTime;
		var frequency = childSnapshot.val().frequency;

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"))

	// Change the HTML
		$(".displayedData").append(
			"<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
						 childSnapshot.val().destination + "</td><td>" +
						 childSnapshot.val().frequency + "</td><td>" +
						 moment(nextTrain).format("hh:mm a") + "</td><td>" +
						 tMinutesTillTrain + "</td></tr>");

// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);

});