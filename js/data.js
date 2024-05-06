

var TIMEOUT = 500;
var FILTER_YEAR = 0;

let flightsData = readCSVData('js/data/flightdiary.csv',',');
let cityData = readCSVData('js/data/travelCities.csv',',');
// Use 'data' outside the function (after some delay, since fetch is asynchronous)
setTimeout(() => {
  console.log("Global flights data:", flightsData);
  console.log("Global city data:", cityData);

}, TIMEOUT-200); // Adjust time as needed


//extract year from date string format yyyy-mm-dd
function getYearFromDate(date){
  const d = new Date(date);
  let year = d.getFullYear();
  return year;
}

//Filter objects from flight data with year
function flightsDataYearFilter(year){
  let dataset = []; 

  for (let i = 0; i < flightsData.length; i++) {
    const flight = flightsData[i];
    let y = getYearFromDate(flight["Date"]);
    if(year == y || year == 0){
      dataset.push(flight);
    }
  }
  return dataset;
}

//Return all cities visited in a certain year
function cityDataYearFilter(year){
  let dataset = []; 

  for (let i = 0; i < cityData.length; i++) {
    const city = cityData[i];
    var arrivalTime = city["FREQ"];
    var index = ["1st arrival","2nd arrival", "3rd arrival", "4th arrival"];
    for(let j = 0; j < arrivalTime; j++){
      let y = getYearFromDate(city[index[j]]);
      if(year == y || year == 0){
        dataset.push(city);
        break;
      }
    }
  }
  return dataset;
}


// Data
// var cityData = [
//   ['Dalian', [38.9000, 121.6000]],
//   ['Nice', [43.7034, 7.2663]],
//   ['Malaga', [36.6749, -4.49911]],
//   ['Almaty', [43.3521, 77.0405]],
//   ['Ammam', [31.7226, 35.9932]]];



// var flightsData = [[[40.641766, -73.780968], [35.553333, 139.781113]], // JFK-HND
//                   [[33.942496, -118.408048], [-20.889999, 55.516389]], // LAX-RUN
//                   [[-34.822221, -58.535832], [38.967, 121.540]], // EZE-DLC
//                   [[49.009722, 2.547778], [22.308889, 113.914722]], // CDG-HKG
//                   [[-1.319241, 36.927775], [1.359211, 103.989333]]]; // NBO-SIN