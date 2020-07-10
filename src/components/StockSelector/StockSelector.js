import React, {Component} from 'react';
import './StockSelector.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {hideModal, showModal,updateSymName,initTickers} from './../../actions/rootActions';

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
            // tickers:[],
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
    // testHandler(){
    //     let key="1";
    //     axios.delete("https://test-64e17.firebaseio.com/allStocks/"+key+".json")
    //     .then(
    //         Response=>{
    //             console.log(Response);
    //         }
    //     )
    // }
    render() { 
        return ( 
            <div>
                 
               
<div className="AddStocksTitle">
    <h2>All Stocks</h2>
    {/* <button onClick={()=>this.testHandler()}>test</button> */}
    <ul className="AddStocksList">
    {
        this.props.tickers.map(
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
        let myarr=[];
        let value;
        axios.get("https://test-64e17.firebaseio.com/allStocks.json")
        .then((response)=>{
    //         console.log(response.data)
    //         let keys=Object.keys(response.data);
    //         // console.log(keys) ;
    //     //     this.setState(
    //     //         {
    //     //             tickers:[...response.data]
    //     //         }
    //     //         )
    


    //     // })

    //     keys.forEach((key, index) => {
    //        let value=response.data[key];
    //         // value['key']=key;
           
    //         // myarr.push(value)
    //    console.log(value)
    //     });
    
    if(response.data){
        const keys = Object.keys(response.data);
        console.log(keys);
        // iterate over object
        keys.forEach((key, index) => {
            value=response.data[key];
            if(value!=null){
                value['key']=key;
           
                myarr.push(value)
            }
            // console.log(value);
         
       
        });
    }
        // console.log(myarr);
        this.props.initTickers(
            {
                tickers:[...myarr]
            }
        )
    } )
    //     axios.get("https://test-64e17.firebaseio.com/myStocks.json")
    //     .then((response)=>{
    //         console.log(response.data);
    //         let keys=Object.keys(response.data);
    //         // console.log(keys) ;
    //     //     this.setState(
    //     //         {
    //     //             tickers:[...response.data]
    //     //         }
    //     //         )
    


    //     // })

    //     keys.forEach((key, index) => {
    //        let value=response.data[key];
    //         // value['key']=key;
           
    //         // myarr.push(value)
    //    console.log(value)
      
            
    //     })
    // })
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
    updateSymName: (obj) => dispatch(updateSymName(obj)),
    initTickers:(obj) => dispatch(initTickers(obj)),
    
})


const mapStateToProps = state => ({
  modalState:state.modalState,
  tickers:state.tickers
})

export default connect(mapStateToProps, mapDispatchToProps)(StockSelector)
// export default StockSelector;