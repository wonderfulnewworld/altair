const { api, sheets } = foundry.applications;

/**
 * AppV2-based sheet for all actor classes
 */

export default class AltairEnemySheet extends api.HandlebarsApplicationMixin(
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
            template: "systems/altair/templates/sheets/enemy-sheet.hbs",
            scrollable: [""]
        }
    }
    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ['altair', 'sheet', 'actor', 'standard-form'],
        position: {
            height: 800,
            width: 1100
        },
        window: { resizable: true },
        actions: {
            editImage: this._onEditImage
        },
        form: {
            submitOnChange: true,
            closeOnSubmit: false,
        }
    }

    async _prepareContext(options) {
        const enemyElements = Object.fromEntries(Object.entries(CONFIG.altair.elements));
        const enemyAffinities = Object.fromEntries(Object.entries(CONFIG.altair.affinities));
        const enemyRoles = Object.fromEntries(Object.entries(CONFIG.altair.roleTypes));
        const enemyGuards = Object.fromEntries(Object.entries(CONFIG.altair.guardTypes));
        const enemyShields = Object.fromEntries(Object.entries(CONFIG.altair.shieldTypes));
        const enemySpecies = Object.fromEntries(Object.entries(CONFIG.altair.speciesTypes));
        let sheetData = {
            name: this.actor.name,
            actor: this.actor,
            owner: this.actor.isOwner,
            editable: this.isEditable,
            items: this.items,
            system: this.actor.system,
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
   * Edit a Document image.
   * Borrowed from v13's implementation, will be removed in v13.
   * @this {AltairPlayerSheet}
   * @type {ApplicationClickAction}
   */
    static async _onEditImage(_event, target) {
        if (target.nodeName !== "IMG") {
            throw new Error("The editImage action is available only for IMG elements.");
        }
        const attr = target.dataset.edit;
        const current = foundry.utils.getProperty(this.document._source, attr);
        const defaultArtwork = this.document.constructor.getDefaultArtwork?.(this.document._source) ?? {};
        const defaultImage = foundry.utils.getProperty(defaultArtwork, attr);
        const fp = new FilePicker({
            current,
            type: "image",
            redirectToRoot: defaultImage ? [defaultImage] : [],
            callback: path => {
                target.src = path;
                if (this.options.form.submitOnChange) {
                    const submit = new Event("submit");
                    this.element.dispatchEvent(submit);
                }
            },
            top: this.position.top + 40,
            left: this.position.left + 10
        });
        await fp.browse();
    }
}