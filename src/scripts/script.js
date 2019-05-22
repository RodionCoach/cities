/* import {CityMap} from './test_CitiesList_Kochetkov' */
(function () {
  let defaultData = '"Nashville, TN", 36.17, -86.78;"New York, NY", 40.71, -74.00;"Atlanta, GA", 33.75, -84.39;"Denver, CO", 39.74, -104.98;"Seattle, WA", 47.61, -122.33;"Los Angeles, CA", 34.05, -118.24;"Memphis, TN", 35.15, -90.05;';
  let cityObj = new CityMap((localStorage.getItem('storageData') === null) ? defaultData : localStorage.getItem('storageData'));
  let dataList = document.querySelector('.data-list');
  let input = document.querySelector('.cities-form__input');
  let submitBtn = document.querySelector('.btn-submit');
  let clearBtn = document.querySelector('.btn-clear');
  let form = document.querySelector('.cities-form__form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  }, false);

  window.addEventListener('DOMContentLoaded', function (e) {
    addOption(cityObj.citiesData);
  });

  input.addEventListener('change', (e) => {
    e.preventDefault();
    validateInput(e.target.value);
    Array.prototype.forEach.call(dataList.options, (el) => {
      if(e.target.value === el.value){
        e.target.value = `${e.target.value}, ${cityObj.citiesData[el.dataset.value - 1].region}, ${cityObj.citiesData[el.dataset.value - 1].latitude}, ${cityObj.citiesData[el.dataset.value - 1].longitude}`;
      }
    })
  }, false);

  input.addEventListener('input', (e) => {
    validateInput(e.target.value);
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('btn--disable')) {
      cityObj.add(input.value);
      cityObj.toLocalStorage(cityObj.citiesData);
      input.value = '';
      input.focus();
      addOption(cityObj.citiesData);
    }
  });

  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    if (!localStorage.getItem('storageData')) {
      alert('Storage is cleared!');
    }
    //dataList.removeChild();
  });

  function validateInput(data){
    if (/(^[a-zA-Z-\s]+)([,]\s{1}(([a-zа-я]+)|(\-?[0-9]{1,2}[.,]?[0-9]{0,2}))+?)*$/ig.test(data)) {
      submitBtn.classList.remove('btn--disable');
      input.classList.remove('invalid');
    } else {
      submitBtn.classList.add('btn--disable');
      input.classList.add('invalid');
    }
  }
  function addOption(data) {
    let options = dataList.options;
    let option = 0;
    data.forEach((el, i) => {
      if (i === options.length) {
        option = document.createElement('option');
        option.dataset.value = i;
        option.value = el.city;
        dataList.appendChild(option);
      }
    });
    /*     Array.prototype.forEach.call(options, function (el) {
          options[options.length] = new Option(el.city, options.length, false, false)
        }); */
  }
})()