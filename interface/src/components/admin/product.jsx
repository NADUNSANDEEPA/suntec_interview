import React, { useState , useEffect} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTypography
} from 'mdb-react-ui-kit';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Nav from './admin_nav';
import AdminFooter from './admin_footer';
import TblStructure from './table_structure';

const columns = ['Product Id', 'Product Name','Product Category', 'Price (Rs.)'];
const columnsID = ['productid', 'name','productCategory', 'price'];

export default function Index() {

    const [addModal, setaddModal] = useState(false);
    const addToggleOpen = () => setaddModal(!addModal);

    
    const [editModal, seteditModal] = useState(false);
    const editToggleOpen = () => seteditModal(!editModal);

    //add model
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [price, setPrice] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const [imageURL, setImageURL] = useState('');
    const [imgName, setImgName] = useState('');
    const [saveBtnDisable, setSaveBtnDisable] = useState(true);
    const [image_upload_status, setImgUploadStatus] = useState("Please select a image.");
    const [image_upload_status_color, setImgUploadStatusColor] = useState("black");

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductCategoryChange = (e) => {
        setProductCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleDescriptionChange = (value) => {
      setDescriptionValue(value);
    };


    const handleImageUpload = (e) => {
        setImgUploadStatus("Uploading....");
        setImgUploadStatusColor("orange");
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
      
        fetch('https://api.cloudinary.com/v1_1/dnomnqmne/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setImageURL(data.secure_url);
            setImgName(data.secure_url); 
            console.log(data.secure_url);
            setSaveBtnDisable(false);
            setImgUploadStatusColor("green");
            setImgUploadStatus("Uploaded.");
          })
          .catch((error) => console.error('Error uploading image:', error));
    };

    //edit model
    const [productIDEdit, setProductIDEdit] = useState('');
    const [productNameEdit, setProductNameEdit] = useState('');
    const [productCategoryEdit, setProductCategoryEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [descriptionValueEdit, setDescriptionValueEdit] = useState('');

    const [imageURL_edit, setImageURLEdit] = useState('');
    const [imgName_edit, setImgNameEdit] = useState('');
    const [image_upload_status_edit, setImgUploadStatusEdit] = useState("Please select a image.");
    const [image_upload_status_color_edit, setImgUploadStatusColorEdit] = useState("black");

    const [productData, setProductData] = useState([]);

    const handleProductNameChangeEdit = (e) => {
        setProductNameEdit(e.target.value);
    };

    const handleProductCategoryChangeEdit = (e) => {
        setProductCategoryEdit(e.target.value);
    };

    const handlePriceChangeEdit = (e) => {
        setPriceEdit(e.target.value);
    };

    const handleDescriptionChangeEdit = (value) => {
      setDescriptionValueEdit(value);
    };

    const handleImageUploadEdit = (e) => {
        setImgUploadStatusEdit("Uploading....");
        setImgUploadStatusColorEdit("orange");
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
      
        fetch('https://api.cloudinary.com/v1_1/dnomnqmne/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setImageURLEdit(data.secure_url);
            setImgNameEdit(data.secure_url); 
            console.log(data.secure_url);
            setImgUploadStatusColorEdit("green");
            setImgUploadStatusEdit("Uploaded.");
          })
          .catch((error) => console.error('Error uploading image:', error));
    };


      const saveData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/product/save_product', {
                name : productName,
                price : price,
                image : imgName,
                description : descriptionValue,
                productCategory : productCategory
            });
      
            if (response.status === 200) {
                // Show success alert using SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data saved successfully!',
                });
                setaddModal(!addModal);
                clearFeilds();
            } else {
                // Handle other status codes if needed
                Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save data. Please try again.',
                });
            }
        } catch (error) {
          console.log(error);
          // Handle network errors or other exceptions
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to save data. Please check your network connection.',
          });
        }
      };

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

      const clearFeilds = async () => {
        setProductName("");
        setProductCategory("");
        setPrice("");
        setDescriptionValue("");
        setImageURL("");
        setImgName("");
        setSaveBtnDisable(true);
        setImgUploadStatus("Please select a image.");
        setImgUploadStatusColor("black");
      }

      
      const handleView = (data) => {
            const viewContent = `
            <div style='text-align:left'>
            <p>Product ID: ${data.productid}</p>
            <p>Product Name: ${data.name}</p>
            <p>Product Category: ${data.productCategory}</p>
            <p>Price: Rs.${data.price}</p>
            <p>Description: ${data.description}</p>
            </div>
             `;
        
        Swal.fire({
            title: 'View Product',
            html: viewContent,
            icon: 'info',
            confirmButtonText: 'Close',
        });
      };
    
      const handleEdit = (data) => {
        
        seteditModal(!editModal);
        setProductNameEdit(data.name);
        setProductCategoryEdit(data.productCategory);
        setPriceEdit(data.price);
        setDescriptionValueEdit(data.description);
        setImageURLEdit(data.image);
        setProductIDEdit(data.productid);
      };
    
      const handleDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/product/delete_product/${id}`)
              .then((response) => {
                console.log(response.data); 
                Swal.fire(
                  'Deleted!',
                  'Your item has been deleted.',
                  'success'
                );
                fetchData();
              })
              .catch((error) => {
                console.error('Error deleting item:', error);
                Swal.fire(
                  'Error!',
                  'An error occurred while deleting the item.',
                  'error'
                );
              });
          }
        });
      };

      function editData() {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to edit the product.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, edit it!',
        }).then((result) => {
          if (result.isConfirmed) {
                axios.put(`http://localhost:8080/product/update_product/${productIDEdit}`, {
                    productid:productIDEdit,
                    name : productNameEdit,
                    price : priceEdit,
                    image : imgName_edit,
                    description : descriptionValueEdit,
                    productCategory : productCategoryEdit
                })
                .then((response) => {
                    console.log(response.data); 
                    Swal.fire({
                        title: 'Success!',
                        text: 'The product has been edited.',
                        icon: 'success',
                    });
                    fetchData();
                    seteditModal(!editModal);
                })
                .catch((error) => {
                    console.error('Error editing data:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while editing the data.',
                        icon: 'error',
                    });
                });
          }
        });
      }

    return (
        <>
            <Nav/>
            <div className='container'>
               

                <MDBTypography style={{fontSize:'34PX' , fontWeight:'600' , color:'black' , letterSpacing:'2px' , marginTop:'6%' ,textAlign:'center' }} >YOUR PRODUCT LIST</MDBTypography>
                <hr/>
                <div className='text-end pt-3'>
                    <MDBBtn color='dark' onClick={addToggleOpen}>ADD NEW PRODUCT</MDBBtn>
                </div>
                <TblStructure 
                        data={productData} 
                        columns={columns} 
                        columnsID={columnsID} 
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                />

                <MDBModal open={addModal} setopen={setaddModal} tabIndex='-1'>
                    <MDBModalDialog size="lg">
                    <MDBModalContent>
                        <MDBModalHeader style={{backgroundColor:'#4e564d'}}>
                        <MDBModalTitle className='text-white'>Add New Product</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={addToggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='p-4'>
                            <div className='pt-4'>
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Product Name</label>
                                <input type='text' className='form-control' onChange={handleProductNameChange} value={productName}/>
                            </div>
                            <div className='pt-4' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Product Category</label>
                                <select className='form-select' onChange={handleProductCategoryChange} value={productCategory}>
                                    <option value="">Select Product Category</option>
                                    <option value="Category 01">Category 01</option>
                                </select>
                            </div>
                            <div className='pt-4' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Price</label>
                                <input type='number' className='form-control' onChange={handlePriceChange} value={price}/>
                            </div>
                            <div className='pt-4' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Image</label>
                                <input type='file' className='form-control' onChange={handleImageUpload} />
                                <small style={{color:image_upload_status_color}}>{image_upload_status}</small><br/>
                                <div className='text-center pt-4'>
                                {imageURL && <Image cloudName='dnomnqmne'  publicId={imageURL} width='160' />}
                                </div>
                            </div>
                            <div className='pt-5' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Description</label>
                                <ReactQuill value={descriptionValue} onChange={handleDescriptionChange} style={{height: '300px'}}/>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter className='pt-5 border-0'>
                            <MDBBtn color='dark' outline onClick={addToggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn style={{backgroundColor:'#4a4a4a'}} className='shadow-0' onClick={saveData} disabled={saveBtnDisable}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>


                <MDBModal open={editModal} setopen={seteditModal} tabIndex='-1'>
                    <MDBModalDialog size="lg">
                    <MDBModalContent>
                        <MDBModalHeader style={{backgroundColor:'#4e564d'}}>
                        <MDBModalTitle className='text-white'>Edit Product</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={editToggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='p-4'>
                            <div className='pt-4'>
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Product Name</label>
                                <input type='text' className='form-control' onChange={handleProductNameChangeEdit} value={productNameEdit}/>
                            </div>
                            <div className='pt-4' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Product Category</label>
                                <select className='form-select' onChange={handleProductCategoryChangeEdit} value={productCategoryEdit}>
                                    <option value="">Select Product Category</option>
                                    <option value="Category 01">Category 01</option>
                                </select>
                            </div>
                            <div className='pt-4' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Price</label>
                                <input type='number' className='form-control' onChange={handlePriceChangeEdit} value={priceEdit}/>
                            </div>
                            <div className='pt-4' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Image</label>
                                <input type='file' className='form-control' onChange={handleImageUploadEdit} />
                                <small style={{color:image_upload_status_color_edit}}>{image_upload_status_edit}</small><br/>
                                <div className='text-center pt-4'>
                                {imageURL_edit && <Image cloudName='dnomnqmne'  publicId={imageURL_edit} width='160' />}
                                </div>
                            </div>
                            <div className='pt-5' >
                                <label className='text-uppercase' style={{fontSize:'15px'}}>Description</label>
                                <ReactQuill value={descriptionValueEdit} onChange={handleDescriptionChangeEdit} style={{height: '300px'}}/>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter className='pt-5 border-0'>
                            <MDBBtn color='dark' outline onClick={editToggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn style={{backgroundColor:'#4a4a4a'}} className='shadow-0' onClick={editData} >Edit</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal> 
            </div>
            <AdminFooter/>
        </>
    );
}
