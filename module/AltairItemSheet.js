export default class AltairItemSheet extends ItemSheet {
    
    get template() {
        const path = "systems/altair/templates/sheets";
        //return `${path}/item-sheet.html`;
        return `${path}/${this.item.data.type}-sheet.hbs`;
        //return 'systems/altair/templates/sheets/$(this.item.data.type}-sheet.html';
    }

    getData() {
        const baseData = super.getData();
        let sheetData = {
            owner: this.item.isOwner,
            editable: this.isEditable,
            item: baseData.item,
            data: baseData.item.data.data,
            config: CONFIG.altair
        };
        return sheetData;
    }
}