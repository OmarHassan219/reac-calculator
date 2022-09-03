import './style.css'
import './App.css';
import {useReducer} from 'react'
import { Digit } from './Digit';
import { Operand } from './Operand';
 

export const ACTIONS = {
operation:'operation',
clear:'clear',
evaluate : 'equal',
delete:'del',
digits:'digit'


}


const reducer = (state ,{type ,payload}) => {

switch(type){
  case ACTIONS.digits:
    if(state.current === "0" && payload.digit === "0" ) {return state}
    if(state.current == null && payload.digit === "." ) {return state}
    if(payload.digit === "." && state.current.includes(".") ) return state
    // if(state.current && state.previous == null) return {...state,current: null}
  return{...state, current:`${state.current || ""}${payload.digit}`}
    ///////////////////////
    case ACTIONS.operation:
      if(state.previous == null && state.current){
        return {...state, previous : state.current , operation:payload.operand , current: null }
      }
      if(state.current == null && state.previous){
         return {...state, previous : state.previous , operation:payload.operand , current: null }
      }
      return{...state, previous : evaluat(state), current:null , operation:payload.operand }
       /////////////////////////
      case ACTIONS.clear:
        return{}
      ///////////////////////
      case ACTIONS.evaluate:
        if(state.current && state.previous){
        return {...state, previous: null , current:evaluat(state) ,operation:null  }
        }

        case ACTIONS.delete:
          if(state.current){
return {...state , current: deleto(state)}

          }
    
default: return state

    } 


}
function deleto ({current}){
let currentcopy = current.split("")
currentcopy.pop()
let newww = currentcopy.join("")

return newww
}







function evaluat ({current , previous , operation}) {
const prev = parseFloat(previous)
const curr = parseFloat(current)
if(isNaN(prev) || isNaN(current)) return ""
switch(operation){
case '/':
  return (prev / curr).toString()

case 'x':
  return (prev * curr).toString()
case '+':

  return (prev + curr).toString()
  

case '-':
  return (prev - curr).toString()


default:return previous
}
}

function App() {
const [{current , previous , operation}, dispatch] = useReducer(reducer , {})
  




  return (
    <div className="calculator-grid">
      <div className="output">
        <div className='previous'>{previous}{operation}</div>
        <div className='current'>{current}</div>
      </div>
      
<button className='span-two' onClick={() => {dispatch ({type : ACTIONS.clear})}}  >AC</button>
<button onClick={()=> {dispatch({type:ACTIONS.delete}) }}>DEL</button>
<Operand operand='/' dispatch={dispatch} />
<Digit digit ='1' dispatch={dispatch}/> 
<Digit digit ='2' dispatch={dispatch}/> 
<Digit digit ='3' dispatch={dispatch}/> 
<Operand operand='x' dispatch={dispatch} />

<Digit digit ='4' dispatch={dispatch}/> 
<Digit digit ='5' dispatch={dispatch}/> 
<Digit digit ='6' dispatch={dispatch}/> 
<Operand operand='+' dispatch={dispatch} />

<Digit digit ='7' dispatch={dispatch}/> 
<Digit digit ='8' dispatch={dispatch}/> 
<Digit digit ='9' dispatch={dispatch}/> 
<Operand operand='-' dispatch={dispatch} />

<Digit digit ='.' dispatch={dispatch}/> 
<Digit digit ='0' dispatch={dispatch}/> 

<button  className='span-two' onClick={()=> {dispatch({type:ACTIONS.evaluate}) }}>=</button>

    </div>
  );
}

export default App;
