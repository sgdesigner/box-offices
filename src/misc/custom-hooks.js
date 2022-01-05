import { useReducer,useEffect,useState } from "react";


function showsReducer(prevState,action){

  switch(action.type)
  {
    case 'ADD' :{
      console.log("state changed here");
      return  [...prevState,action.showId]

    }

    case 'REMOVE' : {
      console.log("state changed here");
      return prevState.filter( (showId)=> showId!==action.showId );
    } 

    default : return prevState
  }

}

function usePersistedReducer(reducer,initialState,key){
  console.log("rendered");
  const [state,dispatch] = useReducer(reducer,initialState,(initial)=>{
   
    console.log("this is inital");
   console.log(initial);
     const persisted = localStorage.getItem(key);

      return persisted ? JSON.parse(persisted):initial
   
  });  //what this function return is set as initialState 

   useEffect(()=>{
      console.log("useEffectrrr called");
    localStorage.setItem(key,JSON.stringify(state))
   },[state,key])

   return [state,dispatch];
}


export function useShows(key='shows'){
  console.log("use shows called ");
  return usePersistedReducer(showsReducer,[],key);
}


export function useLastQuery(key = 'lastQuery'){
  const [input,setInput] = useState(()=>{
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted):"";
  });

  const setPersistedInput = (newState)=>{
    setInput(newState);
    sessionStorage.setItem(key,JSON.stringify(newState));
  }

    return [input,setPersistedInput]
}