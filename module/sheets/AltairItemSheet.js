export default class AltairItemSheet extends ItemSheet {
    
    get template() {
        const path = "systems/altair/templates/sheets";
        //return `${path}/item-sheet.html`;
        return `${path}/${this.item.type}-sheet.hbs`;
        //return 'systems/altair/templates/sheets/$(this.item.type}-sheet.html';
    }

    async getData(options) {
        const baseData = await super.getData(options);
        let sheetData = {
            owner: this.item.isOwner,
            editable: this.isEditable,
            item: baseData.item,
            system: baseData.item.system,
            config: CONFIG.altair
        };
        return sheetData;
    }
}