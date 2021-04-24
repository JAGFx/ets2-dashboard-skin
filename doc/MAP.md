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

To use the map skin, you need a map tiles collection. This collection may be use from:

- Local: On your machine
- Default remote: Collection hosted on a remote by me
- Your remote: Self-hosted

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

## Generation

SOON