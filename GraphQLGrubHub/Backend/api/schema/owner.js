const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLInt } = graphql;

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