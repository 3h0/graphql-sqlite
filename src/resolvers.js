// src/resolvers.js
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    async allUsers(root, args, {
      models
    }) {
      return models.User.findAll()
    },
    async user(root, {
      id
    }, {
      models
    }) {
      return models.User.findByPk(id)
    },
    async allRecipes(root, args, {
      models
    }) {
      return models.Recipe.findAll()
    },
    async recipe(root, {
      id
    }, {
      models
    }) {
      return models.Recipe.findByPk(id)
    }
  },

  Mutation: {
    async createUser(root, {
      name,
      email,
      password
    }, {
      models
    }) {
      return models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      })
    },
    async updateUser(root, {
      id,
      name
    }, {
      models
    }) {
      try {
        models.User && models.User.update({
          name
        }, {
          where: {
            id: id
          }
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async deleteUser(root, {
      id
    }, {
      models
    }) {
      return models.User.destroy({
        where: {
          id
        }
      })
    },
    async createRecipe(root, {
      userId,
      title,
      ingredients,
      direction
    }, {
      models
    }) {
      return models.Recipe.create({
        userId,
        title,
        ingredients,
        direction
      })
    },
    async updateRecipe(root, {
      id,
      userId,
      title,
      ingredients,
      direction
    }, {
      models
    }) {
      try {
        models.Recipe && models.Recipe.update({
          userId,
          title,
          ingredients,
          direction
        }, {
          where: {
            id: id
          }
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async deleteRecipe(root, {
      id
    }, {
      models
    }) {
      return models.Recipe.destroy({
        where: {
          id
        }
      })
    },
  },

  User: {
    async recipes(user) {
      return user.getRecipes()
    }
  },
  Recipe: {
    async user(recipe) {
      return recipe.getUser()
    }
  }
}

module.exports = resolvers