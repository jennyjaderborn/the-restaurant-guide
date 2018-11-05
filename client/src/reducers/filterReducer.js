
const initialState = {
    selectedOptions : []
}

export default function filter(state = initialState, action) {
    switch(action.type) {
  
      case 'UPDATE_OPTION':
        return {
        selectedOptions: [...state.selectedOptions, action.payload],
        loading: false
        }

        case 'UPDATE_OPTIONS':
        return {
        selectedOptions: action.payload,
        loading: false
        }




        default: return state;
    
    }

    }