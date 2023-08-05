import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import Auth from './components/Auth';
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Tournaments from "./pages/Tournaments/Tournaments";
import Payment from "./pages/Payment/Payment";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./pages/Contact/Contact";
import { HelmetProvider } from 'react-helmet-async'
// import 'bootstrap/dist/css/bootstrap.min.css';

// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';


const httpLink = createHttpLink({
  uri: "/graphql",
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
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <Provider store={store}>
          <Auth>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/register/:tournamentId/:ageDivisionId" element={<Register />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
            </Router>
          </Auth>
        </Provider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
