import React, {Component} from 'react';
import axios from 'axios';
import './MyStocks.css'

import {connect} from 'react-redux';
import {initStock,addTickers, decrementStocksCount} from './../../actions/rootActions';


class MyStocks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            myStocks:[],
            message:null
         }
    }

    weekend_message(){
        let d = new Date();
        let n = d.getDay();
        if(n==6 ||n==7){
        let dateString=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        
        this.setState({
            message:`The Current price and Profit/Loss fields are showing data for ${dateString} and will be refreshed on Monday only`
        })
       
    }
    }
    deleteHandler(obj){
    //delete stock from firestore
    let objKey=obj.key;
    // console.log(objKey)
        axios.delete("https://test-64e17.firebaseio.com/myStocks/"+objKey+".json")
        .then(
            response=>{
                // console.log(response);
                let myarr=[];
                let value;
        
        //update redux store
        axios.get("https://test-64e17.firebaseio.com/myStocks.json")
        .then(response=>{
           
            // iterate over object
            if(response.data){
                const keys = Object.keys(response.data);
                keys.forEach((key, index) => {
                    if(key!=objKey){
                        response.data[key].symbol;
                        // alert(" updated");
                        value=response.data[key];
                        value['key']=key;
                       
                        myarr.push(value)
                    }
                 else{
                     alert("not updated");
                 }
               
                });
            }
           
            if(myarr.length>0){
                // console.log(myarr);
            }
            else{
                // console.log("no stock"); 
            }
            // console.log(myarr);
           
            {
                this.props.initStock(
                    {
                      stock:[...myarr]
                    }
                )
            }
         
            
        })   

        let count={
            stocksCount:this.props.stocksCount-1
          }
          axios.delete("https://test-64e17.firebaseio.com/stocksCount.json")
          .then(()=>{
           axios.post("https://test-64e17.firebaseio.com/stocksCount.json",count)  
           .then(()=>{
          
    
           }) 
       
          })
         
        // console.log("decrement_stocks") 
        this.props.decrementStocksCount();  

        //add to tickers
let ticker={
    symbol:obj.symbol,
    name:obj.name,
    
}
axios.post("https://test-64e17.firebaseio.com/allStocks.json",ticker)
.then(response=>{
    // console.log(response);

    let value;
    axios.get("https://test-64e17.firebaseio.com/allStocks.json")
    .then((response)=>{



if(response.data){
    const keys = Object.keys(response.data);
    // console.log(keys);
    // iterate over object
    let keyIndex=keys.length-1;
    let key=keys[keyIndex];
    value=response.data[key];
    if(value!=null){
        value['key']=key;
   
       
    }
    this.props.addTickers(
        {
            tickers:value
        }
    )
}
    // console.log(myarr);
   
} )

})    
    
            }
        )
        
        }
    
    render() { 
        // console.log("render");
        // console.log("stock-count")  
        // console.log(this.props.stocksCount);
        
        return ( 
            !this.props.addModal.length?<div className='noStock'>no stocks have been selected</div>
            : <div className="MyStocks">
              <h2>My Stocks</h2>
              <div className='weekend_message'>{this.state.message}</div>
              {/* <button onClick={()=>this.clickHandler()}>click </button> */}
        {/* <div>{this.props.addModal[1].name}</div> */}
              <table className='MyStocksTable'> 
                  <thead>
                  <tr className="tableHeader">
                      <th>Stock symbol</th>
                      <th>Stock name</th>
                      <th>No.of shares</th>
                      <th>Buy price</th>
                      <th>Current price</th>
                      <th>Profit/Loss</th>
                      <th></th>
                  </tr>
                  </thead>
                
                  <tbody>
                  {
        this.props.addModal.map(
            (obj,index)=>(
                <tr key={index}>
                   
                   <td className="">{obj.symbol} </td> 
                   <td className="">{obj.name} </td> 
                   <td className="">{obj.noOfShares} </td> 
                   <td className="">{obj.buyPrice} </td> 
                   <td className="">{obj.currentPrice} </td> 
                   <td className="">{Math.round((obj.currentPrice-obj.buyPrice)*obj.noOfShares)} </td> 
                   <td className=""><button className="StopTrackingBtn" onClick={()=>this.deleteHandler(obj)}>Stop Tracking</button>  </td> 
                   {/* obj.currentPrice-obj.buyPrice */}
                </tr>
            )
        )
    }            
              </tbody>
              </table>
            </div>
         );
    }

    componentDidMount(){
        let myarr=[];
        let value;
        axios.get("https://test-64e17.firebaseio.com/myStocks.json")
        .then(response=>{
           this.weekend_message(); 
        
        // console.log(Response);
            if(response.data){
            const keys = Object.keys(response.data);
            // iterate over object
            keys.forEach((key, index) => {
                value=response.data[key];
                value['key']=key;
               
                myarr.push(value)
           
            });
        }
            // console.log(myarr);
            this.props.initStock(
                {
                  stock:[...myarr]
                }
            )
            
        }) 
        
      
    }

 
}
 
const mapDispatchToProps = dispatch => ({

    initStock: (obj) => dispatch(initStock(obj)),
    addTickers:(obj) => dispatch(addTickers(obj)),
    decrementStocksCount:(obj) => dispatch(decrementStocksCount(obj)),
  })
  
  
  const mapStateToProps = state => ({
    // modalState:state.modalState,
    addModal:state.addModal,
    stocksCount:state.stocksCount
    
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyStocks)
