import React from 'react';
import './Body.css'

import StockSelector from './../StockSelector/StockSelector';
import MyStocks from './../MyStocks/MyStocks';
export default function Body(){
    return (
        <div className="Body"> 
           
            <MyStocks/>
            <StockSelector/>
           
             </div>
        
    )
}