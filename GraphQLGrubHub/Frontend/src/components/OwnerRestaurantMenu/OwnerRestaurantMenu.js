import React, { Component } from 'react'
import '../../App.css'
import './OwnerRestaurantMenu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getRestaurantDetails } from '../../actions'
import { getrestaurantsections } from '../../actions'
import { getSectionsMenu } from '../../actions'
import { deleteSection } from '../../actions'
import { loginuser } from '../../actions'
import { getUserImage } from '../../actions'
import OwnerSectionMenu from './OwnerSectionMenu'
import Cart from '../Cart/Cart'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'

import { Field, reduxForm } from 'redux-form'

// Define a Login Component
class OwnerRestaurantMenu extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      file: '',
      img: '',
      sections: '',
      sectionArr: '',
      restaurantimg: '',
      restaurantnames: '',
      restaurantdetails: '',
      authFlag: false,
      authFailed: false
    }
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    // console.log("inside component will mount")
    let x = JSON.parse(sessionStorage.getItem('ownerdata')).restaurant_name
    // console.log(x)
    let data = {
      restaurant_name: x
    }
    axios.defaults.withCredentials = true

    this.props.getrestaurantsections({ params: data }, response => {
      console.log(this.props.user)
      console.log("section",response.data)
      sessionStorage.setItem('sections', JSON.stringify(response.data));
      this.setState(
        {
          sections: sessionStorage.getItem('sections')
        }
        // ,() => {
        //   sessionStorage.setItem('sections', JSON.stringify(response.data));
        //   alert(this.state.sections)
        //   Object.keys(this.state.restaurantdetails).map((restaurant)=>console.log(this.state.restaurantdetails[restaurant].rating))
        // }
      )
      
      // window.location.reload()
      // sessionStorage.setItem('sections', response.data);
      // alert(sessionStorage.getItem('sections'))
    })

    // this.props.getrestaurantsections(
    //   {
    //     params: {
    //       restaurant_name: sessionStorage.getItem('selectedRestaurant')
    //     }
    //   },
    //   response => {
    //     let temp = null
    //     this.setState(
    //       {
    //         sections: response.data
    //       }
    //       ,
    //       () => {
    //         temp = Object.keys(this.state.sections).map(section => {
    //           console.log('Section', this.state.sections[section].section)})
    //         console.log("data retrieved")
    //         console.log('section',this.state.sections)
    //         sessionStorage.setItem('sections', JSON.stringify(this.state.sections))

    //       }
    //     )
    //     // console.log('section',this.state.sections)
    //     // sessionStorage.setItem('sections', JSON.stringify(this.state.sections))

    //   }
    // )
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteSections = e => {
    e.preventDefault()
    // alert(e.target.getAttribute('id'))
    // alert(e.target.getAttribute('section'))
    // let x = sessionStorage.getItem('selectedRestaurant')
    let data = {
      section: e.target.getAttribute('section'),
      restaurantname: JSON.parse(sessionStorage.getItem('ownerdata')).restaurant_name
      // order_id: e.target.id
    }
    // alert(data)
    axios.defaults.withCredentials = true

    this.props.deleteSection(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })
        // sessionStorage.setItem('email', res.data[0].email)
        // sessionStorage.setItem('username', res.data[0].username)
        // sessionStorage.setItem('cookie', res.data[0].type) // cookies.save('cookie', res.data[0].type, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('userid', res.data[0]._id, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('username', res.data[0].username, {maxAge: 900000, httpOnly: false, path: '/'});
        // this.props.history.push('/home')
        window.location.reload()
      } else {
        alert('Please enter valid credentials')
      }
    })
  }

  render () {
    // redirect based on successful login
    let redirectVar = null
    let invalidtag = null
    let menulist = null
    let resturantslist = null
    let displayCart = null

    if (sessionStorage.getItem('checkout') !== 'new') {
      displayCart = (
        <Cart data={JSON.parse(sessionStorage.getItem('checkout'))} />
      )
    } else {
      displayCart = <div>Add items to your cart</div>
    }

    // let list = sessionStorage.getItem('sections');
    // let list = this.state.sections
    let list = JSON.parse(sessionStorage.getItem('sections'))
    // alert("List", list[0]);
    if (typeof list === 'undefined' || list === null) {
      // console.log('Loading data')
      
      //  window.location.reload();
      resturantslist = <div>Loading data!</div>
      
      // this.setState({
      //   resturantslist : <div>Loading data!</div>
      // })
    } 
    else {
      // console.log('New list'+list);
      resturantslist = Object.keys(list).map(section => {
        // console.log('List'+ list.length)
        // console.log('section: ' +list[section])
        // window.location.reload();
        return (
          <div>
            <h2>{list[section]}</h2>
            <button
              section={list[section]}
              style={{ float: 'center' }}
              className='btn btn-danger'
              onClick={this.deleteSections}
            >
              Delete Section
            </button>

            <div class='list-group'>
              <br />
              <OwnerSectionMenu
                sections={list[section]}
                restaurant={sessionStorage.getItem('selectedRestaurant')}
              />
            </div>
          </div>
        )
      })
      
    }

    // else {
    //   console.log(typeof(list));
    //   resturantslist = Object.keys(list).map(section => {
    //     console.log('List'+ list.length)
    //     return (
    //       <div>
    //         <h2>{list[section].section}</h2>
    //         <button
    //           section={list[section].section}
    //           style={{ float: 'center' }}
    //           className='btn btn-danger'
    //           onClick={this.deleteSection}
    //         >
    //           Delete Section
    //         </button>

    //         <div class='list-group'>
    //           <br />
    //           <OwnerSectionMenu
    //             sections={list[section].section}
    //             restaurant={sessionStorage.getItem('selectedRestaurant')}
    //           />
    //         </div>
    //       </div>
    //     )
    //   })
    // }

    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>* Invalid user name password!</label>
      )
    }
    let updatePic = null

    if (this.state.file !== '') {
      updatePic = (
        <button
          style={{ marginLeft: '537px' }}
          className='btn btn-link'
          type='submit'
        >
          Update
        </button>
      )
    }
    return (
      <div>
        {redirectVar}
        <div className='row'>
          <div className='col-sm-2'>
            <DisplayOwnerNav />
          </div>
          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                <div className='row'>
                  {/* <button
                    onClick={this.cartSummary}
                    className='btn btn-success'
                    style={{
                      float: 'right'
                    }}
                  >
                    Update Cart
                  </button> */}
                </div>

                {/* <div class='main-div'> */}
                {/* <div class='panel'>
                    <div className='row'>
                      <div className='col-sm-4'>
                        <h2>Item</h2>
                      </div>
                      <div className='col-sm-4'>
                        <h2>Quantity</h2>
                      </div>
                      <div className='col-sm-4'>
                        <h2>Price</h2>
                      </div>
                    </div>
                  </div>
                  {displayCart} */}
                {/* </div> */}
              </div>
              {resturantslist}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}
// export Login Component
// export default BuyerProfile

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

// export default connect( mapStateToProps , {getProfile: getProfile, getUserImage:getUserImage})(Search);

export default connect(
  mapStateToProps,
  { getrestaurantsections, getSectionsMenu, deleteSection }
)(
  reduxForm({
    form: 'streamSearch'
    // validate: validate
  })(OwnerRestaurantMenu)
)
