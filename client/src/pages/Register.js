import React, { useState, useEffect } from 'react'
import { Alert, FormRow } from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate, Navigate } from 'react-router-dom'

const initialState = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  role: 'admin',
  isMember: true
}

const Register = () => {
  const navigate = useNavigate()
  const { user, setupUser, showAlert, isLoading, displayAlert } = useAppContext()

  const [values, setValues] = useState(initialState)
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(['https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg']);
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, username, password, firstName, lastName, isMember} = values

    if(!username|| !password || (!isMember && !email && !firstName && !lastName)) {
      displayAlert()
      return
    }
    const currentUser = new FormData();

    currentUser.set("email", values.email);
    currentUser.set("username", values.username);
    currentUser.set("password", values.password);
    currentUser.set("firstName", values.firstName);
    currentUser.set("lastName", values.lastName);
    currentUser.set("role", values.role);

    images.forEach((image) => {
      currentUser.append("images", image);
    });
    if (values.isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  };
  
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
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <section className='b-container'>
      <div>
        <form 
          encType="multipart/form-data"  className='form-section' 
          onSubmit={handleSubmit}
        >
        <h3 className='register-title'>{values.isMember ? 'Log in as Seller' : 'Sign up as Seller'}</h3>
        {showAlert && <Alert />}
        {/* profile photo */}
        {!values.isMember && (
        <div>
            <div className='add-img-section'>
                <img src={imagesPreview} className='img-prev' alt='preview' />
                <div className='cca'>
                  <label className='upload-text bregister-btn' htmlFor='files'>Add profile photo</label>
                  <input
                  type="file"
                  id='files'
                  className='upload-btn'
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  />
                </div>
            </div>
            {/* email */}
            <FormRow
              type='email'
              name='email'
              placeholder='Email'
              value={values.email}
              labelText='Email'
              handleChange={handleChange}
            />
            {/* firstName */}
            <FormRow
              type='text'
              name='firstName'
              placeholder='First Name'
              value={values.firstName}
              labelText='First Name'
              handleChange={handleChange}
            />
            {/* lastName */}
            <FormRow
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={values.lastName}
              labelText='Last Name'
              handleChange={handleChange}
            />
            
        </div>
        )}
        {/* username */}
        <FormRow
            type='text'
            name='username'
            placeholder='Username'
            value={values.username}
            labelText='Username'
            handleChange={handleChange}
            
        />
        {/* password */}
        <FormRow
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          labelText='Password'
          handleChange={handleChange}
        />
        {values.isMember ? 
        <div className='rmb-flex'>
          <div className='rmbr-flex'>
            <input type='checkbox' />
            <p className='rmb-name'>Remember me</p>
          </div>
          <button className='bregister-btn'>Forgot Password</button>
        </div>
        :   
        <p className='rmb-info'>By signing up you confirmed that you have read and accepted our User Notice and Provacy Policy</p>
      }
        
        {/* btn container */}
        <button type='submit' className='btn login-btn' disabled={isLoading}>
          {values.isMember ? 'Login' : 'Register'}
        </button>
        <p className='enq-btn-section'>
          <span className='enq-name'>{values.isMember ? `Don't have an account?` : 'Already have an account?'}</span>
          <button type='button' onClick={toggleMember} className='bregister-btn'>
            {values.isMember ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        </form>
      </div>
      </section>
    </React.Fragment>
      
  )
}
export default Register
