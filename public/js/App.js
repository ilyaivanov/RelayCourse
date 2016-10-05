import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Link from './Components/link';

class App extends React.Component {
    render() {
        let {store, limit} = this.props;

        let content = store.links.map(l => (<Link key={l._id} link={l}/>));

        return (
            <div>
                <ul>
                    {content}
                </ul>
                <div>Showing: 10 items per page</div>
                <div>Page: 1/2</div>
                <button>prev</button>
                <button>next</button>
            </div>
        );
    }
}

export default Relay.createContainer(App, {
    fragments: {
        store: () => Relay.QL`
        fragment on Store{
            links{_id, ${Link.getFragment('link')}}
        }`
    }
});




