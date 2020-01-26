import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./components/Home";
import CustomComponent from "./components/CustomComponent";
import DefaultComponent from "./components/DefaultComponent";
import { isDefined } from "./utils";
import colors from "./constants/colors";

const useStyles = makeStyles({
  app: {
    textAlign: "center",
    background: ({bgColor}) => bgColor,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)"
  },
  link: {
    position: "absolute",
    bottom: 20,
    fontFamily: "fantasy",
    textDecoration: "none",
    color: "#FE6B8B",
    fontSize: 12
  }
});

export const AppContext = React.createContext(null);

const initialState = {
  allWords: colors
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_WORDS":
      return {
        allWords: action.data
      };

    default:
      return initialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bgColor, setBgColor] = useState("linear-gradient(45deg, #1e1e1e 30%, #282c34 90%)");
  const classes = useStyles({bgColor});

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!isDefined(window.SpeechRecognition))
    return (
      <div className={classes.app}>
        <h2>Your browser doesn't support speech recognition</h2>
      </div>
    );

  return (
    <div className={classes.app}>
      <Router>
        <AppContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/custom">
              <CustomComponent />
            </Route>
            <Route path="/default">
              <DefaultComponent setBg={setBgColor} />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </AppContext.Provider>
        <Link className={classes.link} to="https://beginnerjavascript.com/">
          Inspired by Wes Bos
        </Link>
      </Router>
    </div>
  );
}

export default App;
