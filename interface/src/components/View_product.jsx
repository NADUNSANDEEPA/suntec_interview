import React  , {useState , useEffect} from 'react';
import {
  MDBCard,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBBtn,
} from 'mdb-react-ui-kit';
import Nav from './AfterNav';
import Swal from 'sweetalert2';
import axios from 'axios';

const BGCARD = {
    background: 'linear-gradient(90deg, rgba(100,121,100,1) 0%, rgba(138,167,105,1) 100%)',
    borderRadius:'8px',
    marginTop:'4%'
}

const cardBg2 ={
    backgroundColor : 'white',
    border : '1px solid #D8D8D8'
};
  

export default function ViewProduct() {

    const urlParams = new URLSearchParams(window.location.search);
    const [productid, setProductId] = useState(urlParams.get('productid'));

    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [price, setPrice] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [imgName, setImgName] = useState('');


    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/product/get_product/'+productid);
          const data = await response.json();
          setProductName(data.name);
          setProductCategory(data.productCategory);
          setPrice(data.price);
          setDescriptionValue(data.description);
          setImgName(data.image);
          
        } catch (error) {
          console.error('Error fetching task data:', error);
        }
    };
      
    useEffect(() => {
        fetchData();
    }, []);

    function addToCart() {
        Swal.fire({
            title: 'Enter Quantity',
            input: 'number',
            inputAttributes: {
                autocapitalize: 'off',
                min: '1', 
            },
            showCancelButton: true,
            confirmButtonText: 'Add to Cart',
            showLoaderOnConfirm: false,
            preConfirm: (quantity) => {
                if (quantity > 0) {
                    saveCart(quantity);
                } else {
                    Swal.showValidationMessage('Quantity must be greater than 0');
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    }

    function saveCart(quantity) {
        const cartItem = {
            cus: '1',  
            itemid: productid,   
            itemname: productName, 
            price: price,    
            quantity : quantity
        };

        axios.post('http://localhost:8080/cart/save', cartItem)
        .then(response => {
           
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Cart saved successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to save cart. Please try again.',
                });
            }
        })
        .catch(error => {
            console.error('Error saving cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while saving the cart.',
            });
        });
    }

    return (
        <>
            <Nav/>
            <div className='container' style={{marginTop:'4%'}}>
                <MDBRow>
                    <MDBCol sm='4'>
                        <MDBCard className='shadow-0'>
                            <MDBCardBody style={{backgroundColor:'#EAEAEA' , borderRadius:'5px' , padding:'3%'}}>
                                
                                <>
                                    <img src={imgName} style={{width:'100%', borderRadius:'2%'}}  />
                                    <div className='text-center mt-4'>
                                        <h4>{productName}</h4>
                                    </div>
                                    <div className='text-start mt-3'>
                                        <ul>
                                            <li>Price : LKR {price}</li>
                                            <li>Product Category : {productCategory}</li>
                                        </ul>
                                    </div>
                                    <hr/>
                                    <div>
                                        <div className="d-grid gap-2">
                                            <MDBBtn color='dark' className='shadow-0' style={{letterSpacing:'2px'}} onClick={addToCart}>ADD TO CART  <MDBIcon className='ms-1' fas icon='shopping-cart' size='lg' /></MDBBtn>
                                        </div>
                                    </div>
                                </>
                                
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='8'>
                        <MDBCard className='shadow-0'>
                            <MDBCardBody className='border'>
                                <h5 className='mb-4 fw-bold'>Discription : </h5>
                                <div dangerouslySetInnerHTML={{ __html: descriptionValue }} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </>
    );
}
