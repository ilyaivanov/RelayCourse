import React from 'react';

export default props => <div>
    <ul>
        {props.links.slice(0,props.limit).map(l => <li key={l._id}><a href={l.url}>{l.title}</a></li>)}
    </ul>
    <div>Showing: 10 items per page</div>
    <div>Page: 1/2</div>
    <button>prev</button>
    <button>next</button>
</div>;


