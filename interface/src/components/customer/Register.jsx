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
import Nav from './parts/Nav';
import Footer from './Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

const gradientBackground = {
  background: 'linear-gradient(90deg, rgba(179,226,193,1) 0%, rgba(101,147,150,0.4290966386554622) 35%, rgba(59,147,118,1) 100%)',
};

export default function Register() {

  const [email, setEmail] = useState('');
  const [validateEmail, setValidateEmail] = useState('');
  const [validateEmailColor, setValidateEmailColor] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [nic, setNic] = useState('');
  const [validateNic, setValidateNic] = useState('');
  const [validateNicColor, setValidateNicColor] = useState('');
  const [password, setPassword] = useState('');
  const [validatePass, setValidatePass] = useState('');
  const [validatePassColor, setValidatePassColor] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validateCPass, setValidateCPass] = useState('');
  const [validateCPassColor, setValidateCPassColor] = useState('');
  const [telephone, setTelephone] = useState('');
  const [validateTel, setValidateTel] = useState('');
  const [validateTelColor, setValidateTelColor] = useState('');

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(enteredPassword);
    const hasLowerCase = /[a-z]/.test(enteredPassword);
    const hasNumber = /\d/.test(enteredPassword);

    const isPasswordValid =
      enteredPassword.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber;

    if (isPasswordValid) {
      setValidatePass('Valid Password');
      setValidatePassColor('green');
    } else {
      setValidatePass('Invalid Password');
      setValidatePassColor('red');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);

    // Check if the confirmation password matches the entered password
    const isPasswordMatch = enteredConfirmPassword === password;

    if (isPasswordMatch) {
      setValidateCPass('Password Match');
      setValidateCPassColor('green');
    } else {
      setValidateCPass('Password does not match');
      setValidateCPassColor('red');
    }
  };

  const validateNicRedux = (nic) => {
    const nicRegex = /^[0-9]{9}[vVxX]$/;
    return nicRegex.test(nic);
  };

  const handleNicChange = (e) => {
    const enteredNic = e.target.value;
    setNic(enteredNic);

    if (validateNicRedux(enteredNic)) {
      setValidateNic('Valid NIC');
      setValidateNicColor('green');
    } else {
      setValidateNic('Invalid NIC');
      setValidateNicColor('red');
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const validateEmailRedux = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    if (validateEmailRedux(enteredEmail)) {
      setValidateEmail('Valid Email');
      setValidateEmailColor('green');
    } else {
      setValidateEmail('Invalid Email');
      setValidateEmailColor('red');
    }
  };

  const validateTelRedux = (tel) => {
    const telRegex = /^\d{10}$/; 
    return telRegex.test(tel);
  };

  const handleTelephoneChange = (e) => {
    const enteredTel = e.target.value;
    setTelephone(enteredTel);
    
    if (validateTelRedux(enteredTel)) {
      setValidateTel('Valid Telephone Number');
      setValidateTelColor('green');
    } else {
      setValidateTel('Invalid Telephone Number');
      setValidateTelColor('red');
    }
  };

  function reg_action(){
      if (fullName && validateEmailRedux(email) && address && gender && validateNicRedux(nic) && password && confirmPassword && validateTelRedux(telephone)) {
        saveData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Valid data are required for all text feilds.',
        });
    }
  }

  const saveData = async () => {
    const data = {
      name : fullName,
      email : email,
      telephoneNumber : telephone,
      address : address,
      gender : gender,
      nicNumber : nic,
      password : password
    };

    try {
        const response = await axios.post('http://localhost:8080/customer/register', data);

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Registered successfully!',
              }).then( async (result) => {
                if (result.isConfirmed) {
                  await role_registration();
                  window.location.href = "/user/Login";
                }
            });
           
        } else {
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Registration Failed. Please try again.',
            });
        }

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Registration Failed. Please check your network connection.',
      });
    }
  }

  async function role_registration(){
    const response = await axios.post('http://localhost:8080/user/userregister', {
      email : email ,
      password : password ,
      user_role : "customer"
    });

    if (response.status === 200) {
       console.log("user is created");
    } else {
       console.log("user is not created");
    }
  }

  function login(){
    window.location.href = "/user/Login";
  }

  return (
    <>
        <Nav/>
        <div style={gradientBackground}>
        <div className='container-fluid'>
        <div className='d-flex align-items-center justify-content-center' style={{paddingBottom:'10%' , paddingTop:'10%'}} >
          <div className='shadow rounded' style={{ width: '430px' , backgroundColor:'white'}}>
            <MDBTypography className='text-center' style={{fontSize:'25PX' , fontWeight:'500' , color:'black' , letterSpacing:'2px' , marginTop:'6%' }} >SIGN UP</MDBTypography>
            <hr/>
            <div className='p-4'>
            <div className='mb-3'>
              <span htmlFor='username' className='form-span'>
                Full Name
              </span>
              <input
                type='text'
                className='form-control'
                value={fullName}
                onChange={handleFullNameChange}
                required
              />
            </div>
            <div className='mb-3'>
              <span htmlFor='username' className='form-span'>
                Email
              </span>
              <input
                type='text'
                id='email'
                className='form-control'
                value={email}
                onChange={handleEmailChange}
                required
              />
              <small style={{ color: validateEmailColor }}>{validateEmail}</small>
            </div>
            <div className='mb-3'>
              <span htmlFor='username' className='form-span'>
                Telephone Number
              </span>
              <input
                type='text'
                className='form-control'
                required
                value={telephone}
                onChange={handleTelephoneChange}
              />
              <small style={{ color: validateTelColor }}>{validateTel}</small>
            </div>
            <div className='mb-3'>
              <span htmlFor='username' className='form-span'>
                Address
              </span>
              <input
                type='text'
                className='form-control'
                required
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className='mb-3'>
              <span htmlFor='username' className='form-span'>
                Gender
              </span>
              <select
                className='form-select'
                required
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='mb-3'>
              <span htmlFor='password' className='form-span'>
                NIC Number
              </span>
              <input
                type='text'
                className='form-control'
                required
                value={nic}
                onChange={handleNicChange}
              />
              <small style={{ color: validateNicColor }}>{validateNic}</small>
            </div>
            <div className='mb-3'>
              <span htmlFor='password' className='form-span'>
                Password
              </span>
              <input
                type='password'
                className='form-control'
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <small style={{ color: validatePassColor }}>{validatePass}</small>
            </div>
            <div className='mb-3'>
              <span htmlFor='password' className='form-span'>
                Confirm Password
              </span>
              <input
                type='password'
                className='form-control'
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <small style={{ color: validateCPassColor }}>{validateCPass}</small>

            </div>
            <div className='text-end'>
              <MDBBtn color='dark' className='btn-block shadow-0' onClick={reg_action}>
                Submit
              </MDBBtn>
            </div>
            <hr style={{marginTop:'4%'}}/>
            <div className='text-center'  onClick={login} style={{cursor:'pointer'}}>
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