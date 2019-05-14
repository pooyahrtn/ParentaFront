import { Container } from 'unstated';
import Storage from './storage';

export default class StoreContainer<State> extends Container {
    constructor({ storeName, persistKeys }) {
        super();
        this.storage = new Storage({
            storeName,
            persistKeys,
        });
    }

    state: State = {}

    async setState(data: State, persist = false) {
        if (persist) {
            this.storage.setState(data);
        }
        return super.setState(data);
    }

    loadSavedData = async () => {
        const storedData = await this.storage.getState();
        if (storedData) {
            return this.setState(storedData);
        }
        return null;
    }
}
