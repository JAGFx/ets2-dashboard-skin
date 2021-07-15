# Map

The map feature need tiles collection. To do that, you need to generate it.

If you're interested, check the [`JAGFx/ts-map`](https://github.com/JAGFx/ts-map) project.

The following tab show you the tiles collection and the download link

|Map|Game|Version|Download|
|---|---|---|---|
|Base|Euro Truck Simulator 2|v1.40.3.25|[Download](https://github.com/JAGFx/ts-map/releases/download/v0.10/jagfx-map-ets2.tar.gz)|
|Base|American Truck Simulator|v1.40.3.3|-|
|Promod|Euro Truck Simulator 2|v2.55|[Download](https://github.com/JAGFx/ts-map/releases/download/v0.10/jagfx-map-promod.tar.gz)|
|Promod Canada|American Truck Simulator|v1.0.1|-|

On this section, you can retrieve the following information:

- How use the map tiles collection
- How host the map tiles collection
- How generate the map tiles collection

## Usage

The map feature need tiles collection. You've two way to get this tiles:

- **Default remote**, you don't need to download anything. But you need an internet connexion
- **Self-hosted remote**, you can use your own remote.

### Default

On default configuration, the map settings are:

- Tiles location: `Remote`
- Kind of map: `Vanilla`
- Custom remote tiles location: `https://ets2.jagfx.fr`
- Active map: `Auto`

This configuration can only use the base map and can switch automatically between ETS or ATS. This configuration do not
support any others mod of map.

If you want to use a modded map, see the `Custom` section.

### Custom

Go to `Menu > Config > Map of route advisor`

To change the tiles location, you can select the way on the configuration pan ( `Map > Tiles location` ) to switch
between a remote or a local hosting.

To setup the host path, change the value on `Map > Custom remote tiles location`
and press on the validation button to save the change.

And then, you can choose your map you want to use on the `Map > Active map`

## Self-hosting

If you want, you can host your own map tiles collections, your host must follow the files structure:

```
├── <localhost>
│   ├── <ats>
│   │   ├──  <latest>
│   │   │   └──  Tiles
│   │   │        └── ...
│   │   │   ├── TileMapInfo.json
│   ├── <ets2>
│   │   ├──  <latest>
│   │   │   └──  Tiles
│   │   │        └── ...
│   │   │   ├── TileMapInfo.json
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

If you want to participate on this step, You'll made me happy.

This project need the tiles for:

- ETS2 base map (Full DLC)
- ATS base map (Full DLC)
- Promod (ETS)
- Promod Canada

### Export the tiles

Check the side project [`JAGFx/ts-map`](https://github.com/JAGFx/ts-map) to know how ;)

### Send your export

Thanks so much for your participation.

Send a link of the archive at `hey@emmanuel-smith.me`. It's recommended to host your archive and send the link.
