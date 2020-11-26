'use strict';

//fetch global data 

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.covid19api.com/summary", requestOptions)
  .then(response => response.json())
  .then(result => displayGlobalData(result))
  .catch(error => console.log('error', error));

//display global data

function displayGlobalData(result) {
$('#total-confirmed').html(result.Global.TotalConfirmed);
$('#new-confirmed').html(result.Global.NewConfirmed);
$('#total-deaths').html(result.Global.TotalDeaths);
$('#new-deaths').html(result.Global.NewDeaths);
$('#total-recovered').html(result.Global.TotalRecovered);
$('#new-recovered').html(result.Global.NewRecovered);
}

//select country 

$(function selectCountry() {
  fetch("https://api.covid19api.com/countries")
    .then(res => res.json())
    .then(res => {
      $("#countries").html("<option>Select...</option>");
      res.sort(compareCountries);
      res.forEach(function (country) {
        $("#countries").append(`<option value="${country.Slug}">${country.Country}</option>`);
      });
      $("#countries").on("change", function() {
          obtainCountryData($(this).val());
    });
    });
});

//compare country strings to sort them alphabetically 

function compareCountries(a,z) {
if (a.Slug < z.Slug) return -1; 
return 1; 
}

//obtain country data

function obtainCountryData(country) {
  fetch("https://api.covid19api.com/total/country/"+country, requestOptions)
  .then(response => response.json())
  .then(result => displayCountryData(result[result.length-1]))
  .catch(error => console.log('error', error));
}

//listen to country selected

function watchSelect() {
 $("#countries").on("change", function obtainCountryData(countries) {
    displayCountryData(result)
    });
}

//display country data

function displayCountryData(country) {
$('#country-total-confirmed').html(country.Confirmed);
$('#country-total-deaths').html(country.Deaths);
$('#country-total-recovered').html(country.Recovered);
}

