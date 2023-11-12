import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse,
  } from 'mdb-react-ui-kit';
  import Swal from 'sweetalert2';

function Index() {
  const [openBasic, setOpenBasic] = useState(false);

  function logout() {
      Swal.fire({
          title: 'Logout',
          text: 'Are you sure you want to logout?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  title: 'Logged Out',
                  text: 'You have been successfully logged out.',
                  icon: 'success',
                  timer: 2000, 
                  showConfirmButton: false
              });
          }
      });
  }


  return (
    <>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer >
        <MDBNavbarBrand href='#'>
          <img src='../img/flower.ico' style={{width:'90%'}} />
          <h5 className='fw-bold' style={{fontSize:'23px'}}>B-FLOWER</h5>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem className='ps-4'>
              <MDBNavbarLink className='fw-normal text-uppercase' active aria-current='page' href='/user/Dashboard'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='ps-4'>
              <MDBNavbarLink className='fw-normal text-uppercase' active aria-current='page' href='/user/Cart'>
                Cart
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='ps-4'>
              <MDBNavbarLink className='fw-normal text-uppercase' active aria-current='page' href='#'>
                Buying History
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className='d-flex input-group w-auto'>
            <MDBBtn className='shadow-0 pt-3 pb-3' style={{border:'1px solid #364742' , backgroundColor:'white' , fontWeight:'700' , fontSize:'15px' , color:'#364742'}} onClick={logout}>LogOut</MDBBtn>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}

export default Index;
