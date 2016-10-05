import {
    GraphQLSchema,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';
import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

let store = {};
let Schema = function (db) {
    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: ()=> ({
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs, //first: .., last:..
                resolve: (_, args) => connectionFromPromisedArray(
                    db.collection('links').find({}).limit(args.first).toArray(),
                    args
                )
            }
        })
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: o => o._id
            },
            title: {type: GraphQLString},
            url: {type: GraphQLString}
        })
    });

    let linkConnection = connectionDefinitions({
        name: "Link",
        nodeType: linkType
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