class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error();
        this._initial = config.initial;
        this._state = config.initial;
        this._states = config.states;
        this._nextState = null;
        this._prevState = null;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this._states[state]) throw new Error();
        this._prevState = this._state;
        this._state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this._states[this._state].transitions[event]) throw new Error();
        this._prevState = this._state;
        this._state = this._states[this._state].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this._initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this._states);
        } else {
            let result = [];
            for (let key in this._states) {
                if (event in this._states[key].transitions) {
                    result = [...result, key]
                }
            }
            return result;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._prevState === null) return false;
        this._nextState = this._state;
        this._state = this._prevState;
        this._prevState = null;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this._nextState === null) return false;
        this._state = this._nextState;
        this._nextState = null;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._nextState = null;
        this._prevState = null;

    }
}

module.exports = FSM;