import React from 'react';
import { Subscribe } from 'unstated';
import NewsContainer from './News';

export default [NewsContainer,];

export {
    NewsContainer,
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
