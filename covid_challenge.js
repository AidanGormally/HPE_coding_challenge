// required when using with nodejs to pull the local txt file 
var fs = require('fs');
var data = fs.readFileSync("People.txt");
var people = JSON.parse(data);

//variables required for storing the names at each location
var galwayAttendees = [];
var corkAttendees = [];
var dublinAttendees = [];

// 3 locations latitude and longitude
var galwayLocation = {
    "latitude":53.298810877564875,
    "longitude": -8.997003657335881
}

var corkLocation = {
    "latitude": 51.89742637092438,
    "longitude": -8.465763459121026
}

var dublinLocation = {
    "latitude": 53.28603418885669,
    "longitude": -6.4444477725802285
}

// main function where most of the calculation is taking place
function whereToAttend() {
    // iterating over people object to see what location each person is attending
    people.forEach(function (person) {
        //galway distance
        var attendeeDistanceGalway = distance(person.Latitude, person.Longitude, galwayLocation.latitude, galwayLocation.longitude);
    
        //cork distance
        var attendeeDistanceCork = distance(person.Latitude, person.Longitude, corkLocation.latitude, corkLocation.longitude);
    
        //dublin distance
        var attendeeDistanceDublin = distance(person.Latitude, person.Longitude, dublinLocation.latitude, dublinLocation.longitude);
    
        //get the minimum value of the 3 locations
        var closestLocation = minimumDistance(attendeeDistanceGalway, attendeeDistanceCork, attendeeDistanceDublin);

        //comparing the location values to see what array the data needs to be stored in
        if (closestLocation === attendeeDistanceGalway){
            galwayAttendees.push(person);
        } 
        else if (closestLocation === attendeeDistanceCork) {
            corkAttendees.push(person);
        }
        else {
            dublinAttendees.push(person);
        }
    });

    //sorting the data by Age
    sortByKey(galwayAttendees, "Age");
    sortByKey(corkAttendees, "Age");
    sortByKey(dublinAttendees, "Age");

    //displaying the values in the console.
    displayLocationInformation("Cork Attendees", corkAttendees);
    displayLocationInformation("Dublin Attendees", dublinAttendees);
    displayLocationInformation("Galway Attendees", galwayAttendees);
}

// displaying the data neatly in the console
function displayLocationInformation (location, listofAttendees) {
    console.log("***************************************");
    console.log("          " + location);
    console.log("***************************************");
    listofAttendees.forEach(function (attendee) {
    console.log("Name:",attendee.Name);
    console.log("Age :",attendee.Age);
    console.log("Latitude  :",attendee.Latitude);
    console.log("Longitude :",attendee.Longitude);
    console.log("--------------------------------------");
    });
    console.log("######################################");
    console.log();
}

// sorting by Age, reverse having oldest first
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
        return ((x > y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// checking the minimum distance value
function minimumDistance(distance1, distance2, distance3) {
    return Math.min(distance1, distance2, distance3);
}

//calculating the distance
function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		return dist;
	}
}

//calling the main function
whereToAttend();
