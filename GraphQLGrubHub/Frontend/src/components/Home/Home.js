import React, { Component } from 'react'
import '../../App.css'
import './Home.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import GrubhubHome from '../../GrubhubHome.jpg'
// import { Field, reduxForm } from 'redux-form'
import { searchrestaurants } from '../../actions'
import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'
import { searchRestaurantsMutation } from '../../mutation/mutations'
import { getBooksQuery } from '../../queries/queries'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }
  // get the books data from backend
  componentDidMount() {
    let temp = sessionStorage.getItem('email')
    // let data = { email: temp }
    // console.log('Inside will mount: data value is: ' + data.email)  
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // onSubmit = (formValues) => {
  //   // console.log('OnSubmit: ' + formValues)
  //   let data = {
  //     zipcode: formValues.zipcode,
  //     dish_name: formValues.dish
  //   }

  //   axios.defaults.withCredentials = true

  //   this.props.searchrestaurants({ params: data }, (response) => {
  //     // console.log('search test: ' + this.props.user[0].restaurant_name)
  //     console.log("Restaurants: ", response);
  //     let data = response.data.map((restaurant) => {
  //       return restaurant

  //     })

  //     if (!this.props.user[0]) {
  //       console.log('No records found ' + this.props.user[0])
  //     } else {
  //       // console.log('Records found ' + this.props.user[0]);

  //       sessionStorage.setItem('restaurants', data);
  //       this.props.history.push('/search');
  //     }
  //   });
  // }

  submitForm = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(this.state));
    this.props.searchRestaurantsMutation({
      variables: {
        dish_name: this.state.dish,
        restaurant_zipcode: parseInt(this.state.zipcode)
      }
      // refetchQueries: [{ query: getBooksQuery }]
    }).then((response) => {
      // console.log('search test: ' + this.props.user[0].restaurant_name)
      console.log("Restaurants: ", response);
      if (!response) {
        console.log('No records found ' + this.props.user[0])
      } else {
        let data = response.data.search.map((restaurant) => {
          return restaurant.restaurant_name

        })
        console.log(data)
        // var obj = []
        // var result = Object.keys(obj).map(function (key) {
        //   return [Number(key), obj[key]];
        // });
        // console.log('Records found ' + this.props.user[0]);
        sessionStorage.setItem('restaurants', data);
        window.location.replace('/search');
      }
    }).catch((err) => {
      console.log('Error')
    })

  }



  // renderInput = ({ input, placeholder, meta }) => {
  //   return (
  //     // <div class="form-home-group">
  //         <div className='form-group'>
  //           {/* <div htmlFor='email' style={{ color: '#6b6b83' }}>
  //             {label}
  //           </div> */}
  //           {/* <input type="number" id="zipcode" class="form-input-control" placeholder='Zipcode' /> */}
  //           <input class="form-input-control" {...input} placeholder={placeholder} />
  //           {/* {this.renderError(meta)} */}
  //         </div>
  //     // </div>
  //   )
  // }

  render() {
    // iterate over books to create a table row

    // if not logged in go to login page
    let redirectVar = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }
    return (
      // <div>
      //   Home
      // </div>
      <div>
        <div className='overlay'
          style={{ backgroundImage: `url(${GrubhubHome})` }}>

          {/* <div class='main-div'> */}

          {redirectVar}
          <h1 className='title'>
            <span>Who delivers in your neighborhood?</span>
          </h1>
          {/* <div className='login-form'> */}
          {/* <form class="form-inline" onSubmit={this.props.handleSubmit(this.onSubmit)}> */}
          <div>
            <div class="form-home-group">
              <div className='form-group'>

                <input class="form-input-control" name="zipcode" type="number" id="zipcode" onChange={this.inputChangeHandler} placeholder='Zipcode' />


                <input class="form-input-control" name="dish" id="search" onChange={this.inputChangeHandler} placeholder='Pizza, sushi, chinese' />

                {/* <Field name="zipcode" id="zipcode"  component={this.renderInput} placeholder='Zipcode' />
                  <Field name="dish" id="search" component={this.renderInput} placeholder='Pizza, sushi, chinese' /> */}
                <button type='submit' onClick={this.submitForm} className='btn btn-primary'>Find food</button>
              </div>
            </div>
            {/* </form> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    )
  }
}




// const mapStateToProps = state => {
//   return { user: state.user }
// }

// export default connect(
//   mapStateToProps,
//   { searchrestaurants }
// )(
//   reduxForm({
//     form: 'streamHome',
//     // validate: validate
//   })(Home)
// )


export default compose(
  graphql(searchRestaurantsMutation, { name: "searchRestaurantsMutation" }),
  // graphql(loginUserMutation, { name: "loginUserMutation" })
)(Home)