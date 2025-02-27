export default class AltairActor extends Actor {

    // Makes tokens 2x2 by default. Thank you ChaosOS!
    async _preCreate(data, options, user) {
        const allowed = await super._preCreate(data, options, user);
        if (allowed === false) return false
        this.updateSource({ prototypeToken: { width: 2, height: 2 }})
    }
}