import React, { useContext } from 'react'
import { Context } from '../Context'
import './Div.css'

function Div({row,col}) {
    const {incrementCounter,visible,grid}=useContext(Context);
    return (
        <div className='mydiv' onClick={()=>incrementCounter(row,col,grid[row][col])}>
            <img src={visible[row][col] ? grid[row][col]: "https://wallpaper-house.com/data/out/6/wallpaper2you_109365.jpg"}/>
        </div>
    )
}

export default Div
