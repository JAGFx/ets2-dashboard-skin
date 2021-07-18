# Contributing

Hi there, if you're here, I'll say to you: THANKS !

Currently, you can only contribute for the map tiles, but in a future, I'll write somes lines to guide you for the code
contribution.

## Map

The map tiles was generated from a side project: JAGFx/ts-map

### Tiles generation

- 1/ [Download](https://github.com/JAGFx/ts-map/releases/download/v1.0.0-cli-beta/TsMap2.rar) the JAGFx/ts-map program
- 2/ Generate a setting file: `TsMap2.exe export -s` and follow instruction
- 3/ Generate tiles `TsMap2.exe export`
- 4/ Create an archive with all content from the `Output` folder

### Update version

To keep a backward compatibility, we need to add the old map tiles entry on the map configuration.

For example, if you're on **Euro truck simulator 2** or **American truck simulator** `1.40.x.x` and a new
version `1.41.x.x` was just release, you must set an old value for the `1.40.x.x`

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

## Send your contribution

For it, you need to create a pull request on this project.

All point on the pull request description must be checked and completed.

Please note:

- Only map tile update for minor release will be accepted (`1.40.x.x`, `1.41.x.x`, etc...)
- The map tiles will be updated when both game will on this new version

