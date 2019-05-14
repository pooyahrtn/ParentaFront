import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { AsyncStorage } from 'react-native';

const TokenKey = 'HEADER_TOKEN';
type Config = {
    baseUrl: boolean,
    onNotAuthorized: () => void,
}
export default class AxiosProvider {
    constructor(config: Config) {
        const { baseUrl, onNotAuthorized } = config;
        this.onNotAuthorized = onNotAuthorized;

        this.instance = axios.create({
            baseURL: baseUrl,
            timeout: 4000,
            withCredentials: true,
        });
        AsyncStorage.getItem(TokenKey).then((token) => {
            if (token) {
                this.instance.defaults.headers.Authorization = `Token ${token}`;
            }
        });
    }

    setToken = async (token) => {
        await AsyncStorage.setItem(TokenKey, token);
        this.instance.defaults.headers.Authorization = `Token ${token}`;
    }

    clearToken = () => AsyncStorage.clear(TokenKey);

    fetch = async (method: () => AxiosPromise) => {
        try {
            const res = await method();
            return {
                ok: res.status >= 200 && res.status <= 300,
                status: res.status,
                data: res.data,
                error: null,
                header: res.headers
            };
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return {
                    ok: false,
                    error: error.response.data,
                    status: error.response.status,
                    data: null,
                    header: error.response.headers
                };
            }
            if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance
                //  of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                return {
                    ok: false,
                    error: error.request,
                    status: null,
                    data: null,
                    header: null
                };
            }
            return {
                ok: false,
                error: error.message,
                status: null,
                data: null,
                header: null
            };
        }
    }

    exec = async (method: (config: AxiosRequestConfig) => AxiosPromise, withAuth = false) => {
        const fetchMethod = () => method();
        const res = await this.fetch(fetchMethod);
        if (res.status === 401 && this.onNotAuthorized && withAuth) {
            await AsyncStorage.setItem(TokenKey, '');
            this.onNotAuthorized();
        }
        // console.warn({res});
        return res;
    }

    post = (address: string, body: any, config = { withAuth: false, headers: {} }) => {
        const method = () => this.instance.post(address, body, { headers: config.headers });
        return this.exec(method, config.withAuth);
    }

    get = (address: string, config = { withAuth: false, page: null }) => {
        const params = {};
        if (config.page) {
            params.page = config.page;
        }
        const method = () => this.instance.get(address);
        return this.exec(method, config.withAuth);
    }
}
