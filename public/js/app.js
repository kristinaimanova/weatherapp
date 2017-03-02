var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue'
  }
});

var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    time: 1000000,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy',
    apparentTemperature: 67.4,
    precipProbability: 0.30,
    humidity: 0.61,
    location: 'Gainesville, FL',
    latitude: 29.1,
    longitude: -81.4
},
methods: {
        iconUrl: function(iconString){
            return `/images/${iconString}.png`;
        },
        updateWeather: function(latitude, longitude){
        var url = `/weather/${currentlyWidget.latitude},${currentlyWidget.longitude}`;
        console.log(url);
        axios.get(url)
        .then(function(response){
            currentlyWidget.time = response.data.currently.time;
            currentlyWidget.summary = response.data.currently.summary;
            currentlyWidget.icon = response.data.currently.icon;
            currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
            currentlyWidget.precipProbability = response.data.currently.precipProbability;
            currentlyWidget.humidity = response.data.currently.humidity;
            currentlyWidget.location = response.data.currently.location;
            console.log(response.data);

        })
        .catch(function(err){
            console.log(err);
        });
        }
},
    created: function(){
        //
        axios.get(currentlyWidget.url)
        .then(function(response){
            currentlyWidget.time = response.data.currently.time;
            currentlyWidget.summary = response.data.currently.summary;
            currentlyWidget.icon = response.data.currently.icon;
            currentlyWidget.apparentTemperature = response.data.currently.apparentTemperature;
            currentlyWidget.precipProbability = response.data.currently.precipProbability;
            currentlyWidget.humidity = response.data.currently.humidity;
            currentlyWidget.location = response.data.currently.location;
            console.log(response.data);

        })
        .catch(function(err){
            console.log(err);
        });
    }
});
