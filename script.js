//1. Fetch global data
//2. Display global data in global rows
//3. Fetch country data
//4. Select country
//5. Display that specific country data in the country rows

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
console.log(result);
$('#total-confirmed').html(result.Global.TotalConfirmed);
$('#new-confirmed').html(result.Global.NewConfirmed);
$('#total-deaths').html(result.Global.TotalDeaths);
$('#new-deaths').html(result.Global.NewDeaths);
$('#total-recovered').html(result.Global.TotalRecovered);
$('#new-recovered').html(result.Global.NewRecovered);
}

/*function totalCasesSparkline (result) {
  $("#sparkline").sparkline([result.Global.NewConfirmed], {
    type: 'line',
    lineColor: '#f87070',
    fillColor: '#cdd7d6'});
}*/

/*function totalCasesSparkline (result) {
  $("#sparkline").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
    type: 'line',
    lineColor: '#f87070',
    fillColor: '#cdd7d6'});
   
}*/

//$("#sparkline").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
    //type: 'line',
    //lineColor: '#f87070',
    //fillColor: '#cdd7d6'});

//fetch country data

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

/*fetch("https://api.covid19api.com/countries", requestOptions)
  .then(response => response.text())
  .then(result => displayCountryData(result))
  .catch(error => console.log('error', error));*/

//select country 

$(function selectCountry() {
  fetch("https://api.covid19api.com/countries")
    .then(res => res.json())
    .then(res => {
      $("#countries").html("<option>Select...</option>");
      res.forEach(function (country) {
        $("#countries").append(`<option value="${country.Slug}">${country.Country}</option>`);
      });
      $("#countries").on("change", function() {
          obtainCountryData($(this).val());
    });
    });
});

//obtain country data

/*https://api.covid19api.com/total/country/south-africa
status/confirmed*/

//https://api.covid19api.com/total/country/south-africa

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