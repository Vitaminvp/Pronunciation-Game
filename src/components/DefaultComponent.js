import React, { Fragment, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Word from "./Word";
import ButtonComponent from "./Button";
import { AppContext } from "../App";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

function DefaultComponent({ history }) {
  const {
    state: { allWords },
    dispatch
  } = useContext(AppContext);

  const [pronounced, setPronounced] = useState("");

  useEffect(() => {
    const recognition = new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = handleResult;
    recognition.start();
    return () => {
      recognition.stop();
    };
  });

  function handleResult({ results }) {
    const words = results[results.length - 1][0].transcript;
    let result = words.toLowerCase();
    result = result.replace(/\s/g, "");
    if (result in allWords) {
      dispatch({ type: "UPDATE_BG", data: allWords[result] });
      return setPronounced(result);
    }
  }
  const classes = useStyles();
  const handleClick = url => history.push(url);

  return (
    <Fragment>
      <ButtonComponent name="Home" url="/" onClick={handleClick} />
      <br />
      <div className={classes.wrapper}>
        {Object.keys(allWords).map(key => (
          <Word word={key} pronounced={pronounced} key={key} />
        ))}
      </div>
    </Fragment>
  );
}

export default withRouter(DefaultComponent);
