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

const cardBg ={
  backgroundColor : '#F8F8F8',
  border : '1px solid #D8D8D8'
};

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

  return (
    <>
        <Nav/>
        <div className='container-fluid' style={gradientBackground}>
          <MDBRow className='pt-5 pb-4' >
            <MDBCol sm='7'>
              <MDBCard className='shadow-0 bg-transparent text-center'>
                <MDBCardBody style={{paddingTop:'10%'}}>
                  <img src="./img/site_name.png" style={{ width: '100%', maxWidth: '550px' }}/>
                  
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm='5'>
              <MDBCard className='shadow-0 bg-transparent'>
                <MDBCardBody >
                  <img src="./img/bg_img.png" style={{ width: '100%', maxWidth: '500px' }}/>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
      </div>
      <div className='container'>
              <MDBTypography style={{fontSize:'34PX' , fontWeight:'500' , color:'black' , letterSpacing:'2px' , marginTop:'11%' ,textAlign:'center' }} >WE PRODUCTS</MDBTypography>
              <MDBRow style={{marginBottom:'10%'}}>
                    <MDBCol sm='3' >
                        <MDBCard className=' shadow-0' style={cardBg}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/pot2.png" style={{ width: '80%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-2 text-dark' tag={'h4'}>Flower Plants</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3' >
                        <MDBCard className='shadow-0' style={cardBg}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/fertilizer.png" style={{ width: '80%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-2 text-dark' tag={'h4'}>Fertilizers</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3' >
                        <MDBCard className='shadow-0' style={cardBg}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/accesseries.png" style={{ width: '80%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-2  text-dark' tag={'h4'}>accessories</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3'>
                        <MDBCard className='shadow-0' style={cardBg}>
                            <MDBCardBody className='text-center'>
                                <img src="../img/seeds.png" style={{ width: '80%' , paddingTop:'10%' }}/>
                                <MDBTypography className='text-uppercase fw-bold pt-2 text-dark' tag={'h4'}>SEEDS</MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
              </MDBRow>
      </div>
      <div className='container'>
        <MDBTypography style={{fontSize:'34PX' , fontWeight:'500' , color:'black' , letterSpacing:'2px' , marginTop:'13%' ,textAlign:'center' }} >OUR BEST PRODUCTS</MDBTypography>
        <MDBRow style={{marginBottom:'10%'}}>
              <MDBCol sm='3'  >
                  <div className='rounded p-4' style={{backgroundColor:'#E7E7E7' }}>
                    <label className='fw-bold text-uppercase' style={{fontSize:'19px'}}>Filter Plants</label>
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
                              <hr/>
                              <MDBTypography style={{ fontSize: '18px' }} className='text-center fw-normal'>{`LKR ${product.price.toFixed(2)}`}</MDBTypography>
                            </MDBCardBody>
                          
                          </MDBCard>
                        </MDBCol>
                      ))}
                  </MDBRow>
              </MDBCol>
        </MDBRow>
      </div>
      <Footer/>
    </>
  );
}