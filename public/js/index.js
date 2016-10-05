import React from 'react';
import {render} from 'react-dom';
import App from './App';
import Relay from 'react-relay';

class HomeRoute extends Relay.Route{
    static routeName = 'Home';
    static queries = {
        store: (Component) => Relay.QL`
            query MainQuery{
                store { ${Component.getFragment('store')} }
            }
        `
    }
}

render(
    <Relay.RootContainer
        Component={App}
        route={new HomeRoute()}
    />,
    document.getElementById("app"));

