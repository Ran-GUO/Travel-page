// Used by both index.html and cities

const cities = ["barcelona","èze","lisbon", "monaco", "nice"];


function addCityPages(base_path,str){
  for(let i = 0; i < cities.length; i++){
    str = str + "<li><a class=\"dropdown-item\" href=\"" + base_path + cities[i] + ".html\">" + cities[i] + "</a></li>";
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
