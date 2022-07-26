import React from 'react'
export default function Die(props){
    
   
    return(
        <div className={props.isHeld? 'die2': 'die'}
        onClick={()=>props.register(props.id)}
        >
            <h2>{props.num}</h2>
        </div>
    )
}