import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

// Components

import Header from "./components/Header";
import Backdrop from "./components/Backdrop";

// Pages
import Navbar from "./pages/Navbar/SideMenu";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";
//import Categories from "./pages/Categories/CategoryScreen";
import Employees from "./pages/Employees/Employees";
import Products from "./pages/Products/Products";
import ProductScreen from "./pages/Products/ProductScreen";
import Form from "./pages/Categories/Form/Form";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526"
    },
    background: {
      default: "#f4f5fd"
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '220px',
    width: '100%'
  }
})


function App() {
  const classes = useStyles();

  return (
    <>
    <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <main className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/categories" component={Categories} />          
          <Route exact path="/categories/:id" component={Form} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/employee" component={Employees} />
        </Switch>
      </main>
    </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
