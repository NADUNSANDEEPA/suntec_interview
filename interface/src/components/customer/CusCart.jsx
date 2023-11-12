import React  , {useState , useEffect} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import Nav from './parts/AfterNav';
import TblStructure from './parts/CartTable';
import Swal from 'sweetalert2';
import axios from 'axios';

const columns = ['Item Id', 'Product', 'Quantity' , 'Price (Rs.)' , 'Total Price (Rs.)' ];
const columnsID = ['cartItem.cartid', 'cartItem.itemname','cartItem.quantity', 'cartItem.price' , 'totalPrice' ];


export default function Cart() {

    const [totalPrice, setTotalPrice] = useState('');
    const [cartData, setCartData] = useState([]);

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
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          </div>
        </>
    )
};