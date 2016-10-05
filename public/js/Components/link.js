import React from 'react';
import Relay from 'react-relay';

let Link = props => (<li>
    <a href={props.link.url}>{props.link.title}</a>
</li>);

export default Relay.createContainer(Link, {
    fragments: {
        link: () => Relay.QL`
        fragment on Link{url, title}`
    }
});