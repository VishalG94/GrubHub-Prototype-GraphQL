import React from 'react'
// import './Button.css'


class DisplayOwnerNav extends React.Component{
  render(){
    console.log(this.props)
    return(
      <div>

<h2>
              <span style={{ marginLeft: '10px', alighText: 'right' }}>
                Your account
              </span>
            </h2>
            <ul style={{ listStyleType: 'none' }}>
              <li className='li-profile'>
                <a href='/ownerprofile' className='navLink active'>
                  <span className='tab'>
                    Profile
                  </span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='/ownerdetails' className='navLink'>
                  <span className='tab'>Address and phone</span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='/ownerrestaurantmenu' className='navLink'>
                  <span className='tab'>Restaurant Menu</span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='/menu' className='navLink'>
                  <span className='tab'>Add menu</span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='/restaurantpastorders' className='navLink'>
                  <span className='tab'>Past orders</span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='/restaurantorders' className='navLink'>
                  <span className='tab'>Upcoming orders</span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='#' className='navLink'>
                  <span className='tab'>Refer a friend</span>
                </a>
              </li>
              <li className='li-profile'>
                <a href='#' className='navLink'>
                  <span className='tab'>Saved restaurants</span>
                </a>
              </li>
            </ul>
</div>




     
);}
  }
  // console.log("Inside search: ",this.props);
  

export default DisplayOwnerNav;