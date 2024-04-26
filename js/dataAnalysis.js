setTimeout(() => {
  chart_flights_analysisAirport(0);

}, TIMEOUT); 


//extract year from date string format yyyy-mm-dd
function getYearFromDate(date){
  const d = new Date(date);
  let year = d.getFullYear();
  return year;
}


//Draw chart to count the number of departures and arrivals at each airport
function chart_flights_analysisAirport(year){
  const ctx = document.getElementById('flights_analysisAirport');
  let {airportLabels, totalTimes, departureTimes, arrivalTimes} = flights_analysisAirport(year);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: airportLabels,
      datasets: [
      {
        label: 'Total times',
        data: totalTimes,
        borderWidth: 1
      },
      {
        label: 'Departure times',
        data: departureTimes,
        borderWidth: 1
      },
      {
        label: 'Arrival times',
        data: arrivalTimes,
        borderWidth: 1
      },
    ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }  
    
  });


  //Data analysis function
  function flights_analysisAirport(year){
    // format: {["NCE" : [total time, departure time, arrival time]],...};
    let dataset = {}; 

    for (let i = 0; i < flightsData.length; i++) {
      const flight = flightsData[i];
      let y = getYearFromDate(flight["Date"]);
      if(year == y || year == 0){
        let airportName = [flight["Iata_from"],flight["Iata_to"]];
        //From
        if(airportName[0] in dataset){
          dataset[airportName[0]][0] += 1;
          dataset[airportName[0]][1] += 1;
        }
        else{
          dataset[airportName[0]] = [1,1,0];
        }
        //To
        if(airportName[1] in dataset){
          dataset[airportName[1]][0] += 1;
          dataset[airportName[1]][2] += 1;
        }
        else{
          dataset[airportName[1]] = [1,0,1];
        }

      }
    }
    // Convert the object to an array of key-value pairs
    let dataArray = Object.entries(dataset);
    // Sort the array based on the first value of each pair
    dataArray.sort((a, b) => b[1][0] - a[1][0]);
    // Convert the sorted array back to an object
    let sortedDataset = Object.fromEntries(dataArray);

    let airportLabels =  Object.keys(sortedDataset);
    let values = Object.values(sortedDataset);
    let totalTimes=[];
    let departureTimes=[];
    let arrivalTimes=[];

    for (let i = 0; i < values.length; i++) {
      totalTimes.push(values[i][0]);
      departureTimes.push(values[i][1]);
      arrivalTimes.push(values[i][2]);
    }

    return {airportLabels, totalTimes, departureTimes, arrivalTimes};

  }
}