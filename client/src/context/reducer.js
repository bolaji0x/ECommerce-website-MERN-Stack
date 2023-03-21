import { 
  ADDTOCART_BEGIN,
    ADDTOCART_SUCCESS,
    CLEAR_ALERT, 
    CLEAR_CART, 
    CLEAR_VALUES, 
    CREATE_ORDER_BEGIN, 
    CREATE_ORDER_ERROR, 
    CREATE_ORDER_SUCCESS, 
    CREATE_PRODUCT_BEGIN, 
    CREATE_PRODUCT_ERROR, 
    CREATE_PRODUCT_SUCCESS, 
    DELETE_PRODUCT_BEGIN, 
    DISPLAY_ALERT, 
    GET_AUTHPRODUCTS_BEGIN, 
    GET_AUTHPRODUCTS_SUCCESS, 
    GET_CURRENT_USER_BEGIN, 
    GET_CURRENT_USER_SUCCESS, 
    GET_PRODUCTS_BEGIN, 
    GET_PRODUCTS_SUCCESS, 
    GET_SINGLEPRODUCT_BEGIN, 
    GET_SINGLEPRODUCT_ERROR, 
    GET_SINGLEPRODUCT_SUCCESS, 
    GET_TOTALS, 
    HANDLE_CHANGE, 
    LOGOUT_USER, 
    REMOVE_ITEM, 
    REMOVE_PRODUCT, 
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    SET_CART,
    TOGGLE_AMOUNT,
    TOGGLE_CART,
    TOGGLE_SIDEBAR,
    UPDATE_PRODUCT_BEGIN,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_SUCCESS
} from "./actions"

import { initialState } from './appContext'

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      }
    }
    if (action.type === CLEAR_ALERT) {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    }
  
    if (action.type === SETUP_USER_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === SETUP_USER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userAddress: action.payload.address,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
    }
    if (action.type === SETUP_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
  
    if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        userLoading: false,
      };
    }

    if(action.type === CLEAR_VALUES) {
        const initialState = {
          isLoading: false,
          product: null
        }
    
        return {
          ...state, 
          ...initialState
        }
    }

    if (action.type === HANDLE_CHANGE) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }
    if (action.type === TOGGLE_CART) {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }


    if (action.type === CREATE_PRODUCT_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === CREATE_PRODUCT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        product: action.payload.product,
        alertType: 'success',
        alertText: 'Product created',
      }
    }
    if (action.type === CREATE_PRODUCT_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    if (action.type === GET_PRODUCTS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_PRODUCTS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts
      }
    }

    if (action.type === GET_SINGLEPRODUCT_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_SINGLEPRODUCT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        product: action.payload.product
      }
    }
  
    if (action.type === GET_SINGLEPRODUCT_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    if (action.type === GET_AUTHPRODUCTS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_AUTHPRODUCTS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts
      }
    }

    if (action.type === UPDATE_PRODUCT_BEGIN) {
      return {
        ...state,
        isLoading: true,
      }
    }
    if (action.type === UPDATE_PRODUCT_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Product Updated!',
      }
    }
    if (action.type === UPDATE_PRODUCT_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    if (action.type === DELETE_PRODUCT_BEGIN) {
      return { 
        ...state, 
        isLoading: true,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Product Deleted!', 
      }
    }

    

    




    if (action.type === CREATE_ORDER_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === CREATE_ORDER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        order: action.payload.order,
        alertType: 'success',
        alertText: 'Order added',
      }
    }
    if (action.type === CREATE_ORDER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }


    if (action.type === ADDTOCART_BEGIN) {
      return { ...state }
    }
    
    if (action.type === ADDTOCART_SUCCESS) {
      return {
        ...state,
        cart: [...state.cart, action.payload.cart],
        showAlert: true,
        alertType: 'success',
    
      }  
    }

    if(action.type === REMOVE_ITEM) {
      return {
        ...state, 
        cart: state.cart.filter((item) => item._id !== action.payload.id)
      }
    }

    if(action.type === CLEAR_CART) {
      return {
        ...state,
       isLoading: false, 
       cart: []
      }
    }
    

    

    


    if (action.type === GET_CURRENT_USER_BEGIN) {
        return { ...state, userLoading: true, showAlert: false };
      }
      if (action.type === GET_CURRENT_USER_SUCCESS) {
        return {
          ...state,
          userLoading: false,
          user: action.payload.user,
          userAddress: action.payload.address
        };
      }
    
    
      throw new Error(`no such action : ${action.type}`)
}

export default reducer