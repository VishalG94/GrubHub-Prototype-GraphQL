import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;


const loginUserQuery = gql`
query loginUser($email:String!, $password:String!)
    {
        loginuser(email:$email, password:$password) {
            first_name
            last_name
            email
        }
    }
`;

export { getBooksQuery, loginUserQuery };