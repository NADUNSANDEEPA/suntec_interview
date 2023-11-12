import React , {useState} from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <MDBFooter style={{backgroundColor:'#364742'}} className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block' style={{color:'#AFC5BE'}}>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#D9E7E3'}}>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                B-Flower
              </h6>
              <p style={{color:'#AFC5BE'}}>
                Bflower.lk was founded to provide a smart solution to that problem. We take your love for nature and provide it in a way that adds beauty to your home and office making it a part of your everyday life.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#D9E7E3'}}>Products</h6>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Flower Plants
                </a>
              </p>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Flower Plots
                </a>
              </p>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Accesseries
                </a>
              </p>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Fertilizers
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#D9E7E3'}}>Useful links</h6>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Terms & Conditions
                </a>
              </p>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' style={{color:'#AFC5BE'}}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#D9E7E3'}}>Contact</h6>
              <p style={{color:'#AFC5BE'}}>
                <MDBIcon icon='home' className='me-2' />
                45/3, Halummahara, Delgoda.
              </p>
              <p style={{color:'#AFC5BE'}}>
                <MDBIcon icon='envelope' className='me-3' />
                bflower@gmail.com
              </p>
              <p style={{color:'#AFC5BE'}}>
                <MDBIcon icon='phone' className='me-3' /> + 94 71 10 44 892
              </p>
              <p style={{color:'#AFC5BE'}}>
                <MDBIcon icon='print' className='me-3' /> + 94 71 10 44 892
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 fw-bold' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' , color:'#AFC5BE'}}>
        © {currentYear} Copyright:
        <a style={{color:'#AFC5BE'}}  href='#'>
          bflower.com
        </a>
      </div>
    </MDBFooter>
  );
}