import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import App from './App.jsx';
import SideNav from './components/SideNav/sideNav';
import './index.css';
import ProjectList from './components/ProjectsList/projectsList.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SideNav />
      <ProjectList />
      <LoginForm />
    </ApolloProvider>
  </React.StrictMode>,
)
