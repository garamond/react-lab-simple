'use strict';

import { getUser, getUsers, getViewer, getPet, getPets, getFriends } from './database'

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Viewer') {
      return getViewer(id);
    } if (type === 'Pet') {
      return getPet(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj.id===0) {
      return ViewerType;
    } if (obj.pid) {
      return PetType;
    } else {
      return null;
    }
  }
);
const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: globalIdField('Pet', o => o.pid),
    pid: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString }
  }),
  interfaces: [nodeInterface],
});

var {connectionType: petConnection} =
  connectionDefinitions({nodeType: PetType});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    uid: { type: GraphQLInt },
    name: { type: GraphQLString },
    friends: {
      type: new GraphQLList(UserType),
      resolve: ({ uid }) => getFriends(uid)
    },
    pets: {
      type: petConnection,
      args: connectionArgs,
      resolve: (obj, args) => {
        return connectionFromArray(getPets(obj.uid), args)
      }
    }
  }),
});

/**
 * Wrapper for auth
 */
const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      args: {
        uid: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (_, { uid }) => getUser(uid)
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => getUsers()
    }
  }),
});

/**
 * Root query
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve: () => getViewer()
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
});
