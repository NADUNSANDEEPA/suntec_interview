import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import Nav from './parts/admin_nav';

const gradientBackground = {
    background: 'linear-gradient(90deg, rgba(212,213,212,1) 0%, rgba(198,198,198,0.4290966386554622) 35%, rgba(198,210,206,1) 100%)',
    borderRadius:'10px',
    marginTop:'4%',
    cursor:"pointer"
}

const BGCARD = {
    background: 'linear-gradient(90deg, rgba(100,121,100,1) 0%, rgba(138,167,105,1) 100%)',
    borderRadius:'8px',
    marginTop:'4%'
}


export default function Index() {

    function products(){
        window.location.href = "/admin/products";
    }
    return (
        <>
            <Nav/>
            <div className='container'>
                <MDBRow style={BGCARD}>
                    <MDBCol sm='6'>
                        <MDBCard className='bg-transparent shadow-0 pb-5 pt-4 ps-5'>
                            <div style={{paddingTop:'7%'}}></div>
                            <MDBTypography style={{fontSize:'50PX' , fontWeight:'600' , color:'black' , letterSpacing:'2px' }} >ADMIN PANEL</MDBTypography>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='6'>
                        <MDBCard className='bg-transparent shadow-0 pb-5 pt-4 ps-5' >
                            <img src="../img/admin.png" style={{ width: '90%'  }}/>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <MDBTypography style={{fontSize:'25PX' , fontWeight:'500' , color:'black' , letterSpacing:'2px' , marginTop:'10%' }} >MAKE YOU ACTION</MDBTypography>
                <hr/>
                <MDBRow style={{marginBottom:'10%'}}>
                    <MDBCol sm='3' >
                        <MDBCard className=' shadow-0' style={gradientBackground} onClick={products}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/pot.png" style={{ width: '70%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-4 text-dark' tag={'h4'}>Flower Pot</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3' >
                        <MDBCard className='shadow-0' style={gradientBackground}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/cus.png" style={{ width: '70%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-4 text-dark' tag={'h4'}>Customers</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3' >
                        <MDBCard className='shadow-0' style={gradientBackground}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/pay.png" style={{ width: '70%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-4 text-dark' tag={'h4'}>Payment</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3'>
                        <MDBCard className='shadow-0' style={gradientBackground}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/feedbacks.png" style={{ width: '70%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-4 text-dark' tag={'h4'}>Feedbacks</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </>
    );
}
