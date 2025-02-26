export default class AltairPlayerSheet extends ActorSheet {

    get template() {
        const path = "systems/altair/templates/sheets";
        //return `${path}/item-sheet.html`;
        //console.log(`${path}/${this.actor.type}-sheet.hbs`)
        return `${path}/${this.actor.type}-sheet.hbs`;
        //return 'systems/altair/templates/sheets/$(this.item.type}-sheet.html';
    }

    /** @override */
    static get defaultOptions() {
        console.log(super.defaultOptions);
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['altair', 'sheet', 'actor'],
            width: 1000,
            height: 700,
            scrollY: [".altair-sheet"],
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'features',
                },
            ],
        });
    }

    async getData(options) {
        //console.log("test")
        const baseData = await super.getData(options);
        const playerElements = Object.fromEntries(Object.entries(CONFIG.altair.elements));
        const playerAffinities = Object.fromEntries(Object.entries(CONFIG.altair.affinities));
        const playerRoles = Object.fromEntries(Object.entries(CONFIG.altair.roleTypes));
        const playerGuards = Object.fromEntries(Object.entries(CONFIG.altair.guardTypes));
        const playerShields = Object.fromEntries(Object.entries(CONFIG.altair.shieldTypes));
        const playerSpecies = Object.fromEntries(Object.entries(CONFIG.altair.speciesTypes));
        let sheetData = {
            name: this.actor.name,
            actor: baseData.actor,
            owner: this.actor.isOwner,
            editable: this.isEditable,
            items: baseData.items,
            system: baseData.actor.system,
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
    activateListeners(html) {
        super.activateListeners(html);

        // locates the choice by its id
        const selects = html.find('.choice-selector');
        selects.each((i, sel) => {
            new Choices(sel, { // initialize Choices on each selector
                removeItemButton: true,
                placeholderValue: "Select elements...",
                shouldSort: false, // I don't want it to be alphabetical
                shouldSortItems: false,
            });
        });

    }
}