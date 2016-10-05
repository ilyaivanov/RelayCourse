import React from 'react';
import {render} from 'react-dom';
import App from './App';

import {post} from 'jquery';

let renderApp = links => render(<App limit={4} links={links}/>, document.getElementById("app"));

let API = {
    fetchLinks(){
        post('/graphql', {
            query: `{
              links {
                _id
                title
                url
              }
            }`
        })
            .then(res => renderApp(res.data.links));
    }
};


API.fetchLinks();