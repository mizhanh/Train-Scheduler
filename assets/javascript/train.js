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
    
    $("#submit").on("click", function() {
   
      event.preventDefault();

 		   // storing and retrieving the most recent input
 		   var trainName = $("#name-input").val().trim();
 		   var destination = $("#destination-input").val().trim();
 		   var firstTrainTime = $("#time-input").val().trim();
 		   var frequency = $("#frequency-input").val().trim();
 		
 		   if (trainName != "" &&
          destination != "" &&
          firstTrainTime != "" &&
          frequency != "") {

          database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency });

        inputRefresh();

        } else {
            return false;
        }
        return false;
      })

    function inputRefresh (t) {
      setTimeout("location.reload(true);", t)
    }

    database.ref().on("child_added", function(snapshot) {

      var $trainList = $("#trainList");
      var $trainListRow = $("<tr>");
      var $trainName = $("<td>").html(snapshot.val().trainName).appendTo($trainListRow);
      var $destination = $("<td>").html(snapshot.val().destination).appendTo($trainListRow);
      var $frequency = $("<td>").html(snapshot.val().frequency).appendTo($trainListRow);

      var frequency = snapshot.val().frequency;
      var firstTrainTime = moment(snapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
      var minAway = frequency - (moment().diff(moment(firstTrainTime), "minutes") % frequency);
      var nextArrival = $("<td>").html(moment(moment().add(minAway, "minutes")).format("HH:mm")).appendTo($trainListRow);
      var waitTime = $("<td>").html(minAway).appendTo($trainListRow);

      $trainListRow.appendTo($trainList);	  


    }, function(errorObject) {
    	console.log("Errors handled: " + errorObject.code);
    });