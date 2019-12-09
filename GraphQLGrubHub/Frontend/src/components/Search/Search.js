import React, { Component } from 'react'
import '../../App.css'
import './Search.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getRestaurantDetails } from '../../actions'
import { loginuser } from '../../actions'
import { getUserImage } from '../../actions'
import Display from '../Display/Display'
import { connect } from 'react-redux'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'

import { graphql, compose } from 'react-apollo'
import { searchRestaurantsMutation } from '../../mutation/mutations'
import { getBooksQuery } from '../../queries/queries'
// import { Field, reduxForm } from 'redux-form'

// Define a Login Component
class Search extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      file: '',
      img: '',
      filter: '',
      restaurantimg: '',
      restaurantnames: '',
      restaurantdetails: '',
      todos: [],
      currentPage: 1,
      todosPerPage: 5,
      authFlag: false,
      authFailed: false
    }
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    sessionStorage.setItem('checkout', 'new')
    let path = process.env.PUBLIC_URL
    let restaurantImgPath = process.env.PUBLIC_URL
    path = path + '/profilepics/Avatar.png'
    restaurantImgPath = restaurantImgPath + '/profilepics/Restaurant_Img.png'
    this.setState({
      authFlag: false,
      authFailed: false,
      filter: '',
      img: path,
      restaurantimg: restaurantImgPath,
      restaurantnames: restaurants
    })

    let restaurants = []
    if (sessionStorage.getItem('restaurants') != null) {
      restaurants = sessionStorage.getItem('restaurants')
    }

    let data = {
      details: restaurants
    }
    axios.defaults.withCredentials = true

    this.props.getRestaurantDetails({ params: data }, response => {
      // console.log( this.props.user[1])
      this.setState(
        {
          restaurantdetails: this.props.user,
          todos: response.data
        },
        () => {
          // console.log(this.state.restaurantdetails)
          // Object.keys(this.state.restaurantdetails).map((restaurant)=>console.log(this.state.restaurantdetails[restaurant].rating))
        }
      )
    })

    let temp = sessionStorage.getItem('email')

    let imgdata = { email: temp }

    // axios.post('http://localhost:3001/ownerimage', imgdata ).then(response => {
    //   // update the state with the response data
    //   if(response.status===200){
    //     console.log('Axios get:', response.data)
    //     this.setState({
    //       restaurantimg: 'data:image/png;base64, ' + response.data
    //     })
    //   }

    // })
  }
  handleClick = event => {
    this.setState(
      {
        currentPage: Number(event.target.id)
      },
      () => {
        // alert(this.state.currentPage, )
      }
    )
  }

  selectRestaurant = e => {
    // console.log(e.target.id);
    let temp = e.target.id
    // alert(e.target.id);
    sessionStorage.setItem('selectedRestaurant', temp)
  }

  OnClickfilter = e => {
    let filterData = null
    let filter = []
    let count = 0
    let filterList = this.state.todos
    // console.log(filterList[0].cuisine);
    filterData = Object.keys(filterList).map(restaurant => {
      count += 1
      // console.log(filterList[restaurant].cuisine)
      // console.log(this.state.filter)
      if (typeof filterList[restaurant] !== 'undefined') {
        if (filterList[restaurant].cuisine === this.state.filter) {
          console.log(filterList[restaurant].cuisine)
          filter.push(filterList[restaurant])
          return filterList[restaurant]
        }
      }
    })
    this.setState({ restaurantdetails: filter, todos: filter }, () => {
      // window.location.reload()
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  imageChangeHandler = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  render() {
    // redirect based on successful login
    let redirectVar = null
    let invalidtag = null
    let editname = null
    let editpassword = null
    let editcontact = null
    let resturantslist = null

    const { todos, currentPage, todosPerPage } = this.state
    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
    console.log(indexOfFirstTodo, indexOfLastTodo)
    console.log(currentTodos)
    // let list = this.state.restaurantdetails
    let list = currentTodos


    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          class='page-item'
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          <a
            class='page-link'
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </a>
        </li>
      )
    })
    resturantslist = Object.keys(list).map(
      restaurant => {
        // alert(list[restaurant].sections)
        //  return( <a href="/restaurantmenu" id={list[restaurant].restaurant_name} class="list-group-item list-group-item-action" onClick={this.selectRestaurant(this.id)}>
        //       <Display image={list[restaurant].image}  restaurant_name={list[restaurant].restaurant_name} sections={list[restaurant].sections} rating={list[restaurant].rating}/>
        //   </a>
        //  )
        // alert(list[restaurant].image)
        return (
          <a
            href='/restaurantmenu'
            id={list[restaurant].restaurant_name}
            class='list-group-item list-group-item-action'
            onClick={this.selectRestaurant}
          >
            <Display
              id={list[restaurant].restaurant_name}
              image={list[restaurant].image}
              restaurant_name={list[restaurant].restaurant_name}
              sections={list[restaurant].sections}
              cuisine={list[restaurant].cuisine}
              rating={list[restaurant].rating}
            />
          </a>
        )
      }
    )

    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
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
            <BuyerOwnerNav />
          </div>

          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                {/* <div class='main-div'> */}
                <div class='panel'>
                  <h2>Your account</h2>
                  <input
                    class='form-input-control'
                    onChange={this.inputChangeHandler}
                    name='filter'
                    id='filter'
                    placeholder='Cuisine'
                  />
                  <button
                    className='btn btn-success'
                    onClick={this.OnClickfilter}
                  >
                    Filter
                  </button>
                  {/* {invalidtag} */}
                </div>

                <div class='list-group'>{resturantslist}</div>
                <br />
                <div style={{ textAlign: 'center' }}>
                  {/* <ul>{renderTodos}</ul> */}
                  <nav aria-label='Page navigation example'>
                    <ul class='pagination' id='page-numbers'>
                      {renderPageNumbers}
                    </ul>
                  </nav>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   }
// }

// export default connect(
//   mapStateToProps,
//   { getRestaurantDetails: getRestaurantDetails }
// )(
//   reduxForm({
//     form: 'streamSearch'
//     // validate: validate
//   })(Search)
// )


export default compose(
  graphql(searchRestaurantsMutation, { name: "searchRestaurantsMutation" }),
  // graphql(loginUserMutation, { name: "loginUserMutation" })
)(Search)