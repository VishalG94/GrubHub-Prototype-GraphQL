const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLInt } = graphql;

var users = [
    { id: 1, first_name: 'Vishal', last_name: 'Gadapa86', email: 'vishalgadapa86@gmail.com', password: 'Vishal' },
    { id: 2, first_name: 'Vishal', last_name: 'G', email: 'vishalg@gmail.com', password: 'Vishal' },
    { id: 3, first_name: 'Vishal', last_name: 'Gadapa', email: 'vishalgadapa@gmail.com', password: 'Vishal' },
    { id: 4, first_name: 'Vishal', last_name: 'No', email: 'vishal@gmail.com', password: 'Vishal' }
]

var owners = [
    {
        id: 1, first_name: 'Vishal', last_name: 'Gadapa86', email: 'vishalgadapa86@gmail.com', password: 'Vishal',
        restaurant_name: 'New Bawarchi',
        restaurant_zipcode: 95126,
        cuisine: 'Indian',
        image: 'myImage_1573083398019.png'
    },
    {
        id: 2, first_name: 'Vishal', last_name: 'G', email: 'vishalg@gmail.com', password: 'Vishal',
        restaurant_name: 'Dominoz',
        restaurant_zipcode: 95126,
        cuisine: 'Indian',
        image: 'myImage_1573083398019.png'
    },
    {
        id: 3, first_name: 'Vishal', last_name: 'Gadapa', email: 'vishalgadapa@gmail.com', password: 'Vishal',
        restaurant_name: 'Ruchulu',
        restaurant_zipcode: 95126,
        cuisine: 'Indian',
        image: 'myImage_1573083398019.png'
    },
    {
        id: 4, first_name: 'Vishal', last_name: 'No', email: 'vishal@gmail.com', password: 'Vishal',
        restaurant_name: 'Bawarchi',
        restaurant_zipcode: 95126,
        cuisine: 'Indian',
        image: 'myImage_1573083398019.png'
    }
]

var menus = [
    {
        id: 1,
        dish_name: 'Chicken Biryani',
        description: 'Biryani rice, Chicken..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Ruchulu',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 2,
        dish_name: 'Mutton Biryani',
        description: 'Biryani rice, mutton..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Ruchulu',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 3,
        dish_name: 'Prawn Biryani',
        description: 'Biryani rice, prawn..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Ruchulu',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 4,
        dish_name: 'Chicken Biryani',
        description: 'Biryani rice, Chicken..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Bawarchi',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 5,
        dish_name: 'Mutton Biryani',
        description: 'Biryani rice, mutton..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Bawarchi',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 6,
        dish_name: 'Prawn Biryani',
        description: 'Biryani rice, prawn..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Bawarchi',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },

    {
        id: 7,
        dish_name: 'Chicken Biryani',
        description: 'Biryani rice, Chicken..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'New Bawarchi',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 8,
        dish_name: 'Mutton Biryani',
        description: 'Biryani rice, mutton..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'New Bawarchi',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 9,
        dish_name: 'Prawn Biryani',
        description: 'Biryani rice, prawn..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'New Bawarchi',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },

    {
        id: 10,
        dish_name: 'Chicken Biryani',
        description: 'Biryani rice, Chicken..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Dominoz',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 11,
        dish_name: 'Mutton Biryani',
        description: 'Biryani rice, mutton..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Dominoz',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    },
    {
        id: 12,
        dish_name: 'Prawn Biryani',
        description: 'Biryani rice, prawn..',
        price: 12,
        section: 'Dinner',
        restaurant_name: 'Dominoz',
        restaurant_zipcode: 95126,
        image: 'myImage_1573046251352.png'
    }
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
        // modified: { type: GraphQLString },
        // created: { type: GraphQLString }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        restaurant_zipcode: { type: GraphQLInt },
        cuisine: { type: GraphQLString },
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        phone: { type: GraphQLInt },
        image: { type: GraphQLString },
        menu: {
            type:
                new GraphQLList(
                    MenuType
                )
            ,
            resolve(parent, args) {
                return _.filter(menus, { restaurant_name: parent.restaurant_name })
            }
        }
        // modified: { type: GraphQLString },
        // created: { type: GraphQLString }
    })
})


const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        id: { type: GraphQLID },
        dish_name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        section: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        restaurant_zipcode: { type: GraphQLInt },
        image: { type: GraphQLString },
        // modified: { type: GraphQLString },
        // created: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(users, { email: args.email })
            }
        }
        ,
        owner: {
            type: OwnerType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(owners, { email: args.email })
            }
        },
        menu: {
            type: new GraphQLList(MenuType),
            args: { restaurant_name: { type: GraphQLString } },
            resolve(parent, args) {
                return _.filter(menus, { restaurant_name: args.restaurant_name })
            }
        }


    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})