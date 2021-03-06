import React, { useState } from 'react';
const api ={
	key: "f1cb8dcec7a3023f5a036970b222f643",
	base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  let time = new Date().getHours();
  
  const search = evt =>{
	  if(evt.key === "Enter"){
		  // Catch weather condition from OpenWeatherMap API
		  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
		  .then(res => res.json())
		  .then(result => {
			  setWeather(result);
			  setQuery('');
			  });
	  }
  }
  // Finding what is day today
  const dateMaker = (d) =>{
	  let months = ["January","February","March","May","July","August","September","October","November","December"];
	  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	  let day = days[d.getDay()];
	  let month = months[d.getMonth()];
	  let date = d.getDate();
	  let year = d.getFullYear();
	  let time = d.getHours();
	  return day + " " + date + " " + month + " " + year
  }
  return (
    // Check weather condition and match the background
	<div className={(typeof weather.main!="undefined")?(
						(weather.weather[0].main=="Clear")? 
							'app sun' 
						: (
							(weather.weather[0].main=="Rain")?
								'app rain'
							: (
								(weather.weather[0].main=="Clouds")?
									'app sunCloud'
								: (
									(weather.weather[0].main=="Snow")?
										'app snow'
									: (
										(weather.weather[0].main=="Mist")?
											'app mist'
										: (
											(weather.weather[0].main=="Haze")?
												'app haze'
											: (
												(weather.weather[0].main=="Smoke")?
													'app smoke'
												: (
													(weather.weather[0].main=="Dust")?
														'app dust'
													: (
														(weather.weather[0].main=="Fog")?
															'app fog'
														: (
															(weather.weather[0].main=="Sand")?
																'app sand'
															: (
																(weather.weather[0].main=="Ash")?
																	'app ash'
																: (
																	(weather.weather[0].main=="Tornado")?
																		'app tornado'
																	: (
																		(weather.weather[0].main=="Drizzle")?
																			'app rain'
																		: (
																			'app'
																		)
																	)
																)
															)
														)
													)
												)
											)
										)
									)
								)
							)
						)
					) 
					: 
						'app'
					}>
		<main>
			<div className="search-box">
				{/* Call search after any key press */}
				<input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
			</div>
			{/* Check if a weather condition is recived from API */}
			{(typeof weather.main != "undefined") ? (
			<div>
				<div className="location-box">
					{/* Shoing country */}
					<div className="location">{weather.name}, {weather.sys.country}</div>
					{/* Calling dateMaker for shoing date */}
					<div className="date">{dateMaker(new Date())}</div>
				</div>
				<div className="weather-box">
					{/* Shoing temperature */}
					<div className="temp">{Math.round(weather.main.temp)}??c</div>
					{/* Shoing weather condition */}
					<div className="weather">{weather.weather[0].main}</div>
				</div>
			</div>
			) : (
			<div>
				<div className="location-box">
					{/* Shoing title */}
					<div className="location">weather condition</div>
					{/* Calling dateMaker for shoing date */}
					<div className="date">{dateMaker(new Date())}</div>
				</div>
				<div className="weather-box">
					{/* Shoing my name */}
					<div className="temp">Seyed Ali Mozaffari</div>
					
				</div>
			</div>
			)}
		</main>
	</div>
  );
}

export default App;
