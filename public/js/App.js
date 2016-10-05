import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Link from './Components/link';

class App extends React.Component {
    render() {
        let {store, limit} = this.props;

        let content = store.linkConnection.edges.map(edge => (<Link key={edge.node.id} link={edge.node}/>));

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
    initialVariables:{
        limit: 3
    },
    fragments: {
        store: () => Relay.QL`
        fragment on Store{
            linkConnection(first:$limit){ edges { node {id, ${Link.getFragment('link')}}}}
        }`
    }
});




