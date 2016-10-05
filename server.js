import express from 'express';
import {MongoClient} from 'mongodb';

import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';


let app = express();

app.use(express.static('public'));

(async () => {
    let db = await MongoClient.connect(process.env.MONGO_URL);

    app.use('/graphql', GraphQLHTTP({
        schema: Schema(db),
        graphiql: true
    }));

    app.listen(3000, () => console.log('Lintenning on port 3000'));
})();