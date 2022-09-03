import { ACTIONS } from "./App";

import React from 'react'

export const Operand = ({dispatch , operand}) => {
  return (
    
<button onClick={() => { dispatch ({type:ACTIONS.operation , payload:{operand} })}}>{operand}</button>

  )
}
