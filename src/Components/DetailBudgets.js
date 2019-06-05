import React from "react"
import {remainder, maxTransaction, minTransaction, date, middle, addZeroes} from "../Payment"
import "../Style/DetailBudgets.css"

const DetailBudgets = ({ props, state, handleModalT, handleDeleteT }) => {
  if (!state.isLoad) return <div>Load...</div>
  let kurs = state.kurs
  let isLoadKurs = state.isLoadKurs
  let id = parseInt(props.match.params.id)
  let currentBudget = state.listBudgets.find(el => el.id === id)
  
  if (!currentBudget) {
    let url = document.URL.split('/')
    let id = parseInt(url[url.length - 1])
    return <div>Budget ( id:{id} ) does not exist</div>
  }
  return (
    <div>
      <div>{currentBudget.name}</div>
      <table>
        <tbody>
          <tr>
            <th>Left</th>
            <th>Middle</th>
            <th>Max</th>
            <th>Min</th>
            <th>Currency</th>
          </tr>
          <tr>
            <td>{remainder(currentBudget, kurs, isLoadKurs)}</td>
            <td>{middle(currentBudget, kurs)}</td>
            <td>{maxTransaction(currentBudget, kurs)}</td>
            <td>{minTransaction(currentBudget, kurs)}</td>
            <td>{currentBudget.currency}</td>
          </tr>
        </tbody>
      </table>

      <div>Transaction</div>
      <table>
        <tbody>
          <tr>
            <th>Purpose</th>
            <th>Sum</th>
            <th>Currency</th>
            <th>Date of creation</th>
            <th>Delete</th>
          </tr>
          {currentBudget.transaction.map((el, i) => {
            return (
              <tr key={i}>
                <td>{el.target}</td>
                <td>{addZeroes(el.price)}</td>
                <td>{el.currency}</td>
                <td>{date(el.date)}</td>
                <td><button onClick={() => handleDeleteT(currentBudget.id, el.id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={() => handleModalT(true)}>Add</button>
    </div>
  )
}

export default DetailBudgets