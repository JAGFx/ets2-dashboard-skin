# Eurotruck Simulator 2 Dashboard skin

## About

The idea with this repository is to update a collection of dashboard from the [Funbit repository](https://github.com/Funbit/ets2-telemetry-server) with the newest SCS SDK.

And then, use a best way to maintain the different dashboard.

The first to be rework are my own dashboard. In the future, all dashboard in the *Funbit repository* will be include

This project was based on the [TruckSim-Telemetry-Demo](https://github.com/kniffen/TruckSim-Telemetry-Demo)

![Screenshot](screenshot.png)

## Envarionement

All development are made under **Windows**. It's not operable under all Linux OS.

The view is optimized for a `5.5"` screen. To develop on you web browser, you can set phone view to `800px * 455px`  


## Prerequisite

### scs-sdk-plugin

Install *[scs-sdk-plugin](https://github.com/RenCloud/scs-sdk-plugin)* by RenCloud

- Download the latest release zip name like `release_v_1_10_5.zip` at the [release page](https://github.com/RenCloud/scs-sdk-plugin/releases/latest)
- Extract the DLL file into your game folder like `C:\you-game-path\bin\win_x64\plugins\`

### Windows-Build-Tools

Install *[Windows-Build-Tools](https://github.com/felixrieseberg/windows-build-tools)*

````bash
$ npm install --global windows-build-tools
````

## Installation

### Clone this repository

````bash
$ git clone https://github.com/JAGFx/ets2-dashboard-skin.git
$ cd ets2-dashboard-skin
````

### Build resources

````bash
$ npm i
$ cd server && npm i
$ cd ../ && npm run build
````

## Features

To see all features used into the dashboard, see the [FEATURES.md](doc/FEATURES.md).

## Development

### Environment file

This project use a `.env` file. If you wan to override one or more variable in the development, create a `.env.local` at the same place of the `.env` file

#### Telemetry data
If you want to use a fake file data instead of the data from the SCS API, set the `VUE_APP_USE_FAKE_DATA` to `true`

```dotenv
VUE_APP_USE_FAKE_DATA=true
```

### Config settings
You can choose to display element than you want. To setting up, see [CONFIG_SETTINGS.md](doc/CONFIG_SETTINGS.md)

### Resources
I provide all resources what i'm use to develop this dashboard. Such as svg, AI file for svg or others element who can be need to contribute too.

See the [RESOURCES.md](doc/RESOURCES.md) section to get more details

## Commands

### Dashboard

#### Dev

Launch the dashboard development server

````bash
$ npm run dashboard:dev
````

#### Build

Build the dashboard dist files for the production 

````bash
$ npm run dashboard:build
````

#### Start

Start the production version of dashboard

````bash
$ npm run dashboard:start
````

### Production

#### Build

Start the production version of server

````bash
$ npm run server:build
````

#### Start

Start the production version of the server

````bash
$ npm run server:start
````

### Other

#### Font build

Create a font with all svg files from the resources directory

To get more details, see [RESOURCES.md](doc/RESOURCES.md)

````bash
$ npm run font:build
````

#### Build

Build the dist files for the dashboard, the server and font

````bash
$ npm run build
````

## License
Under the [MIT License](LICENSE)

© JAGFx - hey@emmanuel-smith.me
