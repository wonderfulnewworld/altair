export default class AltairEnemySheet extends ActorSheet {

    get template() {
        const path = "systems/altair/templates/sheets";
        //return `${path}/item-sheet.html`;
        //console.log(`${path}/${this.actor.type}-sheet.hbs`)
        return `${path}/${this.actor.type}-sheet.hbs`;
        //return 'systems/altair/templates/sheets/$(this.item.type}-sheet.html';
    }

    async getData(options) {
        //console.log("test")
        const baseData = await super.getData(options);
        const enemyElements = Object.fromEntries(Object.entries(CONFIG.altair.elements));
        const enemyAffinities = Object.fromEntries(Object.entries(CONFIG.altair.affinities));
        const enemyRoles = Object.fromEntries(Object.entries(CONFIG.altair.roleTypes));
        const enemyGuards = Object.fromEntries(Object.entries(CONFIG.altair.guardTypes));
        const enemyShields = Object.fromEntries(Object.entries(CONFIG.altair.shieldTypes));
        const enemySpecies = Object.fromEntries(Object.entries(CONFIG.altair.speciesTypes));
        let sheetData = {
            name: this.actor.name,
            actor: baseData.actor,
            owner: this.actor.isOwner,
            editable: this.isEditable,
            items: baseData.items,
            system: baseData.actor.system,
            config: CONFIG.altair,
            enemyElements,
            enemyAffinities,
            enemyRoles,
            enemyGuards,
            enemyShields,
            enemySpecies
        };
        return sheetData;
    }

    /** 
   * After the sheet's HTML is rendered, set up our Choices.js instance 
   */
    activateListeners(html) {
        super.activateListeners(html);

        // Locate the <select> by its id or a unique selector
        const selects = html.find('.choice-selector');
        selects.each((i, sel) => {
            new Choices(sel, { // Initialize Choices on each selector
                removeItemButton: true,    // adds little 'x' next to each selected item
                placeholderValue: "Select elements...",
                shouldSort: false, // I don't want it to be alphabetical
                shouldSortItems: false,
            });
        });

    }
}