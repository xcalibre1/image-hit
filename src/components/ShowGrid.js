import React, { useContext } from 'react'
import { Context } from '../Context'
import './Div.css'
import Div from './Div'

function ShowGrid(props) {
    return (
        <div className='rowdiv'>
            {props.row.map((item,index)=>(
                <Div key={index} row={props.rowNum} col={index} />
            ))}
        </div>
    )
}

export default ShowGrid
