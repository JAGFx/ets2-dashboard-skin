# Eurotruck Simulator 2 Dashboard skin

[![CodeFactor](https://www.codefactor.io/repository/github/jagfx/ets2-dashboard-skin/badge)](https://www.codefactor.io/repository/github/jagfx/ets2-dashboard-skin/overview)
[![GitHub Version](https://img.shields.io/github/v/release/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![GitHub Milestone](https://img.shields.io/github/milestones/progress/JAGFx/ets2-dashboard-skin/8?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.6)
[![GitHub Commit since](https://img.shields.io/github/commits-since/JAGFx/ets2-dashboard-skin/v1.6.0?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases)
[![GitHub Release Download](https://img.shields.io/github/downloads/JAGFx/ets2-dashboard-skin/total?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Github Licence](https://img.shields.io/github/license/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/README.md)
[![GitHub Release Date](https://img.shields.io/github/release-date/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Dependecy Status](https://david-dm.org/JAGFx/ets2-dashboard-skin.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin)
[![devDependencies Status](https://david-dm.org/JAGFx/ets2-dashboard-skin/dev-status.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin?type=dev)
[![Discord](https://img.shields.io/discord/764915323693826059.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/C4EEaHmPRs)


## About

The idea with this repository is to update a collection of dashboard from
the [Funbit repository](https://github.com/Funbit/ets2-telemetry-server) with the newest SCS SDK.

And then, use a best way to maintain the different dashboard.

The first to be rework are my own dashboard. In the future, all dashboard in the *Funbit repository* will be include

This project was based on the [TruckSim-Telemetry-Demo](https://github.com/kniffen/TruckSim-Telemetry-Demo)

![Screenshot](doc/screens/demo.gif)

You can check also a review and installation guide made
by [Neranjana Wijesinghe](https://www.youtube.com/playlist?list=PLJONr1a8YX5Tyw-i49yk2jYTAFJJ5h7fw)

## What's it ?

This is an web app who you can choose over dashboard skin (Custom or from other truck brand (DAF, Man, Mercedes,
Renault, Scania or Volvo))
. [See screenshots here](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/doc/SKINS.md)

I'm also introduce the possibility to change the unit of measurement as you
prefer. [See the full list here](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/doc/CONFIG_SETTINGS.md)

A event overlay can also be configured !

Now, you've got a map integration !

It's work on desktop and mobile browser.

## Map

The map feature need tiles collection. To do that, you need to generate it.

If you're interested, check the [`JAGFx/ts-map`](https://github.com/JAGFx/ts-map) project.

The following tab show you the tiles collection and the download link

|Map|Game|Version|Download|
|---|---|---|---|
|Base|Euro Truck Simulator 2|v1.40.3.25|[Download](https://github.com/JAGFx/ts-map/releases/download/v0.10/jagfx-map-ets2.tar.gz)|
|Base|American Truck Simulator|v1.40.3.3|-|
|Promod|Euro Truck Simulator 2|v2.55|[Download](https://github.com/JAGFx/ts-map/releases/download/v0.10/jagfx-map-promod.tar.gz)|
|Promod Canada|American Truck Simulator|v1.0.1|-|

More information on the [Map](./doc/MAP.md) readme

### Breaking change

It's not be planned, but a major change was introduced and cause a breaking change.

From `v1.6.X` and more, there will not be able to work with the old map tiles collection (under `v1.5.X`)

Please download the latest map tiles collection before to use the Map skin.

## Requirements

- OS: Windows 64Bits
- Game: Euro Truck Simulator 2
- SCS SDK plugin: v1.10.6
- Web-browser: Chrome (Desktop and Mobile), Firefox (Desktop dans Mobile), Edge ( Desktop and mobile )

**Important: It dosen't work with all Internet Explorer browsers**

## How to use ?

### Prerequisite

Install *[scs-sdk-plugin](https://github.com/RenCloud/scs-sdk-plugin)* by RenCloud

- Download the supported version zip `v1.10.6` at
  the [release](https://github.com/RenCloud/scs-sdk-plugin/releases/download/V.1.10.6/release_v_1_10_6.zip) page
- Extract the DLL file into your game folder like `C:\you-game-path\bin\win_x64\plugins\`

### Installation

You can use this dashboard without build anything.

You can download the `*.tar.gz` archive from the [release](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
page.

Extract this archive and run the `ets2-dashboard-skin_vX.X.X.exe`. That's it !

> Note: You need to start the game to see the dashboard

### Use from desktop device

1. Open your favorite web browser
2. Go to [http://localhost:3000](http://localhost:3000)

And that's it :D

### Use from a mobile device

1. Find your local IP address for your PC (Find
   how [here](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address))
2. Open a web browser on your mobile device
3. Access to the dashboard on your mobile: `http://<YOUR_LOCAL_IP>:3000` (e.g. `http://192.168.1.42:3000`)
4. And voilà ! You can enable / disable the fullscreen on tap on the dashboard

> Note: Your mobile device AND your PC need to be on the same network

> Tip: You can save a shortcut on your home screen to use it as an app like.


## Know issues

If you found an issue, please see the [KNOW_ISSUES.md](doc/KNOW_ISSUES.md). Your issue may be already known.

## Features

To see all features used into the dashboard, see the [FEATURES.md](doc/FEATURES.md).

## Skins

To know more about the skin integrated or how to add a new skin, see the [SKINS.md](doc/SKINS.md)

## Configuration

To know more about the configuration, see the [CONFIG_SETTINGS.md](doc/CONFIG_SETTINGS.md)

## Installation

1. Install the prerequisite things
2. Install the Windows-Build-Tools
3. Clone this repository
4. Build this project
5. Run the `ets2-dashboard-skin_vX.X.X.exe` place on the `bundle` directory

#### Windows-Build-Tools

Install *[Windows-Build-Tools](https://github.com/felixrieseberg/windows-build-tools)*

````bash
$ npm install --global windows-build-tools
````

#### Clone this repository

````bash
$ git clone https://github.com/JAGFx/ets2-dashboard-skin.git
$ cd ets2-dashboard-skin
````

#### Build resources

````bash
$ npm i && npm rb
$ npm run server:install
$ npm run build
````

## Development

### Environment file

This project use a `.env` file. If you wan to override one or more variable in the development, create a `.env.local` at
the same place of the `.env` file

#### Telemetry data

If you want to use a fake file data instead of the data from the SCS API, set the `VUE_APP_USE_FAKE_DATA` to `true`

```dotenv
VUE_APP_USE_FAKE_DATA=true
```

### Resources

I provide all resources what I'm use to develop this dashboard. Such as svg, AI file for svg or others element who can
be need to contribute too.

See the [RESOURCES.md](doc/RESOURCES.md) section to get more details

## Commands

### Dashboard

#### Dev

Launch the dashboard development app

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

### Server

#### Install

Install server dependencies

````bash
$ npm run server:install
````

#### Build

Build the server dist files for the production 

````bash
$ npm run server:build
````

#### Start

Start the production version of the server

````bash
$ npm run server:start
````
OR
````bash
$ npm start
````

#### Dev

Start a tiny version of server to get data through Socket

````bash
$ npm run server:dev
````

### Production

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
