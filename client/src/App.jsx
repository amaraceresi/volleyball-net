import React, {createContext, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import Auth from './components/Auth'
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Tournaments from "./pages/Tournaments/Tournaments";
import Register from "./pages/Register/Register"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { HelmetProvider } from 'react-helmet-async'

// export const AppContext = createContext()

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [test, setTest] = useState()
  
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        {/* <AppContext.Provider value={{test, setTest}}> */}
        <Provider store={store}>
          <Auth>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/register/:tournamentId/:agedDivisionId" element={<Register />} />
              </Routes>
            </Router>
          </Auth>
        </Provider>
        {/* </AppContext.Provider> */}
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
