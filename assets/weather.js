//left container:
//search for using input from open weather.....
//set user input into local storage
//get items from local storage to displat in button or link elements beneath for "search history"
//clicking search history elements inputs value into userInputEl
let userInputEl  = document.querySelector("#city-name")
let searchBtn = document.querySelector("#button-addon2")
let cityArr = JSON.parse(window.localStorage.getItem("searchHistory")) || []


$ (searchBtn).on("click", function(){ 
    let cityName = userInputEl.value
    cityArr.push(cityName)
    window.localStorage.setItem("searchHistory", JSON.stringify(cityArr))
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=47720d481a94d54d12fdffb84923b486&units=imperial"
    $.ajax({
        url: apiUrl, 
        method: "get"
    })
    .then(function(response){
        $(".main-forecast").empty()
        console.log(response)
        let oneDayEl = $("<div>").addClass("one-day mb-5")
        let local = $("<h1>").text(response.name + " " + moment().format('MM/DD/YYYY'))
        let temp = $("<h2>").text("Temp: " + response.main.temp)
        let humid = $("<h2>").text("Humidity: " + response.main.humidity)
        let wind = $("<h2>").text("Wind Speed: " + response.wind.speed)
        $(oneDayEl).append(local, temp, humid, wind)
        $(".main-forecast").append(oneDayEl)
        //searchHistFunc()
        let cityArr2 = [...new Set(cityArr)]
        console.log(cityArr2)
        for (let i = 0; i < cityArr2.length; i++) {
            let historyBtn = $("<button>").addClass("list-group-item list-group-item-action text-center")
            historyBtn.text(cityArr2[i])
            let historySearch = $(".list-group")
            historySearch.append(historyBtn)
        }
    })
})
$ (searchBtn).on("click", function(){ 
    $(".five-forecast").empty()
    let cityName = userInputEl.value
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=47720d481a94d54d12fdffb84923b486&units=imperial"
    $.ajax({
        url: apiUrl, 
        method: "get"
    })
    .then(function(response){
        console.log(response)
        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("09:00:00") !== -1) {
       let icon = response.list[i].weather[0].icon 
       let fiveDayEl = `<div class="card p-0 flex-row text-white bg-info m-auto" style="width: 18rem;">
            <div class="flex-row card-body">
                <h1 class="card-title">${moment(response.list[i].dt_txt).format('ddd MM/DD/YYYY')}</h1>
                <img src="https://openweathermap.org/img/wn/${icon}.png" class="card-img-top" alt="">
                <h2 class="card-text">Temp: ${Math.round(response.list[i].main.temp)}°F</h2>
                <h2 class="card-text">Humidity: ${response.list[i].main.humidity}%</h2>
            </div>
        </div>`
                $(".five-forecast").append(fiveDayEl)
            }
        }
    })
})

