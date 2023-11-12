import React  , {useState , useEffect} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBCardFooter,
} from 'mdb-react-ui-kit';
import Nav from './AfterNav';

const BGCARD = {
    background: 'linear-gradient(90deg, rgba(100,121,100,1) 0%, rgba(138,167,105,1) 100%)',
    borderRadius:'8px',
    marginTop:'4%'
}

const cardBg2 ={
    backgroundColor : 'white',
    border : '1px solid #D8D8D8'
};
  

export default function Index() {

    const [productData, setProductData] = useState([]);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/product/get_all_products');
        const data = await response.json();
        setProductData(data); 
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, []);

    function view_cart(productid){
        window.location.href = "/user/ViewProduct?productid="+productid;
    }

    return (
        <>
            <Nav/>
            <div className='container'>
            <MDBRow style={BGCARD}>
                <MDBCol sm='6'>
                    <MDBCard className='bg-transparent shadow-0 pt-4 ps-5'>
                        <div style={{paddingTop:'8%'}}></div>
                        <MDBTypography style={{fontSize:'50PX' , fontWeight:'600' , color:'black' , letterSpacing:'2px' }} >LETS' BUY PLANTS</MDBTypography>

                    </MDBCard>
                </MDBCol>
                <MDBCol sm='6'>
                    <MDBCard className='bg-transparent shadow-0 pt-4 ps-5' >
                        <img src="../img/cus_dashboard_img.png" style={{ width: '100%'  }}/>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            </div>
            <div className='container'>
                <MDBRow style={{marginBottom:'10%' , marginTop:'6%'}}>
                    <MDBCol sm='3'  >
                        <div className='rounded p-4' style={{backgroundColor:'#E7E7E7' }}>
                            <label className='fw-bold text-uppercase' style={{fontSize:'19px'}}>Filter Plants.</label>
                            <hr/>
                            <div style={{paddingTop:'5%'}}>
                            <input type='text' style={{width:'100%'}} placeholder='Search Plants...'/>
                            </div>
                            <div className='pt-2 text-end'>
                            <MDBBtn color='dark' outline size='sm'>Search</MDBBtn>
                            </div>
                            <div style={{paddingBottom:'10%'}}></div>
                        </div>
                    </MDBCol>
                    <MDBCol sm='9' >
                        <MDBRow >
                            {productData.map((product) => (
                                <MDBCol key={product.id} sm='3'>
                                <img src={product.image} style={{ width: '100%', paddingTop: '4%' }} alt={product.productName} />
                                <MDBCard className='shadow-0 rounded-0' style={cardBg2}>
                                    <MDBCardBody className='text-center m-0 p-0'>
                                    <div className='pt-4 pb-3 ps-3 pe-3'>
                                        <MDBTypography style={{ fontSize: '18px', fontWeight: '600', color: 'black', textAlign: 'center', marginBottom: '0px' }} >
                                        {product.name}
                                        </MDBTypography>
                                    </div>
                                    <MDBTypography style={{ fontSize: '16px' }} className='text-center fw-normal'>{`LKR ${product.price.toFixed(2)}`}</MDBTypography>
                                    </MDBCardBody>
                                    <MDBCardFooter className='text-center'>
                                        <MDBBtn color='dark' outline onClick={()=>view_cart(product.productid)}>
                                            View Product  <MDBIcon className='ms-1' far icon='eye' size='lg' />
                                        </MDBBtn>
                                    </MDBCardFooter>
                                </MDBCard>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </div>
        </>
    );
}
