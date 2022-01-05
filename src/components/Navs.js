import React from 'react'
import { useLocation } from 'react-router'
import { NavList,LinkStyled } from './Navs.styled'


const LINKS = [
  {to:'/',text : 'Home'},
  {to:'/starred',text:'Starred'},
  
]
const Navs = () => {
  const location = useLocation();

  return (
    <div>
       <NavList>
        {
          LINKS.map(function(elements){
            return (<li key ={elements.to}>
              <LinkStyled to = {elements.to} className = {elements.to === location.pathname ? 'active':''}>{elements.text}</LinkStyled>
              </li>)
          })
        }
       </NavList>
    </div>
  )
}

export default Navs
