import React, {Component} from 'react';
import './StockSelector.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {hideModal, showModal,updateSymName} from './../../actions/rootActions';

let tickerList={
    "allStocks":[
        {
            "symbol":"AMZN",
            "name":"Amazone.com Inc",
            "No":23,
            "BuyPrice":144,
            "CurentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        },
        {
            "symbol":"AMZN",
            "name":"Amazone.com Inc",
            "No":23,
            "BuyPrice":144,
            "CurentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        },
        {
            "symbol":"AMZN",
            "name":"Amazone.com Inc",
            "No":23,
            "BuyPrice":144,
            "CurentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        }
       
       
       
    
    ]
        
   
}
class StockSelector  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickers:[],
            modal:false,
            ChosenStock:""
          }
        this.showModalHandler=this.showModalHandler.bind(this); 
    }
    showModalHandler(obj){

        this.props.showModal();
        this.props.updateSymName(obj);
        // console.log("handleClick");
        // console.log(obj);
       
    }
    render() { 
        return ( 
            <div>
                 
               
<div className="AddStocksTitle">
    <h2>All Stocks</h2>
    <ul className="AddStocksList">
    {
        this.state.tickers.map(
            (obj)=>(
                <li className="tickers">
                   <button className="StockButton" onClick={()=>this.showModalHandler(obj)}>{obj.symbol} </button> 
                   <div className="tickerName">{obj.name} </div> 
                </li>
            )
        )
    }
    </ul>
</div>
            </div>

         );
    }
    componentDidMount(){
        axios.get("https://test-64e17.firebaseio.com/allStocks.json")
        .then((response)=>{
            console.log(response.data)
            this.setState(
                {
                    tickers:[...response.data]
                }
                )
    


        })
        
    // "allStocks":[
    //     {
    //         "symbol":"AMZN",
    //         "name":"Amazone.com Inc"
    //     },
    //     {
    //         "symbol":"GS",
    //         "name":"Goldman Sachs Group Inc"
    //     },
    //     {
    //         "symbol":"HD",
    //         "name":"Home Depot Inc"
    //     },
    //     {
    //         "symbol":"INTC",
    //         "name":" Intel Corporation"
    //     }
       
       
    
    // ]
        
    //    axios.post("https://test-64e17.firebaseio.com/myStocks.json",{
    //     "allStocks":[
    //         {
    //             "symbol":"AMZN",
    //             "name":"Amazone.com Inc",
    //             "No":23,
    //             "BuyPrice":144,
    //             "Action":"Action"
    //         },
    //         {
    //             "symbol":"AMZN",
    //             "name":"Amazone.com Inc",
               
    //             "Action":"Action"
    //         },
    //         {
    //             "symbol":"AMZN",
    //             "name":"Amazone.com Inc",
               
    //             "Action":"Action"
    //         }
           
           
           
        
    //     ]
           
    //    })
    //    .then(response=>{
    //        console.log(response);
    //    })    
    }
}
  
const mapDispatchToProps = dispatch => ({
    hideModal: (obj) => dispatch(hideModal(obj)),
    showModal: (obj) => dispatch(showModal(obj)),
    updateSymName: (obj) => dispatch(updateSymName(obj))
    
})


const mapStateToProps = state => ({
  modalState:state.modalState,
})

export default connect(mapStateToProps, mapDispatchToProps)(StockSelector)
// export default StockSelector;