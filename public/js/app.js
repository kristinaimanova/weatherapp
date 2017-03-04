var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue'
  }
});
var hourlyWidget = new Vue({
    el: '#hourly',
    data: {
            summary: "it's gonna rain!",
            icon: 'clear-night',
            hours: []
    },
    methods: {
        getHourlyIcon: function(iconString){
            return `/images/${iconString}.svg`;
        },
        getDate: function(){
            var date = new Date(seconds * 1000);
            var month = date.getMonth();
            var year = date.getFullYear();
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            return `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
        },
        getMainIcon: function(){
            return `/images/${this.icon}.svg`;
        },
        getHourlyWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
            axios.get(url)
            .then(function(response){
                var hourlyData = response.data.hourly;
                this.summary = hourlyData.summary;
                this.icon = hourlyData.icon;
                this.hours = hourlyData.data;
            }.bind(this))
            .catch(function(err){
                console.log(err);
            });
        }
    },
    created: function(){
        this.getHourlyWeather(29.1, -84.1);
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
            return `/images/${iconString}.svg`;
        },
        getWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
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
        },
        updateWeather: function(latitude, longitude){

            this.getWeather(this.latitude,this.longitude);

        }
},
        created: function(){
        //
        this.getWeather(29.1,-81.4);
        }
});
var dailyWidget = new Vue({
    el: '#daily',
    data:{
        summary: "rainnnnnnn",
        icon: "rain",
        days: []
    },
    methods:{
        iconUrl: function(iconString){
            return `/images/${iconString}.svg`;
        },
        getDailyWeather: function(lat, lon){
            var url = `/weather/${lat},${lon}`;
            axios.get(url)
            .then(function(response){
                var dailyData = response.data.daily;
                this.summary = dailyData.summary;
                this.icon = dailyData.icon;
                this.hours = dailyData.data;
            }.bind(this))
            .catch(function(err){
                console.log(err);
            });
        }
    },
    created: function(){
        this.getDailyWeather(29.1, -84.1);
    }
});
