import React from 'react'
import '../../App.css'
// import './RestaurantMenu.css'
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { userOrder } from '../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


class Cart extends React.Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    // alert(this.props);
    this.state = {
      checkout: ''
      
    }
  }
  // }
  componentWillMount () {
    let cart = JSON.parse(sessionStorage.getItem('checkout'))
    this.setState({
      checkout: cart
    })

    // this.props.getrestaurantsections({ params: data }, response => {
    //   // console.log( this.props.user[1])
    //   this.setState(
    //     {
    //       sections: this.props.user
    //     },
    //     () => {
    //       // sessionStorage.setItem('sections', this.state.sections)
    //       // console.log(this.state.restaurantdetails)
    //       // Object.keys(this.state.restaurantdetails).map((restaurant)=>console.log(this.state.restaurantdetails[restaurant].rating))
    //     }
    //   )
    //   sessionStorage.setItem('sections', this.state.sections)

    //   // alert(sessionStorage.getItem('sections'))
    // })



  }

  onSubmit = (e) => {
    e.preventDefault();

    // console.log('OnSubmit' + e.target.getAttribute('price'))
    // alert('inside')
    if( e.target.getAttribute('price')>0){
      // alert('atleast one dishes to the cart before checkouts!')
      let data = {
        order: sessionStorage.getItem('checkout'),
        user_email: sessionStorage.getItem('email'),
        restaurant_name: sessionStorage.getItem('selectedRestaurant'),
        total: e.target.getAttribute('price')
      }
      // alert(data.restaurant_name)
      axios.defaults.withCredentials = true
  
      this.props.userOrder(data, res => {
        if (res.status === 200) {
          console.log('Order placed successfully',res.data);
          // this.props.history.push("/");
          // sessionStorage.setItem({'orderid':res.data[0].order_id})
          this.props.history.push("/userorder");
          // <Link />
        } 
      })
    }else{
      alert('Add atleast one dishes to the cart before checkouts!')
    }
    

  }
  
  render () {
    let itemslist = null
    let items = this.props.data
    let total = 0;
    
    itemslist = Object.keys(items).map(item => {
      // console.log('List',list)
      total = total + Math.round((items[item][1] * items[item][0]) * 100) / 100; 
      // total = total.toFixed();
      return (
        <div>
          <div className='col-sm-6'>
            <div>{item}</div>
          </div>
          <div className='col-sm-3'>
            <div>*{items[item][0]}</div>
          </div>
          <div className='col-sm-3'>
            <div>{items[item][1] * items[item][0]}</div>
          </div>
        </div>
      )
    })
    // this.setState({sum: total})
    // alert(total)

    // console.log(this.props)
    return (
      <div>
        <div className='row'>{itemslist}</div>
        <br/>
        <div>
          <div className='col-sm-6'>
            <label>Total</label>
          </div>
          <div className='col-sm-3'>
            {/* <div>*{items[item][0]}</div> */}
          </div>
          <div className='col-sm-3'>
          <label>$ {total}</label>
          </div>
        </div>
        <br />
        <div className='row'>
          <a
            href='/userorder'
            //   style={{ marginLeft: '537px' }}
            className='btn btn-primary'
            type='submit'
            price={total}
            onClick={this.onSubmit}
          >
            Checkout
          </a>
        </div>
      </div>
    )
  }
}
// console.log("Inside search: ",this.props);

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect( mapStateToProps , {userOrder})(withRouter(Cart));
