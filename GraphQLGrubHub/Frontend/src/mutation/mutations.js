import { gql } from 'apollo-boost';


const addUserMutation = gql`
    mutation AddUser($first_name: String!, $last_name: String!, $email: String!, $password: String!){
        addUser(first_name: $first_name, last_name: $last_name, email: $email, password:$password ){
            first_name
            last_name
            email
        }
    }
`;


const loginUserMutation = gql`
    mutation LoginUser($email: String!, $password: String!){
        loginUser(email: $email, password:$password ){
            first_name
            last_name
            email
        }
    }
`;


const addOwnerMutation = gql`
    mutation AddOwner($first_name: String!, $last_name: String!, $email: String!, $password: String!, $restaurant_name:String!, $restaurant_zipcode:Int!, $cuisine:String!){
        addOwner(first_name: $first_name, last_name: $last_name, email: $email, password:$password, restaurant_name:$restaurant_name, restaurant_zipcode:$restaurant_zipcode, cuisine:$cuisine ){
            first_name
            last_name
            email
            restaurant_name
            restaurant_zipcode
            cuisine
        }
    }
`;

const loginOwnerMutation = gql`
    mutation LoginOwner($email: String!, $password: String!){
        loginOwner(email: $email, password:$password ){
            first_name
            last_name
            email
        }
    }
`;


const searchRestaurantsMutation = gql`
    mutation Search($restaurant_zipcode: Int!, $dish_name: String!){
        search(restaurant_zipcode: $restaurant_zipcode, dish_name:$dish_name ){
            restaurant_name
        }
    }
`;

export { addUserMutation, searchRestaurantsMutation, loginUserMutation, addOwnerMutation, loginOwnerMutation };


