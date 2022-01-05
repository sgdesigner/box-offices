import React from 'react'
import ShowCard from './ShowCard'
import notFound from '../../images/not-found.png';
import { FlexGrid } from '../styled';
import {useShows} from '../../misc/custom-hooks'

const ShowGrid = ({data}) => {
  
  const [starredShows,dispatchStarred] = useShows() ;
  console.log('show grid called');
  return (
    
    <FlexGrid>
       {
         
         data.map((item)=>{
           
          const isStarred = starredShows.includes(item.show.id);

           const onStarClick = ()=>
           {
             if(isStarred){
               dispatchStarred({type :'REMOVE',showId : item.show.id});
             }
             else{
               dispatchStarred({type:'ADD',showId : item.show.id});
             }           
           }
          return (
                <ShowCard 
                  key = {item.show.id} 
                  id={item.show.id} 
                  name = {item.show.name} 
                  image = {item.show.image?item.show.image.medium : notFound}
                  summary = {item.show.summary}
                  isStarred = {isStarred}
                  onStarClick = {onStarClick}
                />
               )   
         })
       }
    </FlexGrid>
  )
}

export default ShowGrid
