export default class AltairPlayerSheet extends ActorSheet {

    get template() {
        const path = "systems/altair/templates/sheets";
        //return `${path}/item-sheet.html`;
        return `${path}/${this.actor.data.type}-sheet.hbs`;
        //return 'systems/altair/templates/sheets/$(this.item.data.type}-sheet.html';
    }

    getData() {
        const baseData = super.getData();
        const playerElements = Object.fromEntries(Object.entries(CONFIG.altair.elements).slice(0,5));
        let sheetData = {
            name: this.actor.name,
            actor: baseData.actor,
            owner: this.actor.isOwner,
            editable: this.isEditable,
            items: baseData.items,
            data: baseData.actor.data.data,
            config: CONFIG.altair,
            playerElements
        };
        return sheetData;
    }
}