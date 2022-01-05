import React from 'react'
import Navs from './Navs'
import Title from './Title'
const MainPageLayout = (props) => {
  console.log("main page layout rendered")
  return (
    <div>
       <div>
      <Title title = "Box Office" 
      subtitle = "Are you looking for a movie or an actor?">
      </Title>   
    <Navs></Navs>
     {props.children}
   </div>
    </div>
  )
}

export default MainPageLayout
