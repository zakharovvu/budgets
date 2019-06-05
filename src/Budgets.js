import React from 'react';
import './Budgets.css';
import Home from "./Components/Home"
import PageBudgets from "./Components/PageBudgets"
import DetailBudgets from "./Components/DetailBudgets"
import ModalB from "./Components/ModalB"
import ModalT from "./Components/ModalT"
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class Budgets extends React.Component {
  state = {
    kurs: {},
    isLoad: false,
    isLoadKurs: false,
    listCurrency: ["USD", "EUR", "GBP", "RUB"],
    listBudgets: [
      {
        id: 1559267539137,
        name: 'Food',
        currency: 'USD',
        budget: 1000,
        date: 1559267539137,
        transaction: [
          {
            id: 1559267539300,
            target: 'Potato',
            price: 12.00,
            currency: 'EUR',
            date: 1559267539300,
          },
          {
            id: 1559267549300,
            target: 'Сarrot',
            price: 20.00,
            currency: 'USD',
            date: 1559267549300,
          }
        ]
      },
      {
        id: 1559267539200,
        name: 'Car',
        currency: 'USD',
        budget: 2000,
        date: 1559267539200,
        transaction: [
          {
            id: 1559267539300,
            target: 'Еires',
            price: 450.00,
            currency: 'USD',
            date: 1559267539300,
          },
          {
            id: 1559267549300,
            target: 'Oil',
            price: 50.00,
            currency: 'USD',
            date: 1559267549300,
          }
        ]
      }
    ],
    modalb: false,
    modalt: false,
  }
  numberTimer = null

  getKurs = async (base = this.state.listCurrency[0]) => {
    let res = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    let data = await res.json()
    let kurs = await data
    return kurs
  }

  getData = async () => {
    let localValue = await JSON.parse(localStorage.getItem("budgets"))
    this.setState( {...localValue, isLoad: true, modalb: false, modalt: false} )
  }

  updateKurs = async () => {
    let arrKurs = {}
    let nameKurs = this.state.listCurrency
    for (let i = 0; i < nameKurs.length; i++) {
      let data = await this.getKurs(nameKurs[i])
      arrKurs[nameKurs[i]] = data.rates 
    }
    
    this.setState({ kurs: arrKurs, isLoadKurs: true })
  }

  componentDidMount() {
    this.getData()
    this.updateKurs()
    setInterval(this.updateKurs, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.numberTimer)
  }

  handleDeleteB = (id) => {
    let obj = this.state.listBudgets.filter(el => el.id !== id)
    this.setState({listBudgets: obj})
  }

  handleDeleteT = (idB, idT) => {
    let listBudgets = [...this.state.listBudgets]
    let indexB = listBudgets.findIndex(el => el.id === idB)
    let transaction = listBudgets[indexB].transaction.filter(el => el.id !== idT)
    listBudgets[indexB].transaction = transaction

    this.setState({ listBudgets })
  }

  handleModalB = (isVisible, budget) => {
    if (budget) {
      this.setState({ modalb: isVisible, listBudgets: [...this.state.listBudgets, budget]})
    } else {
      this.setState({ modalb: isVisible})
    }
  }

  handleModalT = (isVisible, transaction, id) => {
    if (transaction) {
      let budgets = [...this.state.listBudgets]
      
      for (let i = 0; i < budgets.length; i++) {
        if (budgets[i].id === id) {
          budgets[i].transaction.push(transaction)
        }
      }
      
      this.setState({ modalt: isVisible, listBudgets: budgets })
    } else {
      this.setState({ modalt: isVisible})
    }
  }

  render() {
    if (!this.state.isLoad) return <div>Load...</div>
    localStorage.setItem('budgets', JSON.stringify(this.state))
    
    return (
      <div className="Budgets">
        {this.state.modalb && <ModalB state={this.state} handleModalB={this.handleModalB} />}
        {this.state.modalt && <ModalT state={this.state} handleModalT={this.handleModalT} />}

        <Router>
        <nav>
          <NavLink activeStyle={{background: 'rgb(88, 126, 233)', color: 'black'}} exact to="/">Home </NavLink>
          <NavLink activeStyle={{background: 'rgb(88, 126, 233)', color: 'black'}} to="/budgets"> Budgets</NavLink>
          
        </nav>

          <Route exact path="/" component={Home} />
          <Route 
            exact path="/budgets" 
            render={props => 
              <PageBudgets
                handleDeleteB={this.handleDeleteB}
                handleModalB={this.handleModalB} 
                props={props} 
                state={this.state} 
              />} 
          />
          <Route 
            exact path="/budget/:id" 
            render={props => 
              <DetailBudgets
                handleDeleteT={this.handleDeleteT}
                handleModalT={this.handleModalT} 
                props={props} 
                state={this.state} 
              />} 
          />
        </Router>
      </div>
    );
  }
}

export default Budgets;
