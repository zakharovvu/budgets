import React from "react"
import '../Style/ModalB.css';

class ModalB extends React.Component {
  
  state = {
    inputName: '',
    inputSum: '',
    erSum: true,
    erName: true,
    currency: this.props.state.listCurrency[0]
  }
  handleName = (e) => {
    let value = e.target.value
    this.setState({inputName: value, erName: true})
  }
  handleSum = (e) => {
    this.setState({inputSum: e.target.value, erSum: true})
  }

  handleCurrency = (e) => {
    this.setState({ currency: e.target.value})
  }
  handleCreateBudget = () => {
    let s = parseFloat(this.state.inputSum)
    let n = this.state.inputName !== ''
    this.setState({ erName: Boolean(n), erSum: Boolean(s) })
    
    if (Boolean(s) && Boolean(n)) {
      this.props.handleModalB(false, {
        id: Date.now(),
        date: Date.now(),
        name: this.state.inputName,
        currency: this.state.currency,
        budget: parseInt(this.state.inputSum),
        transaction: []
      })
    }
  }
  render() {
    return (
      <div className="modalb">
        <div className="modalb_content">
          <div className="input">
            <label>Name<input className={this.state.erName ? '' : 'error'} onChange={(e) => this.handleName(e)} value={this.state.inputName} /></label>
            <label>Sum<input className={this.state.erSum ? '' : 'error'} onChange={(e) => this.handleSum(e)} value={this.state.inputSum} /></label>
          </div>
          
          <select onChange={(e) => this.handleCurrency(e)} value={this.state.currency}>
            {this.props.state.listCurrency.map((el, i) => {
              return (
                <option key={el}>{el}</option>
              )
            })}
          </select><br />
          <div className="modalb_button">
            <button onClick={() => this.props.handleModalB(false)}>Close</button>
            <button onClick={this.handleCreateBudget}>Create</button>
          </div>
        </div>
      </div> 
    )
  }
}

export default ModalB