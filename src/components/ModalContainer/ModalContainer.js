import React, {Component} from "react";
import {connect} from 'react-redux';
import {hideModal, showModal, updateSymName} from './../../actions/rootActions';
import CustomModal from './../CustomModal/CustomModal';
class ModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    // fun(){
    //     console.log("fun");
    // }

   
    render() { 
        return ( 
            this.props.modalState?
            <CustomModal hideModal={this.props.hideModal} modalDetails={this.props.modalDetails} />: null
         );
    }
}
 
const mapDispatchToProps = dispatch => ({
    hideModal: (obj) => dispatch(hideModal(obj)),
    showModal: (obj) => dispatch(showModal(obj)),
    
})


const mapStateToProps = state => ({
    modalState:state.modalState,
    modalDetails:state.modalDetails
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
