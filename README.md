# Eurotruck Simulator 2 Dashboard skin

[![npm](https://img.shields.io/npm/v/ets2-dashboard-skin?style=flat-square)](https://www.npmjs.com/package/ets2-dashboard-skin)
[![npm](https://img.shields.io/npm/dt/ets2-dashboard-skin?style=flat-square)](https://www.npmjs.com/package/ets2-dashboard-skin)
[![NPM](https://img.shields.io/npm/l/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/README.md)
[![GitHub Release Date](https://img.shields.io/github/release-date/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Dependecy Status](https://david-dm.org/JAGFx/ets2-dashboard-skin.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin)  
[![devDependencies Status](https://david-dm.org/JAGFx/ets2-dashboard-skin/dev-status.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin?type=dev) 


## About

The idea with this repository is to update a collection of dashboard from the [Funbit repository](https://github.com/Funbit/ets2-telemetry-server) with the newest SCS SDK.

And then, use a best way to maintain the different dashboard.

The first to be rework are my own dashboard. In the future, all dashboard in the *Funbit repository* will be include

This project was based on the [TruckSim-Telemetry-Demo](https://github.com/kniffen/TruckSim-Telemetry-Demo)

![Screenshot](screenshot.png)

## Environement

All development are made under **Windows**. It's not operable under all other OS.

The view is optimized for a `5.5"` screen. To develop on you web browser, you can set phone view to `800px * 455px`

## Requirements

- OS: Windows 64Bits
- NodeJS: v10, v12 or v13  
- Game: Euro Truck Simulator 2
- Web-browser: Chrome (Desktop and Mobile), Firefox (Desktop dans Mobile), Edge ( Desktop and mobile )

**Important: It dosen't work with all Internet Explorer browsers**

All current NodeJS version and LTS are supported. See the [NodeJS Release](https://nodejs.org/en/about/releases/) page to get more informations

## Quick use


### Without install

You can use this dashboard without build anything. Just to get the `scs-sdk-plugin` (See below).

You can download the `*.tar.gz` archive from the [release](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest) page.

Extract this archive and run the `ets2-dashboard-skin_vX.X.X.exe`. That's it !

### From sources files 

1. Install the prerequisite things
2. Follow the [installation](#installation) instructions
3. Launch the [bundle](#bundle) command
4. Run the `ets2-dashboard-skin_vX.X.X.exe` place on the `bundle` directory

## Prerequisite

### scs-sdk-plugin

Install *[scs-sdk-plugin](https://github.com/RenCloud/scs-sdk-plugin)* by RenCloud

- Download the latest release zip name like `release_v_X_X_X.zip` at the [release](https://github.com/RenCloud/scs-sdk-plugin/releases/latest) page
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
$ npm i && npm rb
$ npm run server:install
$ npm run build
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

#### Server install

Install all necessary dependencies for the server

````bash
$ npm run server:install
````

#### Server build

Build the server dist files for the production 

````bash
$ npm run server:build
````

#### Server start

Start the production version of the server

````bash
$ npm run server:start
````
OR
````bash
$ npm start
````

#### Build

Build the dist files for the dashboard, the server and font

````bash
$ npm run build
````

#### Bundle

Generate a `*.tar.gz` archive with all production files of **Dashboard** and **Server**

````bash
$ npm run bundle
````

#### Build and Bundle

Combine `Build` task and `Bundle` task

````bash
$ npm run bAndB
````

### Other

#### Font build

Create a font with all svg files from the resources directory

To get more details, see [RESOURCES.md](doc/RESOURCES.md)

````bash
$ npm run font:build
````

#### ESLint

Launch the lint inspector

````bash
$ npm run lint
````

## License
Under the [MIT License](LICENSE)

© JAGFx - hey@emmanuel-smith.me
