import React  , {useState , useEffect} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBBtn,
} from 'mdb-react-ui-kit';
import Nav from './Nav';
import Footer from './Footer';


const gradientBackground = {
  background: 'linear-gradient(90deg, rgba(179,226,193,1) 0%, rgba(101,147,150,0.4290966386554622) 35%, rgba(59,147,118,1) 100%)',
};
const cardBg2 ={
  backgroundColor : 'white',
  border : '1px solid #D8D8D8'
};


export default function Login() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const register = (e) => {
    window.location.href = "/user/Register";
  };

  const login_action = (e) => {
   
  };

  return (
    <>
        <Nav/>
        <div style={gradientBackground}>
        <div className='container-fluid'>
        <div className='d-flex align-items-center justify-content-center' style={{paddingBottom:'10%' , paddingTop:'10%'}} >
          <div className='shadow rounded' style={{ width: '430px' , backgroundColor:'white'}}>
            <MDBTypography className='text-center' style={{fontSize:'25PX' , fontWeight:'500' , color:'black' , letterSpacing:'2px' , marginTop:'6%' }} >SIGN IN</MDBTypography>
            <hr/>
            <div className='p-4'>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='text-end'>
              <MDBBtn color='dark' className='btn-block shadow-0' onClick={login_action}>
                LOGIN
              </MDBBtn>
            </div>
            <hr style={{marginTop:'4%'}}/>
            <div className='text-center'  onClick={register} style={{cursor:'pointer'}}>
              <p>SIGN UP</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}