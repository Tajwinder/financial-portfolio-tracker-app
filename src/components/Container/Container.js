import React from 'react';
import StockSelector from './../StockSelector/StockSelector';
import MyStocks from './../MyStocks/MyStocks';
import HorizontalLine from './../horizontalLine/HorizontalLine'
function Container(){
    return(
        <div>
             <MyStocks/>
        <HorizontalLine/>
        <StockSelector/>
        </div>
       
    )

}
export default Container;