import React,{useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';


const Home = () => {

 

  const [input,setInput] = useLastQuery();
  const [results,setResults] = useState(null);
  const [searchOption,setSearchOption] = useState('shows');




  function onInputChange(event){
     
     
     setInput(event.target.value);
   
  }

  function onSearch()
  {
    // console.log(searchOption);
    // console.log(input);
    apiGet(`/search/${searchOption}?q=${input}`).then((response)=>{
     
       
      setResults(response);
    })

   
   
  }
  
  function onKeyDown(event){
     if(event.keyCode===13)
      onSearch();
  }

  function renderResults(){
     
       if(results && results.length===0)
         return <div>No Results</div>
       else
       if(results && results.length>0)
        {
          
          return ( 
             <div>
               {
                results[0].show?<ShowGrid data = {results} /> :<ActorGrid  data  = {results}/>

              }
             </div>
          )
        }

        return null;

  }

  function onRadioChange(event){
     
  //  console.log(event.target.value);
    setSearchOption(event.target.value);

   
  }

  const isShowSearch = searchOption==='shows';

  return (
    
    <div>
  
      <MainPageLayout>
      <SearchInput type = "text"
       onKeyDown = {onKeyDown} 
       onChange = {(event)=>onInputChange(event)}
        value = {input}
        placeholder = "Search for something" 
     />

     <RadioInputsWrapper>
       <CustomRadio
         label = "Shows"
         id = "shows-search" 
         value = "shows" 
         onChange = {onRadioChange}
         checked = {isShowSearch}
       
       />
      
      <div>
      <CustomRadio
         label = "Actors"
         id="actors-search" 
         value = "people" 
         onChange = {onRadioChange}
         checked = {!isShowSearch}
       
       />
      </div>
       

     </RadioInputsWrapper>

    <SearchButtonWrapper>
      <button type="button" onClick = {onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
      {renderResults()}
      </MainPageLayout> 
    </div>
  )
}

export default Home
