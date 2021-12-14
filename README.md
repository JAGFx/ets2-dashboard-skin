# Eurotruck Simulator 2 Dashboard skin

[![CodeFactor](https://www.codefactor.io/repository/github/jagfx/ets2-dashboard-skin/badge)](https://www.codefactor.io/repository/github/jagfx/ets2-dashboard-skin/overview)
[![GitHub Version](https://img.shields.io/github/v/release/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![GitHub Milestone](https://img.shields.io/github/milestones/progress/JAGFx/ets2-dashboard-skin/8?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.6)
[![GitHub Commit since](https://img.shields.io/github/commits-since/JAGFx/ets2-dashboard-skin/v1.6.7?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases)
[![GitHub Release Download](https://img.shields.io/github/downloads/JAGFx/ets2-dashboard-skin/total?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Github Licence](https://img.shields.io/github/license/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/README.md)
[![GitHub Release Date](https://img.shields.io/github/release-date/JAGFx/ets2-dashboard-skin?style=flat-square)](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
[![Dependecy Status](https://david-dm.org/JAGFx/ets2-dashboard-skin.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin)
[![devDependencies Status](https://david-dm.org/JAGFx/ets2-dashboard-skin/dev-status.svg)](https://david-dm.org/JAGFx/ets2-dashboard-skin?type=dev)
[![Discord](https://img.shields.io/discord/764915323693826059.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/8abqrEeFxF)


## About

The idea with this repository is to update a collection of dashboard from
the [Funbit repository](https://github.com/Funbit/ets2-telemetry-server) with the newest SCS SDK, as well as clean up the look and feel for a modern update to an already great app.

The first skins to be reworked are my own dashboards. In the future, all dashboards in the *Funbit repository* will be included

This project was based on the [TruckSim-Telemetry-Demo](https://github.com/kniffen/TruckSim-Telemetry-Demo)

![Screenshot](doc/screens/demo.gif)

You can watch a tutorial on installing and a review
by [Neranjana Wijesinghe](https://www.youtube.com/playlist?list=PLJONr1a8YX5Tyw-i49yk2jYTAFJJ5h7fw)

## What is it?

This is an web app which you can use to choose a dashboard skin (Custom or from other truck brand (DAF, Man, Mercedes,
Renault, Scania or Volvo)) for your device to use as a second, independent dashboard
. [See screenshots here](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/doc/SKINS.md)

I've also introduced the possibility to change the unit of measurement to what you
prefer. [See the full list here](https://github.com/JAGFx/ets2-dashboard-skin/blob/master/doc/CONFIG_SETTINGS.md)

A event overlay can also be configured!

And now, a map integration!

It works on both desktop and mobile browsers.

## Map

### Support

If you're interested, check the [`JAGFx/ts-map`](https://github.com/JAGFx/ts-map) project.

More information on the [Map](./doc/MAP.md) readme

> Many thanks to [TwinDragon](https://github.com/TwinDragon) for maintaining an up to date map tile collection with each new version

### Offline

See the [SCS_Map_Tiles](https://github.com/TwinDragon/SCS_Map_Tiles#supported-maps) repository for supported games, versions available and download links

## Internationalization

Set your locale on the configuration tab

Available locales: 

- Chinese (cn_CN) - Thanks to [dreamstar-2020](https://github.com/dreamstar-2020)
- English (en_EN)
- French (fr_FR)
- Russian (ru_RU) - Thanks to [Jonny_Bro](https://github.com/JonnyBro)

## Requirements

- OS: Windows 64-bit
- Game: Euro Truck Simulator 2 or American Truck Simulator
- SCS SDK plugin: v1.11
- Web-browser: Chrome (Desktop and Mobile), Firefox (Desktop and Mobile), Edge (Desktop and Mobile), Safari (Desktop and Mobile

**Important: It dosen't work with all Internet Explorer browsers**

## Usage instructions

### Prerequisite

Install *[scs-sdk-plugin](https://github.com/RenCloud/scs-sdk-plugin)* by RenCloud

- Download the supported version zip `v1.11` at
  the [release](https://github.com/RenCloud/scs-sdk-plugin/releases/download/V.1.11/release_v_1_11.zip) page
- Extract the DLL file into your game folder like `C:\your-game-path\bin\win_x64\plugins\`
-- Note: If you own the Steam version, you can quickly access the game folder by right-clicking the game in your Steam library, hovering above 'Manage,' and clicking 'Browse local files.' You can proceed to navigate to bin > win_x64 > plugins.
### Installation

You can use this dashboard without building anything.

You can download the `*.tar.gz` archive from the [release](https://github.com/JAGFx/ets2-dashboard-skin/releases/latest)
page.

Extract this archive and run the `ets2-dashboard-skin_vX.X.X.exe`. That's it! 

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
4. And voilà! You can enable / disable the fullscreen on tap on the dashboard

> Note: Your mobile device AND your PC need to be on the same network

> Tip: On an iOS device, you can add the webpage to your home screen like an app! When on the page, tap the Share button, navigate to "Add to home screen," wait ~2 seconds for it to verify, and confirm it. It will go to your home screen and show your neat dashboard shortcut!

If you want to use another port, you can change it in the configuration file.

## Breaking changelog

See the [BREAKING_CHANGES.md](doc/BREAKING_CHANGES.md) readme

## Translation changelog

See the [TRANSLATION_CHANGES.md](doc/TRANSLATION_CHANGES.md) readme

## Known issues

If you found an issue, please see the [KNOW_ISSUES.md](doc/KNOW_ISSUES.md). Your issue may be already known.

## Features

To see all features used into the dashboard, see the [FEATURES.md](doc/FEATURES.md) readme.

## Skins

To learn more about the skins integrated or how to add a new skin, see the [SKINS.md](doc/SKINS.md)

## Configuration

To learn more about the configuration, see the [CONFIG_SETTINGS.md](doc/CONFIG_SETTINGS.md)

## Contributing

If you want to contribute, see the [CONTRIBUTING.md](CONTRIBUTING.md)

## Credits

Many thanks to

[![JetBrains Black Box Logo logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_square.svg)](https://www.jetbrains.com/?from=EurotruckSimulator2Dashboardskin)

## License
Under the [MIT License](LICENSE)

© JAGFx - hey@emmanuel-smith.me
