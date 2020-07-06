import React, { Component } from 'react';
import './CustomModal.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {addRequest,hideModal} from './../../actions/rootActions';
import Axios from 'axios';
class CustomModal extends Component{
  
    constructor(props) {
      super(props);
      this.state = {
         
        }
     this.hideModalHandler=this.hideModalHandler.bind(this);
     this.addToStocksHandler=this.addToStocksHandler.bind(this);
  }
     hideModalHandler(){
        
  this.props.hideModal();
    // console.log("vcvc")
   
    }
    addToStocksHandler(){
      let obj={
        symbol:this.props.modalDetails.symbol,
        name:this.props.modalDetails.name,
        noOfShares:this.state.noOfShares,
        buyPrice:this.state.buyPrice,
        currentPrice:this.state.currentPrice
        
      }

    
    this.props.addRequest({
      stock:obj
    })
   
    axios.post("https://test-64e17.firebaseio.com/myStocks.json",obj)
       .then(response=>{
          //  console.log(response);
       })   
     
       this.props.hideModal();
    // console .log("addmodal")
    // let arr=this.props.addModal;
    // console.log(arr);
   
    }
    render(){
      if(this.props.modalState==false) {
        return null;
      }
      return(
     
        <div className="AddStockModal">
          
          <div className="ModalContent">
          
             <h2>Add {this.props.modalDetails.name} to My Stocks</h2>
             <div className="content">
               <div className="modalAttributes">
                 <label>Company Name:</label>
                 <label>{this.props.modalDetails.name}</label>
               </div>
               <div>{this.state.currentPrice}</div>
               <div className="modalAttributes">
                 <label>No. of Shares:</label>
                 <input placeholder="No. of Shares" className="inputBox"onChange={(e)=>this.setState({noOfShares:e.target.value})}></input>
               </div>
               <div className="modalAttributes">
                 <label>Buy price:</label>
                 <input placeholder="Buying price" className="inputBox" onChange={(e)=>this.setState({buyPrice:e.target.value})}></input>
               </div>
               <div className="modalAttributes">
                 <label>Buy date:</label>
                 <input type="date" className="inputBox"></input>
               </div>
               
               
               
               
 
               <button  onClick={()=>this.hideModalHandler()}>cancel</button>
               <button  onClick={()=>this.addToStocksHandler(this.props.modalDetails)}>Add</button>
              
             </div>
          </div>
 
        </div>
     )
    }
    
    componentDidMount(){
      axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMZN&apikey=PSFF2RN9UIO4E1XE") 
    
    .then(Response=>
      {
       
       let key= Response.data["Meta Data"
        
        ]["3. Last Refreshed"];
        let value=Response.data["Time Series (Daily)"][key]["4. close"];
        
        this.setState(
          {
            currentPrice:value
          }
        )
      }); 
    }
}

const mapDispatchToProps = dispatch => ({
  hideModal: (obj) => dispatch(hideModal(obj)),
  addRequest: (obj) => dispatch(addRequest(obj)),

  
})


const mapStateToProps = state => ({
  modalState:state.modalState,
  addModal:state.addModal
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)
// export default CustomModal;