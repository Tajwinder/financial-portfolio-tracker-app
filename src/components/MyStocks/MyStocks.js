import React, {Component} from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {initStock,addTickers} from './../../actions/rootActions';


class MyStocks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            myStocks:[]
         }
    }
    deleteHandler(obj){
    //delete stock from firestore
    let objKey=obj.key;
        axios.delete("https://test-64e17.firebaseio.com/myStocks/"+objKey+".json")
        .then(
            response=>{
                console.log(response);
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
                        alert(" updated");
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
                console.log(myarr);
            }
            else{
                console.log("no stock"); 
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

        //add to tickers
let ticker={
    symbol:obj.symbol,
    name:obj.name,
    
}
axios.post("https://test-64e17.firebaseio.com/allStocks.json",ticker)
.then(response=>{
    console.log(response);

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
        console.log("render");
        
        return ( 
            !this.props.addModal.length?<div>no stocks have been selected</div>
            : <div className="myStocks">
              <h2>My Stocks</h2>
              {/* <button onClick={()=>this.clickHandler()}>click </button> */}
        {/* <div>{this.props.addModal[1].name}</div> */}
              <table>
                  <tr>
                      <th>Stock symbol</th>
                      <th>Stock name</th>
                      <th>No.of shares</th>
                      <th>Buy price</th>
                      <th>Current price</th>
                      <th>Profit/Loss</th>
                      <th>Action</th>
                  </tr>

                  {
        this.props.addModal.map(
            (obj)=>(
                <tr>
                   
                   <td className="">{obj.symbol} </td> 
                   <td className="">{obj.name} </td> 
                   <td className="">{obj.noOfShares} </td> 
                   <td className="">{obj.buyPrice} </td> 
                   <td className="">{obj.currentPrice} </td> 
                   <td className="">{obj.currentPrice-obj.buyPrice} </td> 
                   <td className="" onClick={()=>this.deleteHandler(obj)}>ACTION </td> 
                   {/* obj.currentPrice-obj.buyPrice */}
                </tr>
            )
        )
    }            
              </table>
            </div>
         );
    }

    componentDidMount(){
        let myarr=[];
        let value;
        axios.get("https://test-64e17.firebaseio.com/myStocks.json")
        .then(response=>{
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
    
  })
  
  
  const mapStateToProps = state => ({
    // modalState:state.modalState,
    addModal:state.addModal
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyStocks)
// export default MyStocks;

// const keys = Object.keys(fruits)
// for (const key of keys) {
//   console.log(key)
// }
