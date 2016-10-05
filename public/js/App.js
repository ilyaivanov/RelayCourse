import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Link from './Components/link';

class App extends React.Component {
    static propTypes = {
        limit: PropTypes.number.isRequired,
        store: PropTypes.object.isRequired,
    };
    static defaultProps = {
        limit: 10
    };

    render() {
        let {store, limit} = this.props;

        let content = store.links.slice(0, limit).map(l => (<Link key={l._id} link={l}/>));

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




