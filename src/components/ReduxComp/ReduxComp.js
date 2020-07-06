import React, { Component } from 'react';

import { connect } from 'react-redux';

import { changeColor, changeColorBack } from '../../actions/rootActions';

class ReduxComp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        
        //binding this
       this.handleButtonClick=this.handleButtonClick.bind(this); 
       this.handleButtonClickBack=this.handleButtonClickBack.bind(this);
    }

    handleButtonClick () {
        console.log("hello")
        this.props.changeColor({ color: "blue" })
    }

    handleButtonClickBack() {
        console.log(this)
        this.props.changeColor({ color: "red" })
    }


    render() {
        return (
            <div>
                <div style={{ backgroundColor: this.props.color }}>
                    {this.props.color}
                </div>
                <button onClick={this.handleButtonClick}>Blue</button>
                <button onClick={this.handleButtonClickBack}>Red</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeColor: (obj) => dispatch(changeColor(obj)),
    changeColorBack: (obj) => dispatch(changeColorBack(obj)),
})

const mapStateToProps = state => ({
    color: state.color,
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxComp)