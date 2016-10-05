import express from 'express';
import {MongoClient} from 'mongodb';

import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';


let app = express();

app.use(express.static('public'));


let db;
MongoClient.connect(process.env.MONGO_URL, (err, database)=> {
    if (err) throw err;

    app.use('/graphql', GraphQLHTTP({
        schema: Schema(database),
        graphiql: true
    }));

    db = database;

    app.listen(3000, () => console.log('Lintenning on port 3000'));
});


app.get('/data/links', (req, res)=> {
    db.collection('links').find({}).toArray((err, links)=> {
        if (err) throw err;

        res.json(links);
    });
});
