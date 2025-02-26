const { api, sheets } = foundry.applications;

/**
 * AppV2-based sheet for all actor classes
 */

export default class AltairPlayerSheet extends api.HandlebarsApplicationMixin(
    sheets.ActorSheetV2
) {

    get template() {
        const path = "systems/altair/templates/sheets";
        //return `${path}/item-sheet.html`;
        //console.log(`${path}/${this.actor.type}-sheet.hbs`)
        return `${path}/${this.actor.type}-sheet.hbs`;
        //return 'systems/altair/templates/sheets/$(this.item.type}-sheet.html';
    }
    static PARTS = {
        body: {
            template: "systems/altair/templates/sheets/player-sheet.hbs",
            scrollable: [""]
        }
    }
    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ['altair', 'sheet', 'actor', 'standard-form'],
        position: {
            height: 800,
            width: 700
        },
        window: { resizable: true },
        form: {
            submitOnChange: true,
            closeOnSubmit: false,
        }
    }
    
    /*async _preSyncPartState() {
        console.log(super._preSyncPartState());
        return;
    }*/

    async _prepareContext(options) {
        //console.log("test")
        //const baseData = await super._prepareContext(options);
        const playerElements = Object.fromEntries(Object.entries(CONFIG.altair.elements));
        const playerAffinities = Object.fromEntries(Object.entries(CONFIG.altair.affinities));
        const playerRoles = Object.fromEntries(Object.entries(CONFIG.altair.roleTypes));
        const playerGuards = Object.fromEntries(Object.entries(CONFIG.altair.guardTypes));
        const playerShields = Object.fromEntries(Object.entries(CONFIG.altair.shieldTypes));
        const playerSpecies = Object.fromEntries(Object.entries(CONFIG.altair.speciesTypes));
        let sheetData = {
            name: this.actor.name,
            actor: this.actor,
            owner: this.actor.isOwner,
            editable: this.isEditable,
            items: this.items,
            system: this.actor.system,
            config: CONFIG.altair,
            playerElements,
            playerAffinities,
            playerRoles,
            playerGuards,
            playerShields,
            playerSpecies
        };
        return sheetData;
    }

    // choices JS stuff
    /* Doesn't work, breaks scrollbar.
    _onRender(context,options) {
        const hbs = this.element;

        // locates the choice by its id
        const selects = hbs.querySelectorAll('.choice-selector');
        console.log(selects);
        selects.forEach((sel, i) => {
            new Choices(sel, { // initialize Choices on each selector
                removeItemButton: true,
                placeholderValue: "Select elements...",
                shouldSort: false, // I don't want it to be alphabetical
                shouldSortItems: false,
            });
        });
    }*/
}