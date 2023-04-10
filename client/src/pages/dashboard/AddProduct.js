
import React, { useState } from 'react'
import { Alert, FormRow, FormRowSelect } from '../../components'
import { BiCloudUpload } from "react-icons/bi";
import { useAppContext } from '../../context/appContext';

const initialState = {
  title: '',
  description: '',
  price: 0,
  category: 'other',
  categoryType: ['clothes', 'smartphones', 'electronics', 'books', 'sports', 'kids item', 'automobiles','home interior', 'other']
  
}

const AddProduct = () => {
  const {
    isLoading,
    showAlert,
    createProduct
  } = useAppContext()

  const [values, setValues] = useState(initialState);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(['https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg']);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      const { title, description,
      price, category } = values
      const myForm = new FormData();  
      
      myForm.set("title", title);
      myForm.set("description", description);
      myForm.set("price", price);
      myForm.set('category', category)
      images.forEach((image) => {
        myForm.append("images", image);
      });
      createProduct(myForm);
      
      
      
  }
  
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      <section className='bd-container'>
        <h1 className='page-title'>Create Product</h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'  className='create-product-section order-section'>
        {showAlert && <Alert />}
          <FormRow 
            type='text'
            name='title'
            labelText='Product title'
            value={values.title}
            handleChange={handleChange}
          />

          <div className='form-item'>
          <textarea
            type="text"
            className='caption-input'
            required
            name="description"
            value={values.description}
            onChange={handleChange}
          ></textarea>
            <label className="">Full description</label>
          </div>
          
          

          <div className=''>
             <h3 className='image-label'>Images</h3>
             <div className='upload-img-btn'>
                <div><img src={imagesPreview} className='upload-img' alt={values.title} /></div>
                <div className='upload-btn-section'>
                  <label className='upload-btn-cont' htmlFor='files'>
                    <BiCloudUpload className='cloud-btn' />
                    <span>Upload</span>
                  </label>
                  
                  <input
                    type="file"
                    id='files'
                    className='upload-btn'
                    name="photo"
                    accept=".png, .jpg, .jpeg"
                    onChange={createProductImagesChange} 
                    multiple 
                    
                  />

                  
                </div>
            </div>
            </div>
            
            <FormRow
              type='number'
              name='price'
              labelText='Price'
              value={values.price}
              handleChange={handleChange}
            />
            <FormRowSelect
              name='category'
              labelText='category'
              value={values.category}
              handleChange={handleChange}
              list={values.categoryType}
            />
            <div className='publish-cont'>
              <input type='checkbox' />
              <label className='publish-text'>Publish on site</label>
            </div>
            <button disabled={isLoading} type='submit' className='login-btn'>Submit item</button>
        </form>
      </section>
    </>
  )
}

export default AddProduct

