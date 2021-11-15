import { debounce } from 'lodash';
import './sass/main.scss';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';
import fetchCountries from './js/fetchCountries.js';

function tooMuch() {
  alert({
    text: 'Too many matches found! Please enter a more specific query!',
  });
}

const BASE_URL = 'https://restcountries.com/v2/name/';
const countryRef = document.querySelector('.country');
const searchForm = document.querySelector('[name=country_search]');

const onInputChangeDebounced = debounce(event => {
  const countryName = event.target.value;
  fetchCountries(BASE_URL, countryName).then(country => {
      if (country.length > 10 || country.length < 1) {
        tooMuch();
      } else if (country.length < 11 && country.length > 1) {
        countryRef.innerHTML = '';
        countryRef.insertAdjacentHTML('afterbegin', countryList(country));
      } else if (country.length === 1) {
        countryRef.innerHTML = '';
        countryRef.insertAdjacentHTML('afterbegin', countryCard(country));
      } else {
        countryRef.innerHTML = '';
      }
    });
}, 1000);

searchForm.addEventListener('input', onInputChangeDebounced);
