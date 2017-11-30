// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhmDalVnA8S9xY7i7rpcpGwi4Qeu-g4-Y",
    authDomain: "train-scheduler-20cb6.firebaseapp.com",
    databaseURL: "https://train-scheduler-20cb6.firebaseio.com",
    projectId: "train-scheduler-20cb6",
    storageBucket: "train-scheduler-20cb6.appspot.com",
    messagingSenderId: "354116140481"
  };
  
  firebase.initializeApp(config);

 	// Create a variable to reference the database
    var database = firebase.database();
    
    $("#add-train").on("click", function() {
   
      event.preventDefault();

 		  // storing user's input
 		  var trainName = $("#train-name-input").val().trim();
 		  var destination = $("#destination-input").val().trim();
 		  var firstTrainTime = $("#time-input").val().trim();
 		  var frequency = $("#frequency-input").val().trim();

      //Upload data to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency });

      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

      //Empty out form
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("")
       
      })

    //Create Firebase event for adding new train to the database and a row in the html when a new train is added
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      
      console.log(childSnapshot.val());

      var cs = childSnapshot.val();

      var trainName = cs.trainName;
      var destination = cs.destination;
      var frequency = cs.frequency;

      console.log(trainName);
      console.log(destination);
      console.log(frequency);

      var firstTrainTime = moment(cs.firstTrainTime, "HH:mm").subtract(1, "years");
      var minAway = frequency - (moment().diff(moment(firstTrainTime), "minutes") % frequency);
      var nextArrival = (moment(moment().add(minAway, "minutes")).format("HH:mm"));
      
      $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");	  


    }, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);
    });