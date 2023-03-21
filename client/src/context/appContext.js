import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_AUTHPRODUCTS_BEGIN,
  GET_AUTHPRODUCTS_SUCCESS,
  DELETE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLEPRODUCT_BEGIN,
  GET_SINGLEPRODUCT_SUCCESS,
  GET_SINGLEPRODUCT_ERROR,
  REMOVE_PRODUCT,
  CLEAR_CART,
  TOGGLE_AMOUNT,
  GET_TOTALS,
  TOGGLE_CART,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_BEGIN,
  ADDTOCART_BEGIN,
  ADDTOCART_SUCCESS,
  SET_CART,
  REMOVE_ITEM,
  
 

} from './actions'



const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userAddress: '',

  


  image: '',
  title: '',
  description: '',
  price: 0,
  
  
  sort: 'latest',
  page: 1,
  showSidebar: false,
  showCart: false,
  product: null,
  products: [],
  totalProducts: 0,

  order: null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }


  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }











  const setupUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
    };
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser, config)

      const { user, address } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, address, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  
  const createProduct = async (productData) => {
    dispatch({ type: CREATE_PRODUCT_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await authFetch.post('/products', productData, config)
      const {product} = data
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: {product}})
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getProducts = async () => {
    const {sort, page} = state
    let url = `products/all?limit=${page*6}&sort=${sort}`

    dispatch({ type: GET_PRODUCTS_BEGIN })
  
    try {
      const { data } = await axios.get(`/api/v1/${url}`)
      const { products, totalProducts } = data
      console.log(products)
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts
        },
      })
    } catch (error) {
        logoutUser();
    }
    clearAlert()
  }

  const getSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLEPRODUCT_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/products/${id}`)
      const { product } = data
      console.log(product)
      dispatch({
        type: GET_SINGLEPRODUCT_SUCCESS,
        payload: {
          product,
        },
      })
    } catch (error) {
      if (error.response.status === 401) return
        dispatch({
          type: GET_SINGLEPRODUCT_ERROR,
          payload: { msg: error.response.data.msg }
        })
    }
    clearAlert()
  }
  
  const getUserProducts = async () => {
    const {sort, page} = state
    let url = `/products?limit=${page*6}&sort=${sort}`

    dispatch({ type: GET_AUTHPRODUCTS_BEGIN })
  
    try {
      const { data } = await authFetch(url)
      const { products, totalProducts } = data
      console.log(products)
      dispatch({
        type: GET_AUTHPRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts
        },
      })
    } catch (error) {
        logoutUser();
    }
    clearAlert()
  }

  const updateProduct = async (id, productData) => {
    dispatch({ type: UPDATE_PRODUCT_BEGIN });
    try {
      await authFetch.put(
        `/products/${id}`,
        productData
      );
  
      dispatch({ type: UPDATE_PRODUCT_SUCCESS });
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: UPDATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }


  const deleteProduct = async (productId) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN })
    try {
      await authFetch.delete(`/products/${productId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const createOrder = async ({currentOrder}) => {
    dispatch({ type: CREATE_ORDER_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await authFetch.post('/orders', currentOrder, config)
      const {order} = data
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: {order}})
      
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_ORDER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }


  const addItemToCart = async (id) => {
    dispatch({ type: ADDTOCART_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/products/${id}`)

      const {product} = data
      dispatch({
        type: ADDTOCART_SUCCESS,
        payload: { cart: product },
      })
      
    } catch (error) {
      console.log(error)
    }
    clearAlert()
  }

  
  const removeItemFromCart = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: {id} })
    console.log(id)
  }

  
  
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, address } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, address }
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();;
    }
  };



  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  
  

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
    
        logoutUser,
        handleChange,
        clearValues,
        toggleSidebar,
        createProduct,
        getProducts,
        getSingleProduct,
        getUserProducts,
        updateProduct,
        deleteProduct,
        clearCart,
        toggleCart,
        createOrder,
        addItemToCart,
        removeItemFromCart
    
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
