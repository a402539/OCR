# GeoMixer-Leaflet Plugin Documentation


## GeoMixer Data Structure

The main entity in GeoMixer in **layer**. Each layer has several properties including `ID` and `type`.
Layer IDs are unique inside one server. The main layer types are **vector** and **raster**.

Each vector layer consists of geometry items. Item has `type`, `geometry` and `properties`.


## Class L.TileLayer.gmxVectorLayer

`gmxVectorLayer` class provides interface for drawing GeoMixer vector layers on Leaflet map.
APIKey, host ID and layer ID should by provided to load and display layer.

Instantiation syntax:
```
var gmxLayer = new L.TileLayer.gmxVectorLayer(options)
```

Layers can be added to map by calling `L.Map.addLayer()` or `L.TileLayer.gmxVectorLayer.addTo()`.

### Options
Option|Description|Type|Default value|Required
------|-----------|:--:|-------------|:------:
apiKey|GeoMixer API key for host|`String`||Yes
hostName|Host of the GeoMixer server|`String`|maps.kosmosnimki.ru| No
mapID|ID of the GeoMixer map|`String`||Yes
layerID|ID of the GeoMixer layer|`String`||Yes
beginDate|Start date for time interval (only for temporal layers)|`Date`||No
endDate|End date for time interval (only for temporal layers)|`Date`||No
sortItems|Function to sort layer items, as for JavaScript `sort()` function |`function(a, b) -> Boolean`|Sort by item ID|No

### Methods
Method|Syntax|Return type|Description
------|------|:---------:|-----------
setFilter|`setFilter(function(item)->Boolean)`|`this`|set function to filter out items before rendering. The only argument is the function, that receives an item and return boolean value (`false` means filter out)
setDateInterval|`setDateInterval(beginDate, endDate)`|`this`|Set date interval for temporal layers. Only items within date interval will be rendered on map. `beginDate` and `endDate` are of type `Date`
addTo|`addTo(map)`|`this`|Add layer to given map. `map` argument is of type `L.Map`.