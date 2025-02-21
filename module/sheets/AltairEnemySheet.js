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
        const baseData =  await super.getData(options);
        const enemyElements = Object.fromEntries(Object.entries(CONFIG.altair.elements).slice(0,5));
        let sheetData = {
            name: this.actor.name,
            actor: baseData.actor,
            owner: this.actor.isOwner,
            editable: this.isEditable,
            items: baseData.items,
            system: baseData.actor.system,
            config: CONFIG.altair,
            enemyElements
        };
        return sheetData;
    }
}