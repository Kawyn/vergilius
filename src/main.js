class Vergilius {

    static get row() { return this.#parse()[0].row; }
    static get column() { return this.#parse()[0].column; }

    static get canto() { return this.#parse()[0].function; }
    static get function() { return this.#parse()[0].function; }

    static get cantos() { return this.#parse().map(x => x.function); }
    static get functions() { return this.#parse().map(x => x.function); }

    static get circle() { return this.#parse().map(x => x.file); }
    static get file() { return this.#parse().map(x => x.file); }


    static get circles() { return this.#parse().map(x => x.file); }
    static get files() { return this.#parse().map(x => x.file); }

    static get inferno() { return this.#parse() }
    static get data() { return this.#parse() }

    static #parse() {

        const REGEX = /\s*at\s+(?:(.*?)\s+\()?(.*?):(\d+):(\d+)/;

        const error = new Error('Greetings, (...). I am the man who must be a guide to your journey. You may call me, Vergilius');
        const lines = error.stack.split('\n').slice(3);

        return lines.map(line => {

            const match = line.match(REGEX);

            if (!match)
                return null;

            let [, func, file, row, column] = match;

            
            if (!func)
                func = '<anonymous>';

            const result = {

                row: +row,
                column: +column,

                class: null,
                function: func,

                file: file,
            };


            if (func.includes('.')) {

                const parts = func.split('.');
                result.class = parts.slice(0, -1).join('.');

                func = parts[parts.length - 1];
            }

            return result;

        }).filter(entry => entry !== null);
    }
}

