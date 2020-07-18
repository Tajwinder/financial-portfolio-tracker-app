// This is the initial state
let initialState = {
    modalState:false,
    modalDetails:{
        symbol:'A',
        name:null,
        key:null
    },
    addModal:[],
    tickers:[],
    stocksCount:0
    

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
        case "ADD_TICKERS":
                state = {
                    ...state,
                   tickers:[...state.tickers, action.payload.tickers]
                      
                   
                }
                break;
        case "UPDATE_SYMNAME":
            state = {
                ...state,
                modalDetails:{
                    ...state.modalDetails,
                    symbol:action.payload.symbol,
                    name:action.payload.name,
                    key:action.payload.key
                }

            }
            break;
        case "INIT_STOCK":
                state = {
                    ...state,
                   addModal:[...action.payload.stock]
                      
                   
                }
                break;
        case "INIT_TICKERS":
                    state = {
                        ...state,
                       tickers:[...action.payload.tickers]
                          
                       
                    }
                    break;
        case "INCREMENT_STOCKS_COUNT":
                    state = {
                        ...state,
                        stocksCount:state.stocksCount+1
                      
                          
                       
                    }
                    break;
        case "DECREMENT_STOCKS_COUNT":
                    state = {
                        ...state,
                        stocksCount:state.stocksCount-1
                      
                          
                       
                    }
                    break;
        case "INIT_STOCKS_COUNT":
                    state = {
                        ...state,
                      stocksCount:action.payload.count
                            
                        
                    }
                    break;
        case "OTHER_ACTION":
            break;

    }
    return state;
}

export default rootReducer;