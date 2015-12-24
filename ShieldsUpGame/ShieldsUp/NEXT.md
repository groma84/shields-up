# NEXT
1. Schilde implementieren
    - LifetimeComponent
    - LifetimeSystem (wenn abgelaufen dann LifetimeEndsMessage)
    - LifetimeEndsSystem (hört auf LifetimeEndsMessage und zerstört Entity)
    - Keyboard-Handler: wsx linke Seite, ijn rechte Seite
        1. keypress-Library einbinden
        1. Wie merken wir uns, was gerade gedrückt wird? 
            - Vielleicht in einer Variable im (dann neuen) Input-System - kann das Inputsystem im Update einfach pollen oder läuft das Event-gesteuert?
            - Geben wir dem Input-System direkt KeyHandler als Delegates mit? so eine Art "Map" aus KeyCode und Delegate?
    - wenn Taste gedrückt und letzter Schild mindestens 1s(?) her -> neuen Schild an der Stelle erzeugen
    - ShieldFactory (Shield hat RigidBody, Render, Collision, Damage, Lifetime)

# LATER
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