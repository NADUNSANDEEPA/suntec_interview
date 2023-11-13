import React  , {useState , useEffect} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import Nav from './parts/AfterNav';
import TblStructure from './parts/CartTable';
import Swal from 'sweetalert2';
import axios from 'axios';
import md5 from 'crypto-js/md5';


const columns = ['Item Id', 'Product', 'Quantity' , 'Price (Rs.)' , 'Total Price (Rs.)' ];
const columnsID = ['cartItem.cartid', 'cartItem.itemname','cartItem.quantity', 'cartItem.price' , 'totalPrice' ];


export default function Cart() {

    const [payModal, setPayModal] = useState(false);
    const toggleOpen = () => setPayModal(!payModal);

    const [totalPrice, setTotalPrice] = useState('');
    const [cartData, setCartData] = useState([]);
    
    const [orderId, setOrderId] = useState(generateRandomId());
    const [merchantSecretId, setMerchantSecretId] = useState("Mzk5Mjg2NzA2MjQ4OTg0NDkwMTM2NDY1OTQ2MDEyMzM2MjUzMjc0");
    const [merchantId, setMerchantId] = useState("1223726");
    const [amountcurrency, setCurrency] = useState("LKR");
    const [generatedHash, setGeneratedHash] = useState(generateCode(orderId , merchantSecretId, merchantId, amountcurrency , "1000"));

    function generateCode(orderId_, merchantSecretId_, merchantId_ , amountcurrency_ , totalPrice) {
        let merchantSecret  = merchantSecretId_;
        let merchantId      = merchantId_;
        let orderId         = orderId_;
        let amount          = totalPrice;
        let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
        let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
        let currency        = amountcurrency_;
        let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();
        return hash;
    }

    //generate random order number
    function generateRandomId() {
        const idLength = 8;
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let id = '';
    
        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }
        return id;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/cart/getItems/1');
        const data = await response.json();
        setCartData(data); 
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    const getCusTotalPrice = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cart/calTotalPrice/1');
        const totalPrice = response.data;
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error('Error fetching total price:', error.message);
        // Handle errors
      }
    };
    
    useEffect(() => {
      fetchData();
      getCusTotalPrice();
      isPaid();
    }, []);

    const handleDelete = (id) => {
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`http://localhost:8080/cart/delete_cart_item/${id}`)
              .then(response => {
                  Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                  fetchData();
                  getCusTotalPrice();
              })
              .catch(error => {
                  Swal.fire('Error', 'Failed to delete the item.', 'error');
              });
            }
        });
    };

    const isPaid = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("action")) {
        
      }
    }

    return (
        <>
          <Nav/>
          <div className='container'>
          <MDBTypography style={{fontSize:'34PX' , fontWeight:'600' , color:'black' , letterSpacing:'2px' , marginTop:'6%' ,textAlign:'center' }} >YOUR CART</MDBTypography>
          <hr/>
          <MDBRow>
            <MDBCol sm='8'>
              <TblStructure 
                  data={cartData} 
                  columns={columns} 
                  columnsID={columnsID} 
                  onDelete={handleDelete}
                />
            </MDBCol>
            <MDBCol sm='4'>
              <MDBCard className='shadow-0 mt-4'>
                <MDBCardBody style={{backgroundColor:'#EAEAEA' , borderRadius:'5px' , padding:'3%'}}>
                 <h1 className='text-center fw-bold mt-4' style={{fontSize:'50px'}}>LKR {totalPrice}</h1> 
                 <div  className='text-center'>
                  <span style={{letterSpacing:'2px'}}>TOTAL PRICE</span>
                 </div> 
                 <hr/> 

                 <MDBBtn color='dark' outline className='btn-block shadow-0 fw-bold' style={{fontSize:'13px'}} onClick={toggleOpen}>PAY NOW</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBModal open={payModal} setopen={setPayModal} tabIndex='-1'>
            <MDBModalDialog size='lg'>
              <MDBModalContent>
                <MDBModalHeader style={{backgroundColor:'#4e564d'}}>
                  <MDBModalTitle className='text-white'>Pay Now</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody className='p-4'>
                  <form method="post" action="https://sandbox.payhere.lk/pay/checkout">   
                      <input type="hidden" name="merchant_id" value={merchantId} />   
                      <input type="hidden" name="return_url" id="return_url" value="http://localhost:3000/user/Cart?action=saved" />
                      <input type="hidden" name="cancel_url" id="cancel_url" value="" />
                      <input type="hidden" name="notify_url" value="http://localhost:3000/user/Cart?action=saved" />  
                      
                      
                      <input type="hidden" name="items" value="Book Buying Payment" /><br />
                      <input type="hidden" name="recurrence" value="1 Month" />
                      <input type="hidden" name="duration" value="Forever" />
                      
                      <div>
                        <MDBTypography className='text-uppercase fw-bold text-decoration-underline'>Order Details</MDBTypography>
                      </div> 
                      <div className='mb-3'>
                        <label>Order Number</label>
                        <input type="text" name="order_id" id="order_id" className='form-control' value={orderId} />
                      </div>
                      <div className='mb-3'>
                        <MDBRow>
                          <MDBCol>
                            <label>Currency</label>
                            <input type="text" name="currency" id="currency" className='form-control' value={amountcurrency} />
                          </MDBCol>
                          <MDBCol>
                            <label>Amount</label>
                            <input type="text" name="amount" id="amount" className='form-control'  value={'1000'} />
                          </MDBCol>
                        </MDBRow>
                        
                      </div>
                      <div className='mt-5'>
                        <MDBTypography className='text-uppercase fw-bold text-decoration-underline'>Billing Address</MDBTypography>
                      </div>  
                      <MDBRow>
                        <MDBCol>
                              <label>First Name</label>
                              <input type="text" className='form-control' name="first_name" />
                        </MDBCol>
                        <MDBCol>
                              <label>Last Name</label>
                              <input type="text" className='form-control' name="last_name" /><br/>
                        </MDBCol>
                      </MDBRow>
                      <div className='mb-3'>
                        <label>Email Address</label>
                        <input type="text" name="email" className='form-control'  />
                      </div>
                      <div className='mb-3'>
                        <label>Telephone Number</label>
                        <input type="text" name="phone" className='form-control' />
                      </div>
                      <div className='mb-3'>
                        <label>Adddress</label>
                        <input type="text" name="address" className='form-control' />
                      </div>
                      <div className='mb-3'>
                        <MDBRow>
                          <MDBCol>
                                <label>Adddress</label>
                                <input type="text" name="city" value="Colombo" className='form-control'/>
                          </MDBCol>
                          <MDBCol>
                                <label>Country</label>
                                <input type="text" name="country" value="Sri Lanka" className='form-control'/>
                          </MDBCol>
                        </MDBRow>
                      </div>
                      <input type="hidden" name="hash"  id="hash_code" value={generatedHash}/>
                      <div class="text-end mt-4">
                      <MDBBtn style={{backgroundColor:'#4a4a4a'}} type='submit' className='shadow-0' >Save changes</MDBBtn>
                      </div>    
                  </form> 
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          </div>
        </>
    )
};