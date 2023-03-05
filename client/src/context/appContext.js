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
  
  
  
  showSidebar: false,
  product: null,
  products: [],
  totalProducts: 0

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
        getProducts
    
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
