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
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from 'mdb-react-ui-kit';

function Index() {
  const [openBasic, setOpenBasic] = useState(false);

  function register(){
    window.location.href = "/user/Register";
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
              <MDBNavbarLink className='fw-normal text-uppercase' active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='ps-4'>
              <MDBNavbarLink className='fw-normal text-uppercase' active aria-current='page' href='#'>
                About
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='ps-4'>
              <MDBNavbarLink className='fw-normal text-uppercase' active aria-current='page' href='#'>
                Contact
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className='d-flex input-group w-auto'>
            <MDBBtn className='shadow-0 pt-3 pb-3' style={{border:'1px solid #364742' , backgroundColor:'white' , fontWeight:'700' , fontSize:'15px' , color:'#364742'}} onClick={register}>REGISTER</MDBBtn>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}

export default Index;
