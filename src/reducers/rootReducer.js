// This is the initial state
let initialState = {
    modalState:false,
    modalDetails:{
        symbol:'A',
        name:null
    },
    addModal:[]
    

}

// This is your reducer

const rootReducer = (state = {...initialState}, action) => {
    switch(action.type){
        case "SHOW_MODAL":
            state = {
                ...state,
                modalState:true
            }
            break;
        case "HIDE_MODAL":
            state = {
                ...state,
                modalState:false
            }
            break;
       
        case "ADD_REQUEST":
            state = {
                ...state,
               addModal:[...state.addModal, action.payload.stock]
                  
               
            }
            break;
        case "UPDATE_SYMNAME":
            state = {
                ...state,
                modalDetails:{
                    ...state.modalDetails,
                    symbol:action.payload.symbol,
                    name:action.payload.name
                }

            }
            break;
        case "INIT_STOCK":
                state = {
                    ...state,
                   addModal:[...action.payload.stock]
                      
                   
                }
                break;
        case "OTHER_ACTION":
            break;

    }
    return state;
}

export default rootReducer;