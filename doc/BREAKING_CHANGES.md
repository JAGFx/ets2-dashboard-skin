# Breaking change

## v1.7.0+

### Configurations files

The configuration files are divided into two files:

- The minimal configuration of the application `config.json`
- The configuration of the game `config.ets2.json` or `config.ats.json`

The old config file `config.ets2-dashboard-skin.json` is removed and is not used anymore.

If you have changes for the following entries, edit `config.json`:

- `general_refresh_rate`
- `general_skin_on_load`
- `general_h-shift-layout`
- `general_skin_locale`
- `general_job_remaining`
- `general_port`

For the others entries, edit the corresponding game configuration.

All configuration files are placed in a `config` folder.

For more information, read the [CONFIG_SETTINGS.md](CONFIG_SETTINGS.md) file

### Map tiles remote

The host hosted at `ets2.jagfx.fr` will not be updated anymore. In the next major release, it will be removed.

Use the `Unicor-p/SCS_Map_Tiles` instead.

## v1.6.3+

The configuration field `maps_map_tilesLocation` is deprecated.

Use the `maps_map_tilesRemoteCustomPath` instead.

## v1.6.0+

It's not be planned, but a major change was introduced and cause a breaking change.

From `v1.6.X` and more, there will not be able to work with the old map tiles collection (under `v1.5.X`)

Please download the latest map tiles collection before to use the Map skin.