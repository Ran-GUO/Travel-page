function readCSVData(path,spl) {
  let data = [];
  fetch(path)
    .then(response => response.text())
    .then(text => {
      let rows = text.split('\n');
      let headers = rows[0].split(spl);
      for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].split(spl);
        if (cells.length === headers.length) {
          let obj = {};
          for (let j = 0; j < cells.length; j++) {
            obj[headers[j].trim()] = cells[j].trim();
          }
          data.push(obj);
        }
      }

      console.log('CSV file successfully processed');
      // You can use 'data' array here for further processing
    })
    .catch(error => console.error('Error:', error));
    return data;
}

var TIMEOUT = 500;

let flightsData = readCSVData('js/data/flightdiary.csv',',');
let cityData = readCSVData('js/data/travelCities.csv',';');
// Use 'data' outside the function (after some delay, since fetch is asynchronous)
setTimeout(() => {
  console.log("Global flights data:", flightsData);
  console.log("Global city data:", cityData);

}, TIMEOUT-200); // Adjust time as needed


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