import React from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body'
import ModalContainer from './components/ModalContainer/ModalContainer';
// import ReduxComp from './components/ReduxComp/ReduxComp';
export default function App(){
    return (
       
              <div> 
            <Header/>
            <Body/>
            <ModalContainer/>
             </div>
       
        
    )
}