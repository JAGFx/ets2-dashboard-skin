# Configuration settings

We can customized the elements displayed in the right side and in the middle.

How ? Create a file `config.json` in `public` directory.

Below, the default configuration

````json
{
	"right": [
		"oilTemperature",
		"brakesTemperature",
		"brakesAirPressure",
		"fuel",
		"fuelConsumption",
		"cruiseControl",
		"waterTemperature",
		"batteryVoltage"
	],
	"middle": [
	
	]
}
````

> Note: We can displayed 7 element max in the right side and 4 in the middle side. Place your element on the top. 
