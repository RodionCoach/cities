class CityMap {
  constructor(str) {
    this.citiesData = [];
    let parsedJSON = this.isJSON(str);
    /* parsedJSON = this.trimLast(parsedJSON); */
    if (parsedJSON) {
      for (let key in parsedJSON) {
        this.citiesData.push(parsedJSON[key])
      }
    } else {
      this.list = str.split(';');
      this.citiesData = this.trimLast(this.list);
      this.citiesData.forEach((el, i, arr) => {
        let strData = el.split(', ');
        strData[0] = strData[0].slice(1);
        strData[1] = strData[1].slice(0, -1);
        arr[i] = {
          city: strData[0],
          region: strData[1],
          latitude: strData[2],
          longitude: strData[3],
          closeDistance: null
        }
      });
    }
  }
  isJSON(str) {
    try {
      let fromJSON = JSON.parse(str);
      let toJSON = JSON.stringify(fromJSON);
      if (typeof (str) == 'string')
        if (str.length == 0) {
          return false;
        }
      return fromJSON;
    }
    catch (e) {
      return false;
    }
  }
  trimLast(arr) {
    if (arr[arr.length - 1] === "") {
      arr.length = arr.length - 1;
      return arr;
    }
    return arr;
  }
  add(list = '') {
    if (!list) return console.log('Empty string');
    let addObj = {
      city: null,
      region: null,
      latitude: null,
      longitude: null,
      closeDistance: null
    };
    let arrOfList = list.split(', ');
    [addObj.city, addObj.region, addObj.latitude, addObj.longitude] = [...arrOfList];
    for (let key in addObj) {
      addObj[key] = addObj[key] || null;
    }
    this.citiesData.push(addObj);
  }
  toLocalStorage(data) {
    localStorage.setItem('storageData', JSON.stringify({ ...data }));
  }
  extremeCitys() {
    let sortList = [...this.citiesData];
    let obj = {
      northernmost: null,
      southernmost: null,
      westernmost: null,
      easternmost: null
    };
    sortList = sortList.sort((a, b) => a.latitude - b.latitude);
    obj.northernmost = sortList[sortList.length - 1].city;
    obj.southernmost = sortList[0].city;
    sortList = sortList.sort((a, b) => a.longitude - b.longitude);
    obj.westernmost = sortList[sortList.length - 1].city;
    obj.easternmost = sortList[0].city;
    return obj;
  }
  closeLocation(latitude, longitude) {
    latitude = +parseFloat(latitude).toFixed(2);
    longitude = +parseFloat(longitude).toFixed(2);
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      return 'Bad coordinates';
    } else
      if (typeof latitude === 'number' && typeof longitude === 'number') {
        return this.citiesData.map((el) => {
          el.closeDistance = (Math.sqrt(Math.pow(el.latitude - latitude, 2) + Math.pow(el.longitude - longitude, 2))).toFixed(2);
          return el;
        }).sort((a, b) => a.closeDistance - b.closeDistance)[0].city;
      } else {
        return 'Bad format';
      }
  }
  abbreviations() {
    return Array.from(new Set(this.citiesData.map((el) = s > el.region))).join(', ');
  }
}

/* export default CityMap; */
/* let obj = new CityMap('"Nashville, TN", 36.17, -86.78;"New York, NY", 40.71, -74.00;"Atlanta, GA", 33.75, -84.39;"Denver, CO", 39.74, -104.98;"Seattle, WA", 47.61, -122.33;"Los Angeles, CA", 34.05, -118.24;"Memphis, TN", 35.15, -90.05;');

console.log(obj.extremeCitys(), obj.closeLocation(0, 0), obj.abbreviations()); */