import React, { Component } from 'react';
import './CustomModal.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {addRequest,hideModal, initTickers, incrementStocksCount} from './../../actions/rootActions';

class CustomModal extends Component{
  
    constructor(props) {
      super(props);
      this.state = {
        api:true,
        submit:null,
        noOfShares:null,
        buyPrice:null,
        buyDate:null
        }
     this.hideModalHandler=this.hideModalHandler.bind(this);
     this.addToStocksHandler=this.addToStocksHandler.bind(this);
  }
     hideModalHandler(){
        
  this.props.hideModal();
    // console.log("vcvc")
   
    }
    fieldValidation(){
      let add;
      
      if(this.state.noOfShares==null||this.state.buyPrice==null||this.state.buyDate==null){
       
        this.setState(
          {
            submit:false,
            message:'All the fields must be filled'
          }
        )
        add=false;
      }
      
       else{
       
        this.setState({
          message:null,
          submit:true
        })
        add=true
      }
      return add;
    }
    addToStocksHandler(){
      // this.fieldValidation();
      if(!this.fieldValidation()){
        // console.log("submit false")
        return;
      }
       if(!this.state.api){
         this.props.hideModal();
         alert("There seems to be a issue with server");
         return 
       }
      //object to added to redux store as well as firestore
      let obj={
        symbol:this.props.modalDetails.symbol,
        name:this.props.modalDetails.name,
        noOfShares:this.state.noOfShares,
        buyPrice:this.state.buyPrice,
        currentPrice:this.state.currentPrice
        
      }

   
   
    //post to firestore
    axios.post("https://test-64e17.firebaseio.com/myStocks.json",obj)
       .then(()=>{
          //  console.log(response);
          axios.get("https://test-64e17.firebaseio.com/myStocks.json")
          .then(response=>{
            let keys=Object.keys(response.data);
            let newKey=keys[keys.length-1];
            let value=response.data[newKey];
            if(value!=null){
              value['key']=newKey;
              this.props.addRequest({
                stock:value
              })
            }
          })
       })  
       
      //delete stock from stockselector
      let key=this.props.modalDetails.key;
      // console.log(key)
      axios.delete("https://test-64e17.firebaseio.com/allStocks/"+key+".json")
          .then(
              Response=>{
                
                  let myarr=[];
                  let value;

                  //get and update the tickers in store
      
                  axios.get("https://test-64e17.firebaseio.com/allStocks.json")
                  .then((response)=>{
                  if(response.data){
                  const keys = Object.keys(response.data);
                  // console.log(keys);
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
              }
          ) 
       let count={
         stocksCount:this.props.stocksCount+1
       }
       axios.delete("https://test-64e17.firebaseio.com/stocksCount.json")
       .then(()=>{
        axios.post("https://test-64e17.firebaseio.com/stocksCount.json",count)  
        .then(()=>{
         
 
        }) 
       
       })
      
       this.props.incrementStocksCount();
       this.props.hideModal();
    
   
    }
    render(){
      if(this.props.modalState==false) {
        return null;
      }
      return(
     
        <div className="AddStockForm">
          
          <div className="ModalContent">
          
             <h2>Add {this.props.modalDetails.name} to My Stocks</h2>
             <div className="content">
             <div>Price: {this.state.currentPrice}</div>  
               <div className="modalAttributes">
                 <label>Company Name:</label>
                 <label>{this.props.modalDetails.name}</label>
               </div>
               <div className="modalAttributes">
                 <label>No. of Shares:</label>
                 <input placeholder="No. of Shares" id='noShares' className="inputBox" required
                  onChange={(e)=>this.setState({
                    noOfShares:e.target.value
                  })}>
                   </input>
                  
               </div>
               <div className="modalAttributes">
                 <label>Buy price:</label>
                 <input placeholder="Buying price" id='buyPrice' className="inputBox" onChange={(e)=>this.setState({buyPrice:e.target.value})}></input>
               </div>
               <div className="modalAttributes">
                 <label>Buy date:</label>
                 <input type="date"id='buyDate' className="inputBox" onChange={(e)=>this.setState({buyDate:e.target.value})}></input>
               </div>
               
               <div>{this.state.message}</div> 
              
              
             </div >
             <div className='btn'>
               <button id='cancelBtn' onClick={()=>this.hideModalHandler()}>X</button>
               <button  className='AddButton' onClick={()=>this.addToStocksHandler(this.props.modalDetails)}>Add</button>
             </div>  
          </div>
 
        </div>
     )
    }
    
    componentDidMount(){
      let objSymbol=this.props.modalDetails.symbol;
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${objSymbol}&apikey=PSFF2RN9UIO4E1XE`) 
    
    .then(Response=>
      {
        
       this.setState({
         api:true
       })
       let key= Response.data["Meta Data"
        
        ]["3. Last Refreshed"];
        let value=Response.data["Time Series (Daily)"][key]["4. close"];
        
        this.setState(
          {
            currentPrice:value
          }
        )
      }).catch(()=>{
        this.setState({
          api:false
        })
        console.log("error");

      }); 
    }
}

const mapDispatchToProps = dispatch => ({
  hideModal: (obj) => dispatch(hideModal(obj)),
  addRequest: (obj) => dispatch(addRequest(obj)),
  initTickers: (obj) => dispatch(initTickers(obj)),
  incrementStocksCount: (obj) => dispatch(incrementStocksCount(obj)), 
  
  
})

 
const mapStateToProps = state => ({
  modalState:state.modalState,
  addModal:state.addModal,
  stocksCount:state.stocksCount,
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)
