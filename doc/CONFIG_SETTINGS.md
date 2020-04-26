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
	"middle": {
		"hShiftLayout": {
			"range": true,
			"splitter": true
		},
		"top": [
			"retarder",
			"parkingBrake",
			"beamHigh",
			"beamLow",
			"beacon"
		],
		"bottom": [
			"rpm",
			"fuel",
			"speedLimit"
		]
	}
}
````

> Note: We can displayed 7 element max in the right side and 4 in the middle side. Place your element on the top. 

## HShifter layout
You can configure your ETS2 layout in this config file.
If you set a range ON, or splitter ON or both, set the TRUE value.

See more informations at [ETS2 Input config](https://eurotrucksimulator2.com/input_config.php)

---
↩️ [Home](../README.md)
