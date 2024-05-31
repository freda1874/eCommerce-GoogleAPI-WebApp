import { Button } from '@mui/material'
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user';
import axios from 'axios';

export default function Home() {
 const { logOutUser } = useContext(UserContext);
 const [store, setStore] = useState('');

 // logout
 const logOut = async () => {
   try {
     const loggedOut = await logOutUser();
 if (loggedOut) {
       window.location.reload(true);
     }
   } catch (error) {
     alert(error)
   }
 }

 function handleTextareaChange(e) {
  setStore(e.target.value);
}

function submitStore(e) {
  e.preventDefault();
  const parsedJson = JSON.parse(store);
  axios.post('http://localhost:4000/db/websites', parsedJson)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

 }

 return (
   <>
    <div>
      <text       
        style={{
              padding: 20, 
              fontWeight: 300,
              fontSize: "40px",
            }}> Shopful's Add Store</text>
    </div>
    <div>
      <textarea
              style={{
                marginTop: 50,
                marginLeft: 30,
              }}
        rows={20} 
        cols={35}
        placeholder={"Add Store"}
        value={store}
        onChange={handleTextareaChange}
      />
      <button onClick={submitStore}>Add Store</button>

    </div>
    <button        
        style={{
              padding: 10, 
              fontWeight: 300,
              fontSize: "20px",
              marginTop: 100,
              marginLeft: 30,
            }} onClick={logOut}>Log Out</button>
   </>
 )
}
