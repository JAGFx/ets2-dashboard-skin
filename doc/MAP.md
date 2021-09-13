# Map

The map feature need tiles collection. To do that, you need to generate it.

If you're interested, check the [`JAGFx/ts-map`](https://github.com/JAGFx/ts-map) project.

See the [SCS_Map_Tiles](https://github.com/TwinDragon/SCS_Map_Tiles#supported-maps) repository for supported game, versions available and download links

See the DLC compatibility on [this project](https://github.com/TwinDragon/SCS_Map_Tiles)

> Many thanks to [TwinDragon](https://github.com/TwinDragon) for maintaining a map tiles collection up to date for each new game version

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

You can use [`http-server`](https://www.npmjs.com/package/http-server) to host a local tiles collection

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
