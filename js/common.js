// Used by both index.html and cities

const cityNameReplacement = [
  ["Las Palmas", "Gran Canaria"], 
  ["Santa Cruz", "Tenerife"],
];

var cities = 
[
  {"country": "Czech Republic",
  "city": ["Prague",]
  },
  {"country": "France",
   "city": ["Èze", "Nice",]
  },
  {"country": "Monaco",
   "city": ["Monaco",]
  },
  {"country": "Portugal",
   "city": ["Lisbon",]
  },
  {"country": "Spanish",
  "city": ["Barcelona",	"Gran Canaria",	"Tenerife",]
  },
];


function normalizeCityName(cityName){
  // 规则1：获取（空格及括号）前面的部分
  var match = cityName.match(/^[^()]+?(?=\s*\()/) || cityName.match(/^[^()]+/);
  var normalizedName;
  if (match) {
    normalizedName = match[0].trim();
  } else {
    // 如果没有匹配到有效的部分，则返回空字符串
    normalizedName = cityName;
  }

  // 规则2：城市名替换cityNameReplacement
  for(let i = 0; i < cityNameReplacement.length; i++){
    if (normalizedName == cityNameReplacement[i][0]){
      normalizedName = cityNameReplacement[i][1];
    }
  }
  return normalizedName;
}


function getWebName(cityName) {
  // 规则1：将城市名转换为小写
  let normalized = cityName.toLowerCase();

  // 规则2：将空格替换为 "-"
  normalized = normalized.replace(/\s+/g, '-');

  // 规则3：替换特殊字符
  const specialCharsMap = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
    'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i',
    'î': 'i', 'ï': 'i', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
    'ö': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y',
    'ÿ': 'y', 'ß': 'ss', 'þ': 'th', 'ð': 'd', 'œ': 'oe', 'š': 's', 'ž': 'z',
    'Å': 'A', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ä': 'a', 'ö': 'o', 'ü': 'u',
    'Æ': 'AE', 'Ø': 'O', 'å': 'a', 'æ': 'ae', 'ø': 'o'
  };

  normalized = normalized.replace(/[^\w-]/g, function(char) {
    return specialCharsMap[char] || char;
  });

  return normalized;
}

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
    str = str + "<li><a class=\"dropdown-item\" href=\"" + base_path + getWebName(cities[i]["city"][j]) + ".html\">" + cities[i]["city"][j] + "</a></li>";
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

