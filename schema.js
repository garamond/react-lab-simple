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
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    friends: {
      type: new GraphQLList(UserType),
      resolve: ({ id }) => getFriends(id)
    }
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (_, { id }) => getUser(id)
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
});
