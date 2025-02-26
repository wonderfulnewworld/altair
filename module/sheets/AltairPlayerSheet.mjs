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
        template: "systems/altair/templates/sheets/player-sheet.hbs"
    }
    /** @override */
    static DEFAULT_OPTIONS = {
        classes: ['altair', 'sheet', 'actor'],
        position: {
            width: 600
        },
        window: {
            controls: [
                {
                    action: "configurePrototypeToken",
                    icon: "fa-solid fa-user-circle",
                    label: "TOKEN.TitlePrototype",
                    ownership: "OWNER"
                },
                {
                    action: "showPortraitArtwork",
                    icon: "fa-solid fa-image",
                    label: "SIDEBAR.CharArt",
                    ownership: "OWNER"
                },
                {
                    action: "showTokenArtwork",
                    icon: "fa-solid fa-image",
                    label: "SIDEBAR.TokenArt",
                    ownership: "OWNER"
                }
            ]
        },
        form: {
            submitOnChange: true
        },
        actions: {
            configurePrototypeToken: AltairPlayerSheet.#onConfigurePrototypeToken,
            showPortraitArtwork: AltairPlayerSheet.#onShowPortraitArtwork,
            showTokenArtwork: AltairPlayerSheet.#onShowTokenArtwork,
        }
    }

    //get title() {
    //    return `My Module: ${game.i18n.localize(this.options.window.title)}`;
    //}
    /*
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

    /**
     * The Actor document managed by this sheet.
     * @type {ClientDocument}
     */
    get actor() {
        return this.document;
    }

    /* -------------------------------------------- */

    /**
     * If this sheet manages the ActorDelta of an unlinked Token, reference that Token document.
     * @type {TokenDocument|null}
     */
    get token() {
        return this.document.token || null;
    }

    /** @override */
    _getHeaderControls() {
        const controls = this.options.window.controls;

        // Portrait image
        const img = this.actor.img;
        if (img === CONST.DEFAULT_TOKEN) controls.findSplice(c => c.action === "showPortraitArtwork");

        // Token image
        const pt = this.actor.prototypeToken;
        const tex = pt.texture.src;
        if (pt.randomImg || [null, undefined, CONST.DEFAULT_TOKEN].includes(tex)) {
            controls.findSplice(c => c.action === "showTokenArtwork");
        }
        return controls;
    }

    /* -------------------------------------------- */

    //async _renderHTML(context, options) {
    //    return `<p>TESTING</p>`;
    //}

    _replaceHTML(result, content, options) {
        content.insertAdjacentHTML("beforeend", result);
    }

    /* -------------------------------------------- */
    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */

    /**
     * Handle header control button clicks to render the Prototype Token configuration sheet.
     * @this {ActorSheetV2}
     * @param {PointerEvent} event
     */
    static #onConfigurePrototypeToken(event) {
        event.preventDefault();
        const renderOptions = {
            left: Math.max(this.position.left - 560 - 10, 10),
            top: this.position.top
        };
        new CONFIG.Token.prototypeSheetClass(this.actor.prototypeToken, renderOptions).render(true);
    }

    /* -------------------------------------------- */

    /**
     * Handle header control button clicks to display actor portrait artwork.
     * @this {ActorSheetV2}
     * @param {PointerEvent} event
     */
    static #onShowPortraitArtwork(event) {
        const { img, name, uuid } = this.actor;
        new ImagePopout(img, { title: name, uuid: uuid }).render(true);
    }

    /* -------------------------------------------- */

    /**
     * Handle header control button clicks to display actor portrait artwork.
     * @this {ActorSheetV2}
     * @param {PointerEvent} event
     */
    static #onShowTokenArtwork(event) {
        const { prototypeToken, name, uuid } = this.actor;
        new ImagePopout(prototypeToken.texture.src, { title: name, uuid: uuid }).render(true);
    }

    // choices JS stuff
    //I'll try fixing this after..
    /*activateListeners(html) {
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

    }*/
}