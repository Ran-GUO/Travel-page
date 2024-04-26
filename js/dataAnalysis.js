
Chart.register(ChartDataLabels);
const BARWIDTH = 15;

setTimeout(() => {
  showChart(FILTER_YEAR);
}, TIMEOUT); 


function showChart(year){
  chart_flights_analysisAirport(year);
  chart_cities_analysisCities(year);
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
        borderWidth: 1,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      },
      {
        label: 'Departure times',
        data: departureTimes,
        borderWidth: 1,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      },
      {
        label: 'Arrival times',
        data: arrivalTimes,
        borderWidth: 1,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      },
    ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x:{
          grid: {
            display: false,
          },
          ticks: {
            // stepSize: 100
          },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'count the number of departures and arrivals at each airport'
        },
        datalabels: {
          color: 'black',
          display: true,
          formatter: Math.round
        },
      },
    }  
  });

  const size = (airportLabels.length > 2? airportLabels.length: 3) * 3 * BARWIDTH;
  const airportsubbox = document.querySelector('.chart_airportsubbox');
  airportsubbox.style.height = size + 'px';
  // console.log(airportsubbox.style.height);

  // Data analysis function
  // count the number of departures and arrivals at each airport
  function flights_analysisAirport(year){
    // format: {["NCE" : [total time, departure time, arrival time]],...};
    let dataset = {}; 
    let flights = flightsDataYearFilter(year);

    for (let i = 0; i < flights.length; i++) {
      const flight = flights[i];
 
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


//Draw chart to count the number of arrivals at each city
function chart_cities_analysisCities(year){
  const ctx = document.getElementById('cities_analysisCities');
  let {cityLabels,arrivalTimes} = cities_analysisCities(year);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cityLabels,
      datasets: [
      {
        label: 'Arrival times',
        data: arrivalTimes,
        borderWidth: 1,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
      },
    ]
    },
    options: {
      indexAxis: 'x',
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          }
        },
        x:{
          grid: {
            display: false,
          },
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'count the number of arrivals at each city'
        },
        datalabels: {
          color: 'black',
          display: true,
          formatter: Math.round
        },
      },
    }
  });

  const size = (cityLabels.length > 2? cityLabels.length: 3) * 5 * BARWIDTH;
  const citysubbox = document.querySelector('.chart_citysubbox');
  citysubbox.style.width = size + 'px';
  citysubbox.style.height = '500px';
  // console.log(citysubbox.style.height);


  // Data analysis function
  // count the number of arrivals at each city
  function cities_analysisCities(year){
    // format: {["Nice" : 4 };
    let dataset = {}; 
    let cities = cityDataYearFilter(year);

    var index = ["1st arrival","2nd arrival", "3rd arrival", "4th arrival"];
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      var arrivalTime = city["FREQ"];
      const cityName = city["city"];
      dataset[cityName] = 0;
      for(let j = 0; j < arrivalTime; j++){
        let y = getYearFromDate(city[index[j]]);
        if(year == y || year == 0){
            dataset[cityName] += 1;
        }
      }
    }
    // Convert the object to an array of key-value pairs
    let dataArray = Object.entries(dataset);
    // Sort the array based on the first value of each pair
    dataArray.sort((a, b) => b[1] - a[1]);
    // Convert the sorted array back to an object
    let sortedDataset = Object.fromEntries(dataArray);

    let cityLabels =  Object.keys(sortedDataset);
    let arrivalTimes = Object.values(sortedDataset);

    return {cityLabels, arrivalTimes};

  }
}