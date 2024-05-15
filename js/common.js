// Used by both index.html and cities
/*
const cities = 
[
	{"name": "France Èze",			"web": "eze"},
	{"name": "France Nice", 		"web": "nice"},
	{"name": "Monaco Monte Carlo", 	"web": "monaco"},
	{"name": "Portugal Lisbon",		"web": "lisbon"},
	{"name": "Spanish Barcelona",	"web": "barcelona"},

// "barcelona","èze","lisbon", "monaco", "nice"
];*/

const cities = 
[
  {"country": "France",
   "city":
   [{"name": "Èze",			"web": "eze"},
    {"name": "Nice", 		"web": "nice"},
   ]
  },
  {"country": "Monaco",
   "city":
   [{"name": "Monte Carlo",			"web": "monaco"},
   ]
  },
  {"country": "Portugal",
   "city":
   [{"name": "Lisbon",		"web": "lisbon"},
   ]
  },
  {"country": "Spanish",
  "city":
  [{"name": "Barcelona",	"web": "barcelona"},
  ]
  },
];

//extract year from date string format yyyy-mm-dd
function getYearFromDate(date){
  const d = new Date(date);
  let year = d.getFullYear();
  return year;
}

function addCityPages(base_path,str){
  str = str + "<li class=\"dropdown-divider \"></li>";

  for(let i = 0; i < cities.length; i++){
    str = str + "<li class=\"dropdown-divider \"></li>";
    str = str + "<li class=\"dropdown-header \">" + cities[i]["country"] + "</li>";
    for(let j = 0; j < cities[i]["city"].length; j++){
    str = str + "<li><a class=\"dropdown-item\" href=\"" + base_path + cities[i]["city"][j]["web"] + ".html\">" + cities[i]["city"][j]["name"] + "</a></li>";
    }
  }
  let element=document.getElementById("city_sites");
  element.innerHTML = str;
}


function getCityData(cityName){
  let city; 

  for (let i = 0; i < cityData.length; i++) {
    if(cityData[i]["city"] == cityName){
      city = cityData[i];
      break;
    }
  }
  return city;
}


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

