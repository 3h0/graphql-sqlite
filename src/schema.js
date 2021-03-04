// src/schema.js

const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        recipes: [Recipe!]!
      }

    type Recipe {
        id: Int!
        title: String!
        ingredients: String!
        direction: String!
        user: User!
    }

    type Query {
        allUsers: [User!]!
        user(id: Int!): User
        allRecipes: [Recipe!]!
        recipe(id: Int!): Recipe
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
        createRecipe(
          userId: Int!
          title: String!
          ingredients: String!
          direction: String!
        ): Recipe!
        updateUser(id: Int!, name: String): Boolean!
        updateRecipe(
            id: Int!
            userId: Int
            title: String
            ingredients: String
            direction: String
        ): Boolean!
        deleteUser(id: Int!): Boolean!
        deleteRecipe(id: Int!): Boolean!
    }
`

module.exports = typeDefs