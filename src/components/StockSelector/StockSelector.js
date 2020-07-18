import React, {Component} from 'react';
import './StockSelector.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {hideModal, showModal,updateSymName,initTickers, initStocksCount} from './../../actions/rootActions';


        
   

class StockSelector  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // tickers:[],
            modal:false,
            
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
        if(this.props.stocksCount>=5) {
            return <div className='maxCount'> You can select 5 five stocks maximum</div>;
          }
        // this.props.stocksCount==5 ? null:
        return ( 
           
            <div>
                 
               
<div className="AddStocksTitle">
    <h2>All stocks to my stocks</h2>
    
    <ul className="AddStocksList">
    {
        this.props.tickers.map(
            (obj,index)=>(
                <li key={index} className="tickers">
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
        //get stocksCount from firebase
          axios.get("https://test-64e17.firebaseio.com/stocksCount.json")
             .then(response=>{
             
             
               const keys = Object.keys(response.data);
               let val;
               // console.log(keys);
               // iterate over object
               keys.forEach((key, index) => {
                   val=response.data[key].stocksCount;
                  
                   this.props.initStocksCount({
                       count:val
                   })
           
               })
             })

            

        let myarr=[];
        let value;
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
               
   
    }
    

  
const mapDispatchToProps = dispatch => ({
    hideModal: (obj) => dispatch(hideModal(obj)),
    showModal: (obj) => dispatch(showModal(obj)),
    updateSymName: (obj) => dispatch(updateSymName(obj)),
    initTickers:(obj) => dispatch(initTickers(obj)),
    initStocksCount:(obj) => dispatch(initStocksCount(obj)),

    
})


const mapStateToProps = state => ({
  modalState:state.modalState,
  tickers:state.tickers,
  stocksCount:state.stocksCount
})

export default connect(mapStateToProps, mapDispatchToProps)(StockSelector)
 