var app = new Vue({
      el: '#app',
       data: {
        latty: 23.1,
        longy: 25.3,
        addressString: "Gainesville, FL"
       },
    methods: {
        updateWeather: function(latty, longy){

            app.longy = longy;
            app.latty = latty;
            hourlyWidget.getHourlyWeather(latty, longy);
            currentlyWidget.getWeather(latty, longy);
            dailyWidget.getDailyWeather(latty, longy);
        },
        updateLocation: function(addressString){
            app.addressString = addressString;
            console.log(app.addressString);
            app.getLocation(addressString);
        },
        getLocation: function(addressString){
            var url = `${addressString}`;
            axios.get(url)
            .then(function(response){
                console.log(response);
            }.bind(this))
            .catch(function(err){
                console.log(err);
                console.log("AT LEAST IT BROKE");
            });
        },
    }
});

var hourlyWidget = new Vue({
    el: '#hourly',
    data: {
            summary: "it's gonna rain!",
            icon: 'clear-night',
            hours: [],
            latitude: 29.1,
            longitude: -81.4,
            hourSelection: 0,
            indexValue: 0,
            timeDate: "330",
            selected: 'A',
                options: [
                  { text: 'One', value: 'A' },
                  { text: 'Two', value: 'B' },
                  { text: 'Three', value: 'C' }
                ]
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
            var hh = date.getHours();
            var dd = "AM";
            var h = hh;
            if (h >= 12){
                h = hh-12;
                dd = "PM"
            }
            if (h == 0){
                h = 12;
            }
            var minutes = date.getMinutes();
            hourlyWidget.timeDate = `${month + 1}/${day}/${year} ${h}:${minutes < 9 ? '0' + minutes : minutes} ${dd}`;
            return hourlyWidget.timeDate;
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
        },
        updateSelection: function(){
            hourlyWidget.indexValue = hourlyWidget.hourSelection;
            hourlyWidget.timeDate = hourlyWidget.getDate();

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
        longy: -81.4,
        indexValue: 0,
        weekday: "Monday",
        daySelection: 0
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
            var numberday = date.getDate();
            var day = date.getDay();
            console.log(day);
            if (day == 0){
                dailyWidget.weekday = 'Sunday';
            }
            else if(day == 1){
                dailyWidget.weekday = 'Monday';
            }
            else if(day == 2){
                dailyWidget.weekday = 'Tuesday';
            }
            else if(day == 3){
                dailyWidget.weekday = 'Wednesday';
            }
            else if(day == 4){
                dailyWidget.weekday = 'Thursday';
            }
            else if(day == 5){
                dailyWidget.weekday = 'Friday';
            }
            else if(day == 6){
                dailyWidget.weekday = 'Saturday';
            }
            return `${dailyWidget.weekday} ${month + 1}/${numberday}/${year}`;
        },
        updateSelection: function(){
            dailyWidget.indexValue = dailyWidget.daySelection;
            dailyWidget.weekday = dailyWidget.getDate();
        }
    },
    created: function(){
        this.getDailyWeather(app.latty, app.longy);
    }
});
