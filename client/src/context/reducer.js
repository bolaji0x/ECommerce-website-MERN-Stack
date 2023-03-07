import { 
    CLEAR_ALERT, 
    CLEAR_VALUES, 
    CREATE_PRODUCT_BEGIN, 
    CREATE_PRODUCT_ERROR, 
    CREATE_PRODUCT_SUCCESS, 
    DELETE_PRODUCT_BEGIN, 
    DISPLAY_ALERT, 
    GET_AUTHPRODUCTS_BEGIN, 
    GET_AUTHPRODUCTS_SUCCESS, 
    GET_CURRENT_USER_BEGIN, 
    GET_CURRENT_USER_SUCCESS, 
    HANDLE_CHANGE, 
    LOGOUT_USER, 
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
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