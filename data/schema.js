import {
    GraphQLSchema,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});

let Schema = db => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        fields: ()=> ({
            links: {
                type: new GraphQLList(linkType),
                resolve: () => db.collection('links').find({}).toArray()
            }
        })
    })
    // mutation:...
});

export default Schema;