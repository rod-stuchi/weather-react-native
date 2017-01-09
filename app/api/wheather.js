export default function fetchWeather(city) {
	let url_hours = `http://api.apixu.com/v1/forecast.json?key=3738e0d6a6fd4961a0f150210170601&q=${city}`
	let url_day = `http://api.openweathermap.org/data/2.5/find?q=${city}&APPID=3fa9fa72d3d8db1a0bf6b9383239faa7&units=metric&lang=pt`
	
	var fetch_hours = fetch(url_hours)
		.then((response) => response.json())
		.then((json) => json.forecast.forecastday[0].hour.map((day) => {
			return {
				time: day.time,
				temp_c:  (day.temp_c.toString().length == 2 ? day.temp_c + '.0' : day.temp_c )
			}
		}))

	var fetch_day = fetch(url_day)
		.then((response) => response.json())
		.then((json) => {
			return {
				icon: json.list[0].weather[0].icon,
				description: json.list[0].weather[0].description,
				country:  json.list[0].sys.country,
				city: json.list[0].name,
				temp:  json.list[0].main.temp,
				temp_max:  json.list[0].main.temp_max,
				temp_min:  json.list[0].main.temp_min
			}
		})

	return Promise.all([fetch_hours, fetch_day]).then((obj) => {
		f_hours = obj[0]
		f_day = obj[1]

		return {
			day: f_day,
			hours: f_hours
		}
	})
}