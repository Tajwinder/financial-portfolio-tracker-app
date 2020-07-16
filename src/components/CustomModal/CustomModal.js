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
      // console.log("test fun");
      // // console.log(this.state.noOfShares+' '+this.state.buyPrice+' '+this.state.buyPrice)
      if(this.state.noOfShares==null||this.state.buyPrice==null||this.state.buyDate==null){
        // console.log("empty");
        // console.log(this.state.noOfShares+' '+this.state.buyPrice+' '+this.state.buyDate)
        this.setState(
          {
            submit:false,
            message:'All the fields must be filled'
          }
        )
      }
      
       else{
        //  console.log("not empty")
        // console.log(this.state.noOfShares)
        this.setState({
          message:null,
          submit:true
        })
      }
    }
    addToStocksHandler(){
      this.fieldValidation();
      if(!this.state.submit){
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

    //add to firestore
    // this.props.addRequest({
    //   stock:obj
    // })
   
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
      console.log(key)
      axios.delete("https://test-64e17.firebaseio.com/allStocks/"+key+".json")
          .then(
              Response=>{
                  console.log(Response);
                  let myarr=[];
                  let value;

                  //get and update the tickers in store
      
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
              }
          ) 
       let count={
         stocksCount:this.props.stocksCount+1
       }
       axios.delete("https://test-64e17.firebaseio.com/stocksCount.json")
       .then(()=>{
        axios.post("https://test-64e17.firebaseio.com/stocksCount.json",count)  
        .then(()=>{
          // console.log("count_updated");
          // axios.get("https://test-64e17.firebaseio.com/stocksCount.json")
          // .then(response=>{
          //   console.log("stockCountData when added")
          //   console.log(response.data);
          // })
 
        }) 
        // console.log("deleted")
       })
      
       this.props.incrementStocksCount();
       this.props.hideModal();
    // console .log("addmodal")
    // let arr=this.props.addModal;
    // console.log(arr);
    //  axios.delete("https://test-64e17.firebaseio.com/allStocks/"+key+".json")
   
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
                 <input placeholder="No. of Shares" className="inputBox" required
                  onChange={(e)=>this.setState({
                    noOfShares:e.target.value
                  })}>
                   </input>
                  
               </div>
               <div className="modalAttributes">
                 <label>Buy price:</label>
                 <input placeholder="Buying price" className="inputBox" onChange={(e)=>this.setState({buyPrice:e.target.value})}></input>
               </div>
               <div className="modalAttributes">
                 <label>Buy date:</label>
                 <input type="date" className="inputBox" onChange={(e)=>this.setState({buyDate:e.target.value})}></input>
               </div>
               
               
               
               
               <div>{this.state.message}</div>
               <button  onClick={()=>this.hideModalHandler()}>cancel</button>
               <button  onClick={()=>this.addToStocksHandler(this.props.modalDetails)}>Add</button>
              
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
        // let d = new Date();
        // let n = d.getDay()
        // console.log(n);
        // console.log(Response);
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
// export default CustomModal;