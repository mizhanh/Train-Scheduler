// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhmDalVnA8S9xY7i7rpcpGwi4Qeu-g4-Y",
    authDomain: "train-scheduler-20cb6.firebaseapp.com",
    databaseURL: "https://train-scheduler-20cb6.firebaseio.com",
    projectId: "train-scheduler-20cb6",
    storageBucket: "train-scheduler-20cb6.appspot.com",
    // messagingSenderId: "354116140481"
  };
  
  firebase.initializeApp(config);

 // Create a variable to reference the database
    var database = firebase.database();

 // // Initial Values
 //    var trainName = "";
 //    var destination = "";
 //    var trainTime = "";
 //    var frequency = 0;

 // Capture Button Click
    $("#submit").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

 		// storing and retrieving the most recent input
 		var trainName = $("#name-input").val().trim();
 		var destination = $("#destination-input").val().trim();
 		var trainTime = $("#time-input").val().trim();
 		var frequency = $("#frequency-input").val().trim();
 		
 		database.ref().set({
 			trainName: trainName,
 			destination: destination,
 			trainTime: trainTime,
 			frequency: frequency
 			});
 		});

    database.ref().on("value", function(snapshot) {
    	console.log(snapshot.val().trainName);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().trainTime);
		console.log(snapshot.val().frequency);	

		$("#train-display").text(snapshot.val().trainName);
		$("#destination-display").text(snapshot.val().destination);
		$("#time-display").text(snapshot.val().trainTime);
		$("#frequency-display").text(snapshot.val().frequency);

    }, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);
    });








