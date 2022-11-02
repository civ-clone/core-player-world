# core-player-world

A `Player`-orientated `World` that only includes `Tile`s the `Player` has seen and returns `UndiscoveredTile`s 
otherwise.

This `PlayerWorld` requires manually updating when a `Player` has visibility so that changes aren't immediately visible
(as per the original Civilization) until revisiting.
