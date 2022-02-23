import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVal: 0,
      fullEquation: "",
      decimal: false
    }

    this.handleNumClick = this.handleNumClick.bind(this);
    this.handleOpClick = this.handleOpClick.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.clear = this.clear.bind(this);
    this.compute = this.compute.bind(this);
  }

  handleNumClick(e) {
    if (this.state.currentVal === 0) {
      this.setState({
        currentVal: e.target.value
      })
    }
    else {
      this.setState({
        currentVal: this.state.currentVal + e.target.value
      })
    }
    console.log(typeof this.state.currentVal);
  }

  handleOpClick(e) {
    if (e.target.value !== "-") {
      if (this.state.currentVal !== 0) {
        let equation = this.state.currentVal.split("");
        if (equation[equation.length - 1] !== "/" && equation[equation.length - 1] !== "+" && equation[equation.length - 1] !== "*" && equation[equation.length - 1] !== "-" && equation[equation.length - 1] !== ".") {
          this.setState({
            fullEquation: this.state.fullEquation + this.state.currentVal + e.target.value,
            currentVal: 0,
            decimal: false
          });
        }
      }
      else {
        if (this.state.currentVal === 0 && this.state.fullEquation !== "") {
          this.setState({
            fullEquation: this.state.fullEquation.slice(0, -1) + e.target.value,
            currentVal: 0,
            decimal: false
          });
        }
      }
    }
    else {
      if (this.state.currentVal === 0) {
        this.setState({
          currentVal: "-",
          decimal: false
        });
      }
      else {
        this.setState({
          fullEquation: this.state.fullEquation + this.state.currentVal + e.target.value,
          currentVal: 0,
          decimal: false
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.decimal === false) {
      this.setState({
        currentVal: this.state.currentVal + ".",
        decimal: true
      })
    }
  }

  clear() {
    this.setState({
      currentVal: 0,
      fullEquation: "",
      decimal: false
    })
  }

  compute(e) {
    let ans = eval(this.state.fullEquation + this.state.currentVal + e.target.value);
    this.setState(() => {
      return {
        fullEquation: "",
        currentVal: ans + "",
        decimal: false
      }
    });
  }

  render() {
    return (
      <div id="calculator">
        <div id="display">
          <h3>{this.state.fullEquation}</h3>
          <h1>{this.state.currentVal}</h1>
        </div>
        <div id="row-1">
          <button className="operation-Button" id="clear" onClick={this.clear}>AC</button>
          <button className="operation-Button" id="divide" value={"/"} onClick={this.handleOpClick}>/</button>
        </div>
        <div id="row-2">
          <button className="input-Button" id="seven" value={7} onClick={this.handleNumClick}>7</button>
          <button className="input-Button" id="eight" value={8} onClick={this.handleNumClick}>8</button>
          <button className="input-Button" id="nine" value={9} onClick={this.handleNumClick}>9</button>
          <button className="operation-Button" id="multiply" value={"*"} onClick={this.handleOpClick}>X</button>
        </div>
        <div id="row-3">
          <button className="input-Button" id="four" value={4} onClick={this.handleNumClick}>4</button>
          <button className="input-Button" id="five" value={5} onClick={this.handleNumClick}>5</button>
          <button className="input-Button" id="six" value={6} onClick={this.handleNumClick}>6</button>
          <button className="operation-Button" id="subtract" value={"-"} onClick={this.handleOpClick}>-</button>
        </div>
        <div id="row-4">
          <button className="input-Button" id="one" value={1} onClick={this.handleNumClick}>1</button>
          <button className="input-Button" id="two" value={2} onClick={this.handleNumClick}>2</button>
          <button className="input-Button" id="three" value={3} onClick={this.handleNumClick}>3</button>
          <button className="operation-Button" id="add" value={"+"} onClick={this.handleOpClick}>+</button>
        </div>
        <div id="row-5">
          <button className="input-Button" id="zero" value={0} onClick={this.handleNumClick}>0</button>
          <button className="input-Button" id="decimal" onClick={this.handleDecimal}>.</button>
          <button className="operation-Button" id="equals" onClick={this.compute}>=</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));