# Map

|Map|Game|Version|Download|
|---|---|---|---|
|Base|Euro Truck Simulator 2|v1.40.3.3|Download|
|Base|American Truck Simulator (1)|v1.40.3.3|-|
|Promod|Euro Truck Simulator 2 (1) (2)|v2.50|-|
|Promod Canada|American Truck Simulator (1) (2)|v2.50|-|

> (1) Not yet available
>
> (2) Not required on self-hosting

On this section, you can retrieve the following information:

- How use the map tiles collection
- How host the map tiles collection
- How generate the map tiles collection

## Usage

The map feature need tiles collection. You've three way to get this tiles:

- **Default remote**, you don't need to download anything. But you need an internet connexion
- **Self-hosted remote**, you can use your own remote.
- **Localy**, you **NEED** to download the tiles collection. See below.

Download tiles collection for the local use:

1. Download the [`vanilla`](https://ets2.jagfx.fr/maps.vanilla.tar.gz) and
   or [`promod`](https://ets2.jagfx.fr/maps.promod.tar.gz) tiles collection
2. Extract them into the folder of your installation folder. Final path example: `ETSDashFolder/maps/vanilla/...`
3. Set the `Tiles location` (Menu > Config > Map's options > Map > Tile location) to `Local`
4. Restart the app
5. And that's it !

### Default

On default configuration, the map settings are:

- Tiles location: `Remote`
- Kind of map: `Vanilla`
- Custom remote tiles location: `https://ets.jagfx.fr`
- Active map: `Auto`

This configuration can only use the base map and can switch automatically between ETS or ATS. This configuration do not
support any others mod of map.

If you want to use a modded map, see the `Custom` section.

### Custom

To change the tiles location, you can select the way on the configuration
pan ( `Menu > Config > Map of route advisor > Map > Tiles location` ) to switch between a remote or a local hosting.

To setup the host path, change the value on `Menu > Config > Map of route advisor > Map > Custom remote tiles location`
and press on the validation button to save the change.

And then, you can choose your map you want to use on the `Menu > Config > Map of route advisor > Map > Active map`

## Hosting

If you want, you can host your own map tiles collections, your host must follow the files structure:

```
├── <your-host>
│   ├── ets2
│   │   └──  Overlays
│   │       └── ...
│   │   └──  Tiles
│   │       └── ...
│   │   ├── Cities.json
│   │   ├── Countries.json
│   │   ├── Overlays.json
│   │   ├── TileMapInfo.json

│   ├── ats
│   │   └──  Overlays
│   │       └── ...
│   │   └──  Tiles
│   │       └── ...
│   │   ├── Cities.json
│   │   ├── Countries.json
│   │   ├── Overlays.json
│   │   ├── TileMapInfo.json

│   ├── promod (2)
│   │   └──  Overlays
│   │       └── ...
│   │   └──  Tiles
│   │       └── ...
│   │   ├── Cities.json
│   │   ├── Countries.json
│   │   ├── Overlays.json
│   │   ├── TileMapInfo.json

│   ├── promod-ca (2)
│   │   └──  Overlays
│   │       └── ...
│   │   └──  Tiles
│   │       └── ...
│   │   ├── Cities.json
│   │   ├── Countries.json
│   │   ├── Overlays.json
│   │   ├── TileMapInfo.json

│   ├── <other-mod>
│   │   └──  Overlays
│   │       └── ...
│   │   └──  Tiles
│   │       └── ...
│   │   ├── Cities.json
│   │   ├── Countries.json
│   │   ├── Overlays.json
│   │   ├── TileMapInfo.json
```

This project support the map tiles collection generated from this project
only: [JAGFx / ts-map](https://github.com/JAGFx/ts-map).

Follow the instruction in `Generation` section.

#### Example

You can use `http-server` to host a local tiles collection

````bash
$ http-server ./maps -p 8081 --cors -s
````

And then set the `Custom remote tiles location` to `http://localhost:8081`

## Generation

SOON