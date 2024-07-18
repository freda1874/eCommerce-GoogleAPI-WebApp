import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/mongoApp";

const app = new App(APP_ID);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    try {
      const authenticatedUser = await app.logIn(credentials);
      console.log("Authenticated User:", authenticatedUser);
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error) {
      throw error;
    }
  };

  
  const emailPasswordSignup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      return await emailPasswordLogin(email, password); 
    } catch (error) {
      throw error;
    }
  };

  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      setUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      throw error;
    }
  };

  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      setUser(null); 
      return true;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email, oldPassword, newPassword) => {
    if (!app.currentUser) throw new Error("User is not logged in");
    try {
      await app.currentUser.changePassword(oldPassword, newPassword);
      return true;
    } catch (error) {
      throw error;
    }
  };
  

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser, resetPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};
