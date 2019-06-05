import React from "react"
import '../Style/PageBudgets.css';
import { Link } from "react-router-dom"
import { remainder, date, addZeroes } from "../Payment"


const PageBudgets = ( props ) => {
  if (!props.state.isLoad) return <div>Loading...</div>
  let kurs = props.state.kurs
  let isLoadKurs = props.state.isLoadKurs
  
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Left</th>
            <th>Budget</th> 
            <th>Currency</th>
            <th>Date of creation</th> 
            <th>Delete</th> 
          </tr>
            {props.state.listBudgets.map((el, i) => {
              return (
                <tr key={i} >
                  <td><Link to={`/budget/${el.id}`}>{el.name}</Link></td>
                  <td>{remainder(el, kurs, isLoadKurs)}</td>
                  <td>{addZeroes(el.budget)}</td>
                  <td>{el.currency}</td>
                  <td>{date(el.date)}</td>
                  <td><button onClick={() => props.handleDeleteB(el.id)}>delete</button></td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <button onClick={() => props.handleModalB(true)}>Add</button>
    </div>
  )
}

export default PageBudgets