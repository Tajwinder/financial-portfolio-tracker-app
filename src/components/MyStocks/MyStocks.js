import React, {Component} from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {initStock} from './../../actions/rootActions';
let result;
let myStocks={
    "allStocks":[
        {
            "symbol":"AMZN",
            "name":"Amazone.com Inc",
            "No":23,
            "BuyPrice":144,
            "CurrentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        },
        {
            "symbol":"GS",
            "name":"Goldman Sachs Group Inc",
            "No":23,
            "BuyPrice":144,
            "CurrentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        },
        {
            "symbol":"HD",
            "name":"Home Depot Inc",
            "No":23,
            "BuyPrice":144,
            "CurrentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        },
        {
            "symbol":"INTC",
            "name":" Intel Corporation",
            "No":23,
            "BuyPrice":144,
            "CurrentPrice":3434,
            "Profit/Loss":5454,
            "Action":"Action"
        }
       
       
    
    ]
        
   
}
class MyStocks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            myStocks:[]
         }
    }
    deleteHandler(key){
    
        axios.delete("https://test-64e17.firebaseio.com/myStocks/"+key+".json")
        .then(
            response=>{
                console.log(response);
                let myarr=[];
        let value;
        axios.get("https://test-64e17.firebaseio.com/myStocks.json")
        .then(response=>{
           
            // iterate over object
            if(response.data){
                const keys = Object.keys(response.data);
                keys.forEach((key, index) => {
                    value=response.data[key];
                    value['key']=key;
                   
                    myarr.push(value)
               
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
                   <td className="" onClick={()=>this.deleteHandler(obj.key)}>ACTION </td> 
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
