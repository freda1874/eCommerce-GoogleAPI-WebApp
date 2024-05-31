import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user";
import Home from "./pages/home";
import Login from "./pages/login";
import PrivateRoute from "./pages/privateRoute";

 
function App() {
 return (
   <BrowserRouter>
     <UserProvider>
       <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;



