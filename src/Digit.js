import { ACTIONS } from './App'

import React from 'react'

export const Digit = ({dispatch,digit}) => {
  return (
    <button onClick={() => {dispatch({type:ACTIONS.digits , payload:{digit}})}}>{digit}</button>
  )
}
