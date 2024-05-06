// Javascript for cities pages
    
var TIMEOUT = 500;
let cityData = readCSVData('../js/data/travelCities.csv',',');
addCityPages("");
fix_footer();


// fixed footer
function fix_footer(){
  var siteFooter = document.getElementById('site-footer');
  if ((siteFooter.offsetTop + siteFooter.offsetHeight) < window.innerHeight) {
      siteFooter.classList.add('fixed-bottom', 'bottom-0', 'left-0', 'w-full');
  }
}

function printCityToString(city){
    let str = "";

    var arrivalTime = city["FREQ"];
    var index = [["1st arrival", "1st arrival transport"],["2nd arrival", "2nd arrival transport"], 
                  ["3rd arrival", "3rd arrival transport"],["4th arrival", "4th arrival transport"]];
    for(let j = 0; j < arrivalTime; j++){
      str = str + "["+ city[index[j][0]] + "] Arrived by  " + getTransportName(city[index[j][1]]) + ".<br>";
    }
    return str;

    function getTransportName(name){
      let str="";
      if (name == "F"){
        str = "flight";
        let element=document.getElementById("transport_flight");
        element.style.display = "block";
      }
      else if(name == "B"){
        str = "bus";
        let element=document.getElementById("transport_bus");
        element.style.display = "block";
      }
      else if(name == "T"){
        str = "train";
        let element=document.getElementById("transport_train");
        element.style.display = "block";
      }
      else if(name == "A"){
        str = "airport";
      }
      else if(name == "W"){
        str = "walking";
      }
      else{
        str = "others";
      }
      return str;
    }
}

function printCityOnHtml(idName,cityName){
  setTimeout(() => {
    let element=document.getElementById(idName);
    element.innerHTML = printCityToString(getCityData(cityName));
  }, TIMEOUT);
}


// function readCSVData(path,spl) {
  // let data = [];
  // fetch(path)
    // .then(response => response.text())
    // .then(text => {
      // let rows = text.split('\n');
      // let headers = rows[0].split(spl);
      // for (let i = 1; i < rows.length; i++) {
        // let cells = rows[i].split(spl);
        // if (cells.length === headers.length) {
          // let obj = {};
          // for (let j = 0; j < cells.length; j++) {
            // obj[headers[j].trim()] = cells[j].trim();
          // }
          // data.push(obj);
        // }
      // }

      // console.log('CSV file successfully processed');
      // // You can use 'data' array here for further processing
    // })
    // .catch(error => console.error('Error:', error));
    // return data;
// }