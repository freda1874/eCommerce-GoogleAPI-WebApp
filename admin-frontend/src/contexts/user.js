import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/mongoApp";
 

const app = new App(APP_ID);
 

export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 
 // login using email & password
 const emailPasswordLogin = async (email, password) => {
   const credentials = Credentials.emailPassword(email, password);
   const authenticatedUser = await app.logIn(credentials);
   setUser(authenticatedUser);
   return authenticatedUser;
 };
 

 
 // if already logged in
 const fetchUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.refreshCustomData();

     setUser(app.currentUser);
     return app.currentUser;
   } catch (error) {
     throw error;
   }
 }
 
 // logout 
 const logOutUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.logOut();
     // Setting user to null once loggedOut.
     setUser(null);
     return true;
   } catch (error) {
     throw error
   }
 }
 
 return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, logOutUser }}>
   {children}
 </UserContext.Provider>;
}