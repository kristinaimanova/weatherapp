var getDate =function(seconds){
        var date = new Date(seconds * 1000);
        var month = date.getMonth();
        var year = date.getFullYear();
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        seconds = `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
        console.log('what even is this');
    };

var app = new Vue({
  el: '#app',
   data: {
    latty: 23.1,
    longy: 25.3
   },
methods: {
    updateWeather: function(latty, longy){
        app.longy = longy;
        app.latty = latty;
        console.log(app.latty);
        hourlyWidget.getHourlyWeather(latty, longy);
        currentlyWidget.getWeather(latty, longy);
        dailyWidget.getDailyWeather(latty, longy);
    }

}
});
var hourlyWidget = new Vue({
    el: '#hourly',
    data: {
            summary: "it's gonna rain!",
            icon: 'clear-night',
            hours: [],
            latitude: 29.1,
            longitude: -81.4
    },
    methods: {
        getHourlyIcon: function(iconString){
            return `/images/${iconString}.svg`;
        },
        getDate: function(seconds){
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
        this.getHourlyWeather(app.latty, app.longy);
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
        getDate: function(seconds){
            var date = new Date(seconds * 1000);
            var month = date.getMonth();
            var year = date.getFullYear();
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            return `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`;
        }

},
        created: function(){
        //
        this.getWeather(app.latty,app.longy);
        }
});
var dailyWidget = new Vue({
    el: '#daily',
    data:{
        summary: "rainnnnnnn",
        icon: "rain",
        apparentTemperature: 34,
        days: [],
        latty: 29.1,
        longy: -81.4
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
                this.apparentTemperature = dailyData.apparentTemperature;
                this.icon = dailyData.icon;
                this.days = dailyData.data;
            }.bind(this))
            .catch(function(err){
                console.log(err);
            });
        },
        getDate: function(seconds){
            var date = new Date(seconds * 1000);
            var month = date.getMonth();
            var year = date.getFullYear();
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            return `${month + 1}/${day}/${year}`;
        }
    },
    created: function(){
        this.getDailyWeather(app.latty, app.longy);
    }
});
