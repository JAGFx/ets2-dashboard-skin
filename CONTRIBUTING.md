# Contributing

Hi there, if you're here, I'll say to you: THANKS !

Currently, you can only contribute for the map tiles, but in a future, I'll write somes lines to guide you for the code
contribution.

You can join the discord to exchange about it
;) [![Discord](https://img.shields.io/discord/764915323693826059.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/8abqrEeFxF)

## How to

If you want to contribute in this project, you can:

- Stars this project
- Share this project
- [Suggest a feature](https://github.com/JAGFx/ets2-dashboard-skin/issues/new?assignees=&labels=&template=feature_request.md&title=)
- [Create an issue](https://github.com/JAGFx/ets2-dashboard-skin/issues/new?assignees=&labels=bug%2C+feature%2Ftodo&template=bug_report.md&title=)
- Suggest your code contribution (for a feature, a bugfix or other)

For the last point, please read in full this contribution guide.

## Identify a problem

If you encounter a problem with this application, please check all the suggestions:

- [x] The application launches without errors.
- [x] The device is connected on the same network as the application.
- [x] The game is launched and you are on the road (If you don't make the spawn once on the road, the connection will
  not be made).
- [x] Check if a known problem [has been listed](doc/KNOW_ISSUES.md)
- [x] Run the application as an administrator

If you still have a problem, you
can [open a bug on Github](https://github.com/JAGFx/ets2-dashboard-skin/issues/new?assignees=&labels=bug%2C+feature%2Ftodo&template=bug_report.md&title=)

> Note: If the application crashes and closes immediately, you can open a terminal and type `ets2-dashboard-skin.exe`.With this, the application will not crash anymore and the error will be displayed.

Please give all mentioned information about the problem. Without this, I am not able to reproduce the problem and solve
it.

- [x] Give the device used (PC, Tablette or Mobile)
- [x] Give the device details (OS, browser used)
- [x] Give the application version used
- [x] Give the SCS telemetry version used
- [x] Give the skin name if necessary
- [x] Give the log file

## Contributing

Many thanks if you want to contribute on this project.

Please follow the "fork-and-pull" Git workflow.

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a [**Pull request**](https://github.com/JAGFx/ets2-dashboard-skin/compare) so that we can review your changes

All point on the pull request description must be checked and completed (if applicable).

## Prepare your local instance

### Requirements

This project use NodeJs. Please be sure the NodeJs v14+ is installed before.

This project can be developed on **Linux** or **Windows**

### Installation

1. Clone this repository
2. 1Install dependencies

#### Clone this repository

````bash
$ git clone https://github.com/JAGFx/ets2-dashboard-skin.git
$ cd ets2-dashboard-skin
````

#### Install dependencies

````bash
$ npm i && npm rb
````

#### Environment file

This project use a `.env` file. If you wan to override one or more variable in the development, create a `.env.local` at
the same place of the `.env` file

#### Telemetry data

If you want to use a fake file data instead of the data from the SCS API, set the `VUE_APP_USE_FAKE_DATA` to `true`

```dotenv
VUE_APP_USE_FAKE_DATA=true
```

#### Useful commands

|Description|Command|
|---|---|
|Launch the dashboard development app|`$ npm run dashboard:dev`|
|Build the dashboard dist files for the production|`$ npm run dashboard:build`|
|Start the production version of dashboard|`$ npm run dashboard:start`|
|Start a tiny version of server to get data through Socket|`$ npm run server:dev`|
|Create a font with all svg files from the resources directory<br><br>To get more details, see [RESOURCES.md](doc/RESOURCES.md)|`$ npm run font:build`|
|Launch the linter|`$ npm run lint`|

## Others stuff

### Resources

I provide all resources what I'm use to develop this dashboard. Such as svg, AI file for svg or others element who can
be need to contribute too.

See the [RESOURCES.md](doc/RESOURCES.md) section to get more details

### Map

The map tiles was generated from a side project: [JAGFx/ts-map](https://github.com/JAGFx/ts-map)

When can you request a map tiles update ? At each new minor release, you can request an update.

If a new map DLC are released through the same minor version of the current game, you don't need to follow this guide.
You just need to generate the map tiles collection and share it to me. See
this [readme](https://github.com/JAGFx/ts-map/tree/feat/rework#how-to-use-) ;)

Example of valid version for the requesting:

- `1.39.1.1`
- `1.40.1.1`
- `1.41.1.1`

Example of **INVALID** version for the requesting:

- `1.41.1.1`
- `1.41.2.1`
- `1.41.2.2`

#### Tiles generation

- 1/ [Download](https://github.com/JAGFx/ts-map/releases/download/v1.0.0-cli-beta/TsMap2.rar)
  the [JAGFx/ts-map](https://github.com/JAGFx/ts-map) program
- 2/ Generate a setting file: `TsMap2.exe export -s` and follow instruction
- 3/ Generate tiles `TsMap2.exe export`
- 4/ Create an archive with all content from the `Output` folder

#### Update version

To keep a backward compatibility, we need to add the old map tiles entry on the map configuration.

For example, if you're on **Euro truck simulator 2** or **American truck simulator** `1.40.x.x` and a new
version `1.41.x.x` was just release, you must set an old value for the `1.40.x.x`

Please note:

- Only map tile update for minor release will be accepted (`1.40.x.x`, `1.41.x.x`, etc...)
- The map tiles will be updated when both game will on this new version

#### Edit the map configuration file

This file are located at `src/data/config/map.json`. On it, identify the entry `maps_map_tilesVersion` and add another
entry at the end of `values`:

````json
{
	"label" : "v1.40",
	"value" : "1.40"
}
````

Example of the `maps_map_tilesVersion` entry after editing:

````json
{
	"id" :          "maps_map_tilesVersion",
	"label" :       "Game version",
	"description" : "The latest get the tiles for the latest version, else the specified version",
	"values" :      [
		{
			"label" : "Latest",
			"value" : "latest"
		},
		{
			"label" : "1.40",
			"value" : "1.40"
		}
	]
}
````
