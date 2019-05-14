import React from 'react';
import { Subscribe } from 'unstated';
import App from './App';
import MyProfile from './MyProfile';

export default [App.instance, MyProfile.instance];

export {
    App,
    MyProfile,
};

export function wrapContainer(Component,
    extraProps = {},
    ...stores: Array<{ name: string, container: {} }>) {
    return function Wrapper(props) {
        return (
            <Subscribe to={stores.map(store => store.container)}>
                {(...containers) => {
                    const containerDict = containers
                        .reduce((prev, c, i) => ({ ...prev, [stores[i].name]: c }), {});
                    return <Component {...containerDict} {...props} {...extraProps} />;
                }}
            </Subscribe>
        );
    };
}
