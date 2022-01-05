import React, { useState,useEffect } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { useShows } from '../misc/custom-hooks';
import {apiGet} from '../misc/config'
import ShowGrid from '../components/show/ShowGrid';
const Starred = () => {

  const [starred] = useShows();
  const [shows,setShows] = useState(null);
  const[isLoading,setIsLoading] = useState(true);
  const[error,setError] = useState(null);

   //to fetch the data when the component mounts we use useEffect hooks
   useEffect(()=>{
       
 if(starred && starred.length>0){
   const promises = starred.map((showId)=>{
     return apiGet(`/shows/${showId}`)
   })

   Promise.all(promises).then(apidata=>{
     console.log('apidata',apidata);
    return apidata.map((show)=>{
      return {show};
    })
   }).then(results =>{
     console.log('results',results);
     setShows(results);
     setIsLoading(false);

   }).catch((error)=>{
      setError(error.message);
      setIsLoading(false);
   });
 }else{
   setIsLoading(false)
 }
   },[starred])
  return (
    <div>
     <MainPageLayout> 
       {isLoading && <div>Data is Loading</div>}
      {error && <div>Error Occured</div>}
      {!isLoading && !shows && <div>No Starred Shows</div>}
      {!isLoading && !error && shows && <ShowGrid data ={shows}/>}
       </MainPageLayout>
    </div>
  )
}

export default Starred
