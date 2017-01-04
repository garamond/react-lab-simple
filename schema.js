'use strict';

import { getUser, getFriends } from './database'

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    uid: { type: GraphQLInt },
    name: { type: GraphQLString },
    friends: {
      type: new GraphQLList(UserType),
      resolve: ({ uid }) => getFriends(uid)
    }
  }),
});

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        uid: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (_, { uid }) => getUser(uid)
    }
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: ViewerType,
      resolve: () => ({viewer: {}})
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
});
