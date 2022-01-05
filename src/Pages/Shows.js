import React,{useReducer,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
function Shows() {
  
  const params = useParams(); //this oarams will contain the id of the params 
  const {id} = params;
 

  const reducer = (prevState, action)=>{
     
    switch(action.type)
    {
      
      case 'FETCH_SUCCESS' : {
        return {...prevState,isLoading:false,error:null,show:action.show}
      }

      case 'FETCH_FAILED' : {
        return {...prevState,isLoading:false,error:action.error}
      }

      default : return prevState;
    }
  }

  const initialState = {
    show:null,
    isLoading : true,
    error : null
  }

  const [state,dispatch] = useReducer(reducer,initialState);

   console.log("this is state");
   console.log(state);

    const {show,isLoading,error} =state;

  // const [show,setShow] = useState(null);
  // const [isLoading,setIsLoading] = useState(true);
  // const [error,setError] = useState(null);

  //  console.log("show rerendered");

  useEffect(()=>{
  
  console.log("useEffectrun");
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then((result)=>{

     

      if(isMounted){
      
        setTimeout(()=>{
          dispatch({type:'FETCH_SUCCESS',show:result})
        },2000);
          
      }
      
    }).catch((err)=>{
      if(isMounted)
      {
        dispatch({type:'FETCH_FAILED',error:err.message})
      }

    })

    return ()=>{
        isMounted = false;
    }
  },[id]);

  
   if(isLoading)
   {
    console.log("isLoading rerendered")
    return <div>Data is being loaded</div>
   }

    if(error)
    { 
     console.log("Error in data loading rendered");
     return <div>Error in data loading</div>
    }

    return (
      
     <ShowPageWrapper>
      <ShowMainData image = {show.image} name = {show.name} 
        rating = {show.rating} 
        summary = {show.summary} 
         tags = {show.genres}  
        />

      <InfoBlock>
        <h2>Details</h2>
        <Details  
          status = {show.status} 
           network = {show.network}
           premiered = {show.premiered}
          />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons = {show._embedded.seasons}/>
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast = {show._embedded.cast} />
      </InfoBlock>

     </ShowPageWrapper>
    )
}

export default Shows
