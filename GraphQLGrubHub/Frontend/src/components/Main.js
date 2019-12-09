import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerSignUp from './OwnerSignUp/OwnerSignUp';
import Home from './Home/Home';
import Navbar from './LandingPage/Navbar';
import BuyerProfile from './BuyerProfile/BuyerProfile';
import Search from './Search/Search';
import OwnerProfile from './OwnerProfile/OwnerProfile';
import OwnerDetails from './OwnerDetails/OwnerDetails';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';
import PastOrders from './PastOrders/PastOrders';
import RestaurantOrders from './RestaurantOrders/RestaurantOrders';
import RestaurantPastOrders from './RestaurantPastOrders/RestaurantPastOrders';
import UpdateMenu from './UpdateMenu/UpdateMenu';
import OwnerRestaurantMenu from './OwnerRestaurantMenu/OwnerRestaurantMenu';
import Message from './Message/Message';


//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar} />
                <Route path="/login" component={Login} />
                <Route path="/search" component={Search} />
                <Route path="/buyerprofile" component={BuyerProfile} />
                <Route path="/signup" component={SignUp} />
                <Route path="/ownerlogin" component={OwnerLogin} />
                <Route path="/ownersignup" component={OwnerSignUp} />
                <Route path="/home" component={Home} />
                <Route path="/ownerprofile" component={OwnerProfile} />
                <Route path="/ownerdetails" component={OwnerDetails} />
                <Route path="/menu" component={Menu} />
                <Route path="/restaurantmenu" component={RestaurantMenu} />
                <Route path="/userorder" component={Orders} />
                <Route path="/userpastorder" component={PastOrders} />
                <Route path="/restaurantorders" component={RestaurantOrders} />
                <Route path="/restaurantpastorders" component={RestaurantPastOrders} />
                <Route path="/updatemenu" component={UpdateMenu} />
                <Route path="/ownerrestaurantmenu" component={OwnerRestaurantMenu} />
                <Route path="/message" component={Message} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;