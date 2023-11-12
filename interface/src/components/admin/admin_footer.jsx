import React , {useState} from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export default function App() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <MDBFooter className='text-center text-dark mt-5' style={{ backgroundColor: 'white' }}>
      <MDBContainer className='p-4'></MDBContainer>

      <div className='text-center  p-3' style={{ backgroundColor: '#F7F7F7' }}>
        © {currentYear} Copyright:
        <a className='text-dark' href='#'>
          plantme.com
        </a>
      </div>
    </MDBFooter>
  );
}