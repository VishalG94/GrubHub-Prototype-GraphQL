import axios from 'axios';
import ROOT_URL from '../constants.js'
export const GET_PROFILE = "get_profile";
export const GET_OWNER_PROFILE = "get_owner_profile";
export const GET_USER_IMAGE = "get_user_image";
export const LOGIN_USER = "login_user";
export const PUT_USERNAME = "put_username";
export const SIGNUP_USER = "signup_user";
export const GET_RESTAURANTS = "get_restaurnats";
export const GET_RESTAURANT_DETAILS = "get_restaurnat_details";
export const GET_RESTAURANT_CONTACT = "get_restaurnat_contact";
export const ADD_RESTAURANT_MENU = "add_restaurant_menu";
export const GET_RESTAURANT_MENU = "get_restaurant_menu";
export const GET_RESTAURANT_SECTIONS = "get_restaurant_sections";
export const GET_SECTIONS_MENU = "get_sections_menu";
export const USER_ORDER = "user_order";
export const GET_USER_ORDER = "get_user_order";
export const GET_USER_PAST_ORDERS = "get_user_past_order";
export const ORDER_STATUS = "order_status";
export const DELETE_DISH = "delete_dish";
export const DELETE_SECTION = "delete_section";
export const UPDATE_RESTAURANT_MENU = "delete_section";
export const GET_MENU_DETAILS = "get_menu_details";
export const LOGIN_OWNER = "login_owner";
export const OWNER_SIGNUP = "owner_signup";
export const UPDATE_USER_PHONE = "update_user_phone";
export const UPDATE_USER_EMAIL = "update_user_email";
export const OWNER_DETAILS = "owner_details";
export const MESSAGE_DETAILS = "message_details";

//const  EXTRAS= "3.17.191.255:3001";
// const ROOT_URL = "http://localhost:3001";


export function getProfile(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/userprofile`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getOwnerProfile(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/ownerprofile`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_OWNER_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getUserImage(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/userimage`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_USER_IMAGE,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function loginuser(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/login`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: LOGIN_USER,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function loginowner(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/ownerlogin`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: LOGIN_OWNER,
                payload: res.data
            });
            callback(res);
        })
    }

}

// export const loginuser = (values,callback) => (dispatch, getState)=>{
//     axios.defaults.withCredentials=true;

//         const request = axios
//         .post(`${ROOT_URL}/login`,values);

//         return (dispatch) =>{
//             request.then((res)=>{
//                 // console.log("In get profile response:" + JSON.stringify(res));

//                  dispatch({
//                     type: LOGIN_USER,
//                     payload: res.data
//                 });

//                 // console.log('State: '+getState().user)
//                 callback(res);
//             })
//         }
// }

export function signupUser(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/signup`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: SIGNUP_USER,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function signupOwner(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/ownersignup`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: OWNER_SIGNUP,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function searchrestaurants(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/restaurants`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: GET_RESTAURANTS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getRestaurantDetails(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/restaurantdetails`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get restaurant details:" + JSON.stringify(res));

            dispatch({
                type: GET_RESTAURANT_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function restaurantcontact(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/restaurantcontact`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: GET_RESTAURANT_CONTACT,
                payload: res.data
            });
            callback(res);
        })
    }

}


export function restaurantmenu(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/restaurantmenu`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: ADD_RESTAURANT_MENU,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getrestaurantsections(values, callback) {
    console.log("inside getrestaurantsection action");

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/restaurantsections`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: GET_RESTAURANT_SECTIONS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getSectionsMenu(values, callback) {
    console.log("inside getrestaurantsection action");

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/sectionsmenu`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: GET_SECTIONS_MENU,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function userOrder(values, callback) {
    console.log("inside user order");

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/userorder`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: USER_ORDER,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getUserOrder(values, callback) {
    console.log("inside get user order");

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/orderlist`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: GET_USER_ORDER,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getUserPastOrder(values, callback) {
    console.log("inside get user order");

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/pastorderlist`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: GET_USER_PAST_ORDERS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function orderStatus(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/orderstatus`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: ORDER_STATUS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function deleteDish(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/deletedish`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: DELETE_DISH,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function deleteSection(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/deletesection`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: DELETE_SECTION,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function updaterestaurantmenu(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/updaterestaurantmenu`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: UPDATE_RESTAURANT_MENU,
                payload: res.data
            });
            callback(res);
        })
    }

}




export function menudetails(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/menudetails`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_MENU_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function updateuserphone(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/updateuserphone`, values);
    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_USER_PHONE,
                payload: res.data
            });
            callback(res);
        })
    }
}

export function updateuseremail(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/updateuseremail`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: UPDATE_USER_EMAIL,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function ownerdetails(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/ownerdetails`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: OWNER_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }

}


export function messagedetails(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/messagedetails`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: OWNER_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function postmessage(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${ROOT_URL}/postmessage`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: OWNER_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }

}

// export function ownerdetails(values,callback) {
//     // console.log(values);

//     axios.defaults.withCredentials=true;

//     const request = axios
//     .post(`${ROOT_URL}/ownerlogin`,values);

//     return (dispatch) =>{
//         request.then((res)=>{
//             // console.log("In get profile response:" + JSON.stringify(res));

//             dispatch({
//                 type: LOGIN_OWNER,
//                 payload: res.data
//             });
//             callback(res);
//         })
//     }

// }