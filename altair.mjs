import { altair } from "./module/config.js";
import AltairItemSheet from "./module/sheets/AltairItemSheet.js";
import AltairPlayerSheet from "./module/sheets/AltairPlayerSheet.mjs"
import AltairEnemySheet from "./module/sheets/AltairEnemySheet.js"

Hooks.once("init", async function() {
    console.log("altair | Initializing Altair System");

    CONFIG.altair = altair;
    
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("altair", AltairItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("altair", AltairPlayerSheet, { makeDefault: true });
    Actors.registerSheet("altair", AltairEnemySheet, { makeDefault: false });
});