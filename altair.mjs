import { altair } from "./module/config.js";
import AltairItemSheet from "./module/sheets/AltairItemSheet.js";
import AltairPlayerSheet from "./module/sheets/AltairPlayerSheet.mjs"
import AltairEnemySheet from "./module/sheets/AltairEnemySheet.mjs"
import AltairActor from "./module/actor.mjs"

Hooks.once("init", async function () {
    console.log("altair | Initializing Altair System");

    CONFIG.altair = altair;
    CONFIG.Actor.documentClass = AltairActor;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("altair", AltairItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("altair", AltairPlayerSheet, { types: ["player"], label: "altair.AltairPlayerSheet", makeDefault: true });
    Actors.registerSheet("altair", AltairEnemySheet, { types: ["enemy"], label: "altair.AltairEnemySheet", makeDefault: true });
});