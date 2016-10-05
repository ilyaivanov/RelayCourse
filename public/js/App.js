import React, {PropTypes} from 'react';

class App extends React.Component {
    static propTypes = {
        limit: PropTypes.number.isRequired
    };

    render() {
        let {links, limit} = this.props;
        return (
            <div>
                <ul>
                    {links.slice(0, limit).map(l => <li key={l._id}><a href={l.url}>{l.title}</a></li>)}
                </ul>
                <div>Showing: 10 items per page</div>
                <div>Page: 1/2</div>
                <button>prev</button>
                <button>next</button>
            </div>
        );
    }
}

export default App;




