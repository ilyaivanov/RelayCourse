import express from 'express';
import {MongoClient} from 'mongodb';
import fs from 'fs';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

let app = express();

app.use(express.static('public'));

(async() => {
    let db = await MongoClient.connect(process.env.MONGO_URL);
    let schema = Schema(db);

    app.use('/graphql', GraphQLHTTP({
        schema,
        graphiql: true
    }));

    app.listen(3000, () => console.log('Lintenning on port 3000'));

    //Generate schema.json

    let json = await graphql(schema, introspectionQuery);
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), error => {
        if (error)
            throw error;
    });
})();