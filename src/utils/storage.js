/* eslint-disable camelcase */
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

type Config = {
    storeName: String,
    persistKeys: [String]
};

export default class Store<T> {
    constructor(config: Config) {
        this.storeName = config.storeName;
        this.containerSetState = config.setState;
        this.persistKeys = config.persistKeys;
    }

    getState = async () => {
        const data = await AsyncStorage.getItem(this.storeName);
        if (data) {
            const parsed_data = JSON.parse(data);
            if (this.persistKeys) {
                return _.pick(parsed_data, this.persistKeys);
            }
            return parsed_data;
        }
        return null;
    };


    saveState = async (data) => {
        let prevData = await this.getState();
        if (!prevData) {
            prevData = {};
        }
        return AsyncStorage.setItem(this.storeName, JSON.stringify({ ...prevData, ...data }));
    };

    setState = (state: T) => {
        if (this.persistKeys) {
            const data = _.pick(state, this.persistKeys);
            return this.saveState(data);
        }
        return this.saveState(state);
    }
}
