import {
    GraphQLSchema,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';
let store = {};
let Schema = function (db) {
    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: ()=> ({
            links: {
                type: new GraphQLList(linkType),
                resolve: () => db.collection('links').find({}).toArray()
            }
        })
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            _id: {type: GraphQLString},
            title: {type: GraphQLString},
            url: {type: GraphQLString}
        })
    });

    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: ()=> ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        })
    });
};

export default Schema;