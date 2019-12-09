const graphql = require('graphql');
const _ = require('lodash');
const menus = require('../models/menu')
const owners = require('../models/owner')
const users = require('../models/user')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const db = {}
var dateforamt = require('dateformat')
app.use(bodyParser.json())
const bcrypt = require('bcrypt')
const saltRounds = 10
const crypt = require('../config/crypt')
const upload = require('../config/multer')
const fs = require('fs')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var kafka = require("../../kafka/client");

var requireAuth = passport.authenticate('jwt', { session: false })

app.use(passport.initialize())
app.use(passport.session())
// Bring in defined Passport Strategy
require('../config/passport')(passport)
const { GraphQLSchema, GraphQLNonNull, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        modified: { type: GraphQLString },
        created: { type: GraphQLString }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        restaurant_name: { type: new GraphQLNonNull(GraphQLString) },
        restaurant_zipcode: { type: new GraphQLNonNull(GraphQLInt) },
        cuisine: { type: new GraphQLNonNull(GraphQLString) },
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        phone: { type: GraphQLInt },
        image: { type: GraphQLString },
        modified: { type: GraphQLString },
        created: { type: GraphQLString },
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
    })
})


const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        id: { type: GraphQLID },
        dish_name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        restaurant_name: { type: new GraphQLNonNull(GraphQLString) },
        restaurant_zipcode: { type: new GraphQLNonNull(GraphQLInt) },
        image: { type: GraphQLString },
        modified: { type: GraphQLString },
        created: { type: GraphQLString }
    })
})

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        // loginuser: {
        //     type: UserType,
        //     args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
        //     async resolve(parent, args) {
        //         let userprofile = await users
        //             .find({
        //                 email: args.email,
        //                 password: args.password
        //             }).then((res) => {
        //                 console.log(res)
        //                 // return res;
        //             }).catch(err => {
        //                 console.log('Error occured logging in' + err)
        //                 // return err
        //             })
        //         return userprofile
        //     }
        // }
        // ,
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                // id: { type: GraphQLID },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                var id = mongoose.Types.ObjectId()
                let pswd = args.password
                let usr = new users({
                    _id: id,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    password: pswd
                })

                let userProfile = await usr
                    .save()
                    .then(response => {
                        console.log('response' + response)
                    })
                    .catch(err => {
                        console.log('Error occured while inserting data in DB' + err)
                    })
                return userProfile
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let userProfile = await
                    users
                        .findByIdAndUpdate(args.id,
                            { $set: { first_name: args.first_name, last_name: args.last_name, email: args.email, passport: args.password } }
                        )
                return userProfile
            }
        },
        loginUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let userProfile = await users
                    .find(args, (err, res) => {
                        // console.log(res);
                    })
                console.log(userProfile)
                return userProfile[0]
            }
        }
        ,
        getUserProfile: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let userProfile = await users
                    .find(args, (err, res) => {
                        // console.log(res);
                    })
                console.log(userProfile)
                return userProfile[0]
            }
        }
        ,
        loginOwner: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let userProfile = await owners
                    .find(args, (err, res) => {
                    })
                console.log(userProfile)
                return userProfile[0]

            }
        }
        ,
        getmenu: {
            type: new GraphQLList(MenuType),
            args: {
                restaurant_name: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let menulist = await menus
                    .find(args, (err, res) => {
                        // console.log(res);
                    })
                console.log(menulist)
                return menulist

            }
        }
        ,
        addOwner: {
            type: OwnerType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                restaurant_name: { type: GraphQLString },
                restaurant_zipcode: { type: GraphQLInt },
                cuisine: { type: GraphQLString },
            },
            resolve(parent, args) {
                var id = mongoose.Types.ObjectId()
                let owner = new owners({
                    _id: id,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    password: args.password,
                    restaurant_name: args.restaurant_name,
                    restaurant_zipcode: args.restaurant_zipcode,
                    cuisine: args.cuisine
                })
                return owner
                    .save()
                    .then(response => {
                        console.log('response' + response)
                        return response
                    })
                    .catch(err => {
                        console.log('Error occured while inserting data in DB' + err)
                        return err
                    })
            }
        },
        getOwnerProfile: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let ownerProfile = await owners
                    .find(args, (err, res) => {
                        // console.log(res);
                    })
                console.log(ownerProfile)
                return ownerProfile[0]
            }
        },
        search: {
            type: new GraphQLList(MenuType),
            args: {
                dish_name: { type: GraphQLString },
                restaurant_zipcode: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                let searchRestaurants = await
                    // menus.aggregate(
                    //     [
                    //         { "$group": { "_id": { dish_name: new RegExp(args.dish_name, 'i'), restaurant_zipcode: args.restaurant_zipcode } } }
                    //     ]
                    // );
                    menus
                        .distinct('restaurant_name', {
                            dish_name: new RegExp(args.dish_name, 'i'),
                            restaurant_zipcode: args.restaurant_zipcode
                        })
                var obj = [];
                searchRestaurants.forEach(function (data) {
                    obj.push({ restaurant_name: data });

                });
                console.log(obj)

                return obj
            }
        },
        updateOwner: {
            type: OwnerType,
            args: {
                id: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                restaurant_name: { type: GraphQLString },
                restaurant_zipcode: { type: GraphQLInt },
                cuisine: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let ownerProfile = await
                    owners
                        .findByIdAndUpdate(args.id,
                            { $set: { first_name: args.first_name, last_name: args.last_name, email: args.email, passport: args.password, restaurant_name: args.restaurant_name, restaurant_zipcode: args.restaurant_zipcode, cuisine: args.cuisine } }
                        )
                return ownerProfile
            }
        },
        addMenu: {
            type: MenuType,
            args: {
                // id: { type: GraphQLID },
                dish_name: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLInt },
                section: { type: GraphQLString },
                restaurant_name: { type: GraphQLString },
                restaurant_zipcode: { type: GraphQLInt },
                image: { type: GraphQLString }
            },
            resolve(parent, args) {
                var id = mongoose.Types.ObjectId()
                console.log('Req Body : ', args)
                let mnu = new menus({
                    _id: id,
                    dish_name: args.dish_name,
                    description: args.description,
                    price: args.price,
                    section: args.section,
                    restaurant_name: args.restaurant_name,
                    restaurant_zipcode: args.restaurant_zipcode
                })
                return mnu
                    .save()
                    .then(response => {
                        console.log('response' + response)
                        return response
                    })
                    .catch(err => {
                        console.log('Error occured while inserting data in DB' + err)
                        return err
                    })
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

// users = [
    //     { id: 1, first_name: 'Vishal', last_name: 'Gadapa86', email: 'vishalgadapa86@gmail.com', password: 'Vishal' },
    //     { id: 2, first_name: 'Vishal', last_name: 'G', email: 'vishalg@gmail.com', password: 'Vishal' },
    //     { id: 3, first_name: 'Vishal', last_name: 'Gadapa', email: 'vishalgadapa@gmail.com', password: 'Vishal' },
    //     { id: 4, first_name: 'Vishal', last_name: 'No', email: 'vishal@gmail.com', password: 'Vishal' }
    // ]

    // var owners = [
    //     {
    //         id: 1, first_name: 'Vishal', last_name: 'Gadapa86', email: 'vishalgadapa86@gmail.com', password: 'Vishal',
    //         restaurant_name: 'New Bawarchi',
    //         restaurant_zipcode: 95126,
    //         cuisine: 'Indian',
    //         image: 'myImage_1573083398019.png'
    //     },
    //     {
    //         id: 2, first_name: 'Vishal', last_name: 'G', email: 'vishalg@gmail.com', password: 'Vishal',
    //         restaurant_name: 'Dominoz',
    //         restaurant_zipcode: 95126,
    //         cuisine: 'Indian',
    //         image: 'myImage_1573083398019.png'
    //     },
    //     {
    //         id: 3, first_name: 'Vishal', last_name: 'Gadapa', email: 'vishalgadapa@gmail.com', password: 'Vishal',
    //         restaurant_name: 'Ruchulu',
    //         restaurant_zipcode: 95126,
    //         cuisine: 'Indian',
    //         image: 'myImage_1573083398019.png'
    //     },
    //     {
    //         id: 4, first_name: 'Vishal', last_name: 'No', email: 'vishal@gmail.com', password: 'Vishal',
    //         restaurant_name: 'Bawarchi',
    //         restaurant_zipcode: 95126,
    //         cuisine: 'Indian',
    //         image: 'myImage_1573083398019.png'
    //     }
    // ]

    // var menus = [
    //     {
    //         id: 1,
    //         dish_name: 'Chicken Biryani',
    //         description: 'Biryani rice, Chicken..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Ruchulu',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 2,
    //         dish_name: 'Mutton Biryani',
    //         description: 'Biryani rice, mutton..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Ruchulu',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 3,
    //         dish_name: 'Prawn Biryani',
    //         description: 'Biryani rice, prawn..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Ruchulu',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 4,
    //         dish_name: 'Chicken Biryani',
    //         description: 'Biryani rice, Chicken..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Bawarchi',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 5,
    //         dish_name: 'Mutton Biryani',
    //         description: 'Biryani rice, mutton..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Bawarchi',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 6,
    //         dish_name: 'Prawn Biryani',
    //         description: 'Biryani rice, prawn..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Bawarchi',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },

    //     {
    //         id: 7,
    //         dish_name: 'Chicken Biryani',
    //         description: 'Biryani rice, Chicken..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'New Bawarchi',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 8,
    //         dish_name: 'Mutton Biryani',
    //         description: 'Biryani rice, mutton..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'New Bawarchi',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 9,
    //         dish_name: 'Prawn Biryani',
    //         description: 'Biryani rice, prawn..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'New Bawarchi',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },

    //     {
    //         id: 10,
    //         dish_name: 'Chicken Biryani',
    //         description: 'Biryani rice, Chicken..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Dominoz',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 11,
    //         dish_name: 'Mutton Biryani',
    //         description: 'Biryani rice, mutton..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Dominoz',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     },
    //     {
    //         id: 12,
    //         dish_name: 'Prawn Biryani',
    //         description: 'Biryani rice, prawn..',
    //         price: 12,
    //         section: 'Dinner',
    //         restaurant_name: 'Dominoz',
    //         restaurant_zipcode: 95126,
    //         image: 'myImage_1573046251352.png'
    //     }
    // ]