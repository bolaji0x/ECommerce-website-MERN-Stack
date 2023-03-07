import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FormRow, FormRowSelect } from '../../components'
import { BiCloudUpload } from "react-icons/bi";
import { useAppContext } from '../../context/appContext';
import { useParams } from 'react-router-dom'


const EditProduct = () => {
  const {id} = useParams()
  const {
    isLoading,
    showAlert,
    updateProduct
  } = useAppContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('other')
  const [categoryType, setCategoryType] = useState(['clothes', 'smartphones', 'electronics', 'books', 'sports', 'kids item', 'automobiles','home interior', 'other'])
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/${id}`)
        const {product} = data
        console.log(product)
        setTitle(product.title)
        setDescription(product.description)
        setPrice(product.price)
        setCategory(product.category)
        setImagesPreview(product.images[0].url)
      } catch (error) {
        console.log(error)
        setCategoryType([])
      }
    };
    fetchData();
}, [id])


  const handleSubmit = (e) => {
    e.preventDefault();
      
      const myForm = new FormData();  
      
      myForm.set("title", title);
      myForm.set("description", description);
      myForm.set("price", price);
      myForm.set('category', category)
      images.forEach((image) => {
        myForm.append("images", image);
      });
      updateProduct(id, myForm);
      
      
  }
  
  const updateProductImagesChange = (e) => {
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
        <h1 className='page-title'>Edit Product</h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'  className='form-section'>
        {showAlert && <Alert />}
          <FormRow 
            type='text'
            name='title'
            labelText='Product title'
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
          />

          <div className='form-item'>
          <textarea
            type="text"
            className='caption-input'
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
            <label className="">Full description</label>
          </div>
          
          

          <div className=''>
             <h3 className='image-label'>Images</h3>
             <div className='upload-img-btn'>
                <div><img src={imagesPreview} className='upload-img' alt={title} /></div>
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
                    onChange={updateProductImagesChange} 
                    multiple 
                    
                  />

                  
                </div>
            </div>
            </div>
            
            <FormRow
              type='number'
              name='price'
              labelText='Price'
              value={price}
              handleChange={(e) => setPrice(e.target.value)}
            />
            <FormRowSelect
              name='category'
              labelText='category'
              value={category}
              handleChange={(e) => setCategory(e.target.value)}
              list={categoryType}
            />
            <div className='publish-cont'>
              <input type='checkbox' />
              <label className='publish-text'>Publish on site</label>
            </div>
            <button disabled={isLoading} type='submit' className='login-btn'>Update item</button>
        </form>
      </section>
    </>
  )
}

export default EditProduct

