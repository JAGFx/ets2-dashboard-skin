# Eurotruck Simulator 2 Dashboard skin

[![CodeFactor](https://www.codefactor.io/repository/github/jagfx/ets2-dashboard-skin/badge)](https://www.codefactor.io/repository/github/jagfx/ets2-dashboard-skin/overview)
[![GitHub Version](https://img.shields.io/github/v/release/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![GitHub Milestone](https://img.shields.io/github/milestones/progress/JAGFx/ets2-dashboard-skin/5?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.5)
[![GitHub Commit since](https://img.shields.io/github/commits-since/JAGFx/ets2-dashboard-skin/v1.4.4?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases)
[![GitHub Release Download](https://img.shields.io/github/downloads/JAGFx/ets2-dashboard-skin/total?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Github Licence](https://img.shields.io/github/license/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/README.md)
[![GitHub Release Date](https://img.shields.io/github/release-date/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Dependecy Status](https://david-dm.org/JAGFx/ets2-dashboard-skin.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin)
[![devDependencies Status](https://david-dm.org/JAGFx/ets2-dashboard-skin/dev-status.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin?type=dev)
[![Discord](https://img.shields.io/discord/764915323693826059.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/C4EEaHmPRs)


## About

The idea with this repository is to update a collection of dashboard from the [Funbit repository](https://github.com/Funbit/ets2-telemetry-server) with the newest SCS SDK.

And then, use a best way to maintain the different dashboard.

The first to be rework are my own dashboard. In the future, all dashboard in the *Funbit repository* will be include

This project was based on the [TruckSim-Telemetry-Demo](https://github.com/kniffen/TruckSim-Telemetry-Demo)

![Screenshot](doc/screens/demo.gif)

You can check also a review  and installation guide made by [Neranjana Wijesinghe](https://www.youtube.com/watch?v=dE55M7TaPTY)

## What's it ?

This is an web app who you can switch over dashboard skin (Custom or from other truck brand (DAF, Man, Mercedes, Renault, Scania or Volvo)). [See screenshots here](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/doc/SKINS.md)

I'm also introduce the possibility to change the unit of measurement as you prefer. [See the full list here](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/doc/CONFIG_SETTINGS.md)

A event overlay can also be configured !

It's work on desktop and mobile browser.

## Requirements

- OS: Windows 64Bits
- Game: Euro Truck Simulator 2
- SCS SDK plugin: v1.10.6
- Web-browser: Chrome (Desktop and Mobile), Firefox (Desktop dans Mobile), Edge ( Desktop and mobile )

**Important: It dosen't work with all Internet Explorer browsers**

## Installation

### Prerequisite

Install *[scs-sdk-plugin](https://github.com/RenCloud/scs-sdk-plugin)* by RenCloud

- Download the supported version zip `v1.10.6` at the [release](https://github.com/RenCloud/scs-sdk-plugin/releases/download/V.1.10.6/release_v_1_10_6.zip) page
- Extract the DLL file into your game folder like `C:\you-game-path\bin\win_x64\plugins\`

### For normal use

You can use this dashboard without build anything.

You can download the `*.tar.gz` archive from the [release](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest) page.

Extract this archive and run the `ets2-dashboard-skin_vX.X.X.exe`. That's it !

See the *[How to use]()* section to know how to run it !

> Note: You need to start the game to see the dashboard

### For development

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


## How to use ?

First, you need to run the dashboard app. See the *[Installation](#installation)* section
End then run the ETS2 or ATS game.

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

### Maps

The map feature need tiles collection. Two way to get this tiles:

- **Remotly**, you don't need to download anything. But you need to have an internet connexion
- **Localy**, you **need** to download the tiles collection that you need. See below.

Download tiles collection for the local use:

1. Download the [`vanilla`](https://ets2.jagfx.fr/maps.vanilla.tar.gz) and
   or [`promod`](https://ets2.jagfx.fr/maps.promod.tar.gz) tiles collection
2. Extract them into the folder of your installation folder. Final path example: `ETSDashFolder/maps/vanilla/...`
3. Set the `Tiles location` (Menu > Config > Map's options > Map > Tile location) to `Local`
4. And that's it !

## Know issues

If you found an issue, please see the [KNOW_ISSUES.md](doc/KNOW_ISSUES.md). Your issue may be already known.

## Features

To see all features used into the dashboard, see the [FEATURES.md](doc/FEATURES.md).

## Skins

To know more about the skin integrated or how to add a new skin, see the [SKINS.md](doc/SKINS.md)

## Configuration

To know more about the configuration, see the [CONFIG_SETTINGS.md](doc/CONFIG_SETTINGS.md)

## Development

### Environment file

This project use a `.env` file. If you wan to override one or more variable in the development, create a `.env.local` at the same place of the `.env` file

#### Telemetry data
If you want to use a fake file data instead of the data from the SCS API, set the `VUE_APP_USE_FAKE_DATA` to `true`

```dotenv
VUE_APP_USE_FAKE_DATA=true
```

### Resources
I provide all resources what i'm use to develop this dashboard. Such as svg, AI file for svg or others element who can be need to contribute too.

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
