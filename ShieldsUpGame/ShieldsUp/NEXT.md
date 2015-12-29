# NEXT
1. Schilde implementieren
	- LifetimeComponent
	- LifetimeSystem (wenn abgelaufen dann LifetimeEndsMessage)
	- LifetimeEndsSystem (hört auf LifetimeEndsMessage und zerstört Entity (erstmal))
	- Meteoriten sollen nicht einfach zerstört werden, sondern vom Schild abprallen (X-Direction mal -1, Y-Direction bleibt)

	


# LATER
1. Spawnpunkte Schilde an die richtige Stelle setzen
1. Anzeige und alle Größen etc. relativ zur Canvas-Größe machen (Canvas Größe aus DOM in PIXI auslesen statt Fix setzen)
1. Rund um das Spielfeld sollte es eine Barriere geben (außerhalb angezeigtem Bereich), die dann die Meteoriten tatsächlich zerstört
1. Spawnpunkte der Meteoriten so anpassen, dass sie gut die Schilde treffen, aber außerhalb des sichtbaren Bereichs spawnen
2. Punktezähler implementieren
3. Game-Over Screen implementieren
5. Start-Menü implementieren
4. Sound implementieren
6. Android-Version Erzeugung ausprobieren
1. Android-Zustände ausprobieren/Unterstützung implementieren (Pause, Resume, Stop)
1. Umstellen auf (halbwegs) dynamische Anzeigegröße (zumindest hoch bis 720p und runter bis 360p)
7. Echte Assets erstellen und einbinden
1. Beschreibungstext, Screenshots, Trailer erstellen
1. Internetseite erstellen (shieldsup.finde-ich-super.de)
1. Android-Store-Page erstellen
1. Refactoring bestehender Code
1. Release