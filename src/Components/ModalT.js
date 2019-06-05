import React from "react"
import { allPriceTransaction } from "../Payment"

import '../Style/ModalT.css';

class ModalT extends React.Component {
  
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
    let value = e.target.value
    this.setState({inputSum: value, erSum: true})
  }

  handleCurrency = (e) => {
    this.setState({ currency: e.target.value})
  }

  handleCreateTransaction = () => {
    let kurs = this.props.state.kurs
    let currency = this.state.currency
    let price = parseFloat(this.state.inputSum)

    let s = parseFloat(this.state.inputSum)
    let n = this.state.inputName !== ''
    this.setState({ erName: Boolean(n), erSum: Boolean(s) })
    
    if (Boolean(s) && Boolean(n)) {
      let url = document.URL.split('/')
      let id = parseInt(url[url.length - 1])
      let el = this.props.state.listBudgets.find(el => el.id === id)
      
      if (Math.round(allPriceTransaction(el, kurs, price, currency)) > el.budget) {
        this.setState({ erSum: false })
        alert('The sum of purchases exceeds the budget. Operation rejected.')
        return
      }

      this.props.handleModalT(false, {
        id: Date.now(),
        target: this.state.inputName,
        price,
        currency: currency,
        date: Date.now(),
      }, id)
    }
  }
  render() {
    return (
      <div className="modalt">
        <div className="modalb_content">
        <div className="input">
          <label>Purpose<input className={this.state.erName ? '' : 'error'} onChange={(e) => this.handleName(e)} value={this.state.inputName} /></label>
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
            <button onClick={() => this.props.handleModalT(false)}>Close</button>
            <button onClick={this.handleCreateTransaction}>Create</button>
          </div>
        </div>
      </div> 
    )
  }
}

export default ModalT