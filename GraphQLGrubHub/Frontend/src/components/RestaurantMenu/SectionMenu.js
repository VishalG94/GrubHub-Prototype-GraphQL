import React from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getSectionsMenu } from '../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../../constants.js'

class SectionMenu extends React.Component {
  State = {
    menulist: '',
    currentSection: ''
  }
  componentWillMount () {
    axios.defaults.withCredentials = true
    this.props.getSectionsMenu(
      {
        params: {
          restaurant_name: sessionStorage.getItem('selectedRestaurant'),
          section: this.props.sections
        }
      },
      response => {
        let temp = null
        // console.log("next is temp");
        this.setState(
          {
            menulist: this.props.user
          },
          () => {
            // temp = Object.keys(this.state.menulist).map(menu => {
            // console.log(this.state.menulist[menu])
            // })
            let temp = this.props.sections
            // alert('temp:', temp)
            // console.log("Look here", temp)

            // sessionStorage.setItem({ temp  this.state.menulist})
            this.setState({ currentSection: this.state.menulist })
            sessionStorage.setItem(temp, JSON.stringify(this.state.menulist))
            // console.log("Look here",sessionStorage.getItem('Lunch'));
          }
        )
        // console.log(this.state.menulist)
        sessionStorage.setItem('sections', this.state.sections)
      }
    )
  }

  updatecart = e => {
    let dish = e.target.id
    console.log(dish)
    let cart = sessionStorage.getItem('checkout')
    console.log(cart)
    let operation = e.target.getAttribute('name')
    console.log('operation',operation)
    let price = e.target.getAttribute('price')
    console.log('price',price)
    // console.log('cart', cart);
    // cart = Object.assign(cart, { dish: 1 })
    // sessionStorage.setItem('checkout', cart)

    // let data = {}
    // alert(e.target.id); (cart.hasOwnProperty(dish))
    if (cart === 'new') {
      console.log('inside new', operation)
      if (operation === 'plus') {
        console.log('initial plus to cart')
        cart = {}
        cart[dish] = [1, price]
        sessionStorage.setItem('checkout', JSON.stringify(cart))
        console.log(sessionStorage.getItem('checkout'))
      }
    } else {
      cart = JSON.parse(cart)
      console.log('inside else', cart.hasOwnProperty(dish), operation)
      if (!cart.hasOwnProperty(dish) && operation === "plus") {
        console.log('initial plus to cart')
        cart[dish] = [1, price]
        sessionStorage.setItem('checkout', JSON.stringify(cart))
        console.log(sessionStorage.getItem('checkout'))
      } else if(cart.hasOwnProperty(dish) && operation === "plus") {
        console.log('in cart and plus nth'+ cart[dish][0]);
        cart[dish][0]=cart[dish][0]+1;
        sessionStorage.setItem('checkout', JSON.stringify(cart))
        console.log(sessionStorage.getItem('checkout'))
      } else if (cart.hasOwnProperty(dish) && operation === "minus") {
        console.log('in cart and minus'+ cart[dish][0])
        if(cart[dish][0]>=1){
          cart[dish][0] = (cart[dish][0])-1;
        }
        
        sessionStorage.setItem('checkout', JSON.stringify(cart))
        console.log(sessionStorage.getItem('checkout'))
      }
    }
    window.location.reload()
  }

  render () {
    // console.log('Display: ', this.props.sections)

    let sectionMenu = null
    let temp = JSON.parse(sessionStorage.getItem(this.props.sections))
    // console.log('temp', temp)
    if (typeof temp !== 'undefined' && temp != null) {
      sectionMenu = Object.keys(temp).map(menu => {
        let img = `${ROOT_URL}/images/profilepics/`

        if (temp[menu].image) {
          img = img + temp[menu].image
        } else {
          img = img + 'Menu.png'
        }
        // console.log(JSON.parse(temp[menu]))
        return (
          <a href='#' class='list-group-item list-group-item-action'>
            <div className='row'>
            <div className='col-sm-1'>
            <img
                  class='preview-restaurant-img'
                  // src='http://simpleicon.com/wp-content/uploads/account.png'
                  src={img}
                  alt='Preview Image'
                  width='200'
                  height='200'
                  id={temp[menu]._id}
                />
              </div>
           
              <div className='col-sm-6' style={{marginLeft:'20px'}}>
                <h4 style={{ color: 'black' }}>{temp[menu].dish_name}</h4>
                <div>{temp[menu].description}</div>
              </div>
              <div className='col-sm-3'>
                <label style={{ color: 'black' }}>Price</label>
                <br />
                <div>${temp[menu].price}</div>
                <br />
              </div>
              <div className='col-sm-1'>
                <div id={temp[menu].dish_name}></div>
              </div>
              <div className='col-sm-1'>
                <button
                  id={temp[menu].dish_name}
                  price={temp[menu].price}
                  name='plus'
                  operation = 'plus'
                  type='button'
                  class='btn btn-default'
                  aria-label='Right Align'
                  onClick={this.updatecart}
                >
                  <span
                    name='plus'
                    operation = 'plus'
                    id={temp[menu].dish_name}
                    price={temp[menu].price}
                    class='glyphicon glyphicon-plus-sign'
                    aria-hidden='true'
                  />
                </button>
                <button
                  id={temp[menu].dish_name}
                  price={temp[menu].price}
                  name='minus'
                  operation = 'minus'
                  type='button'
                  class='btn btn-default'
                  aria-label='Right Align'
                  onClick={this.updatecart}
                >
                  <span
                    id={temp[menu].dish_name}
                    price={temp[menu].price}
                    name='minus'
                    operation = 'minus'
                    class='glyphicon glyphicon-minus-sign'
                    aria-hidden='true'
                  />
                </button>
              </div>
            </div>
          </a>
        )
      })
    } else {
      <a href='#' class='list-group-item list-group-item-action'>
        <div className='row'>No records found</div>
      </a>
    }

    return <div>{sectionMenu}</div>
  }
}
// console.log("Inside search: ",this.props);

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getSectionsMenu: getSectionsMenu }
)(
  reduxForm({
    form: 'streamSelectedsMenu'
    // validate: validate
  })(SectionMenu)
)
