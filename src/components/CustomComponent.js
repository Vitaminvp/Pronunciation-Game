import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router";
import ButtonComponent from "./Button";
import { isZeroLength, randomColor } from "../utils/";
import { AppContext } from "../App";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 320
    }
  }
}));

const placeHolder = "Paste here your words";

function CustomComponent({ history }) {
  const classes = useStyles();
  const [words, setWords] = React.useState(placeHolder);
  const { dispatch } = useContext(AppContext);
  const handleChange = event => {
    setWords(event.target.value);
  };
  const handleFocus = ({ target: { value } }) => {
    if (value === placeHolder) setWords("");
  };
  const handleBlur = () => isZeroLength(words) && setWords(placeHolder);
  const handleSubmit = () => {
    if (isZeroLength(words) || words === placeHolder) return;
    const allWords = words
      .toLowerCase()
      .replace(/(?:[^\w]|_)+/gi, " ")
      .split(/\s+/)
      .filter(Boolean)
      .reduce((acc, cur) => {
        return { ...acc, [cur]: randomColor() };
      }, {});
    dispatch({ type: "UPDATE_WORDS", data: allWords });
    history.push("/default");
  };
  const handleClick = url => history.push(url);
  return (
    <Fragment>
      <ButtonComponent name="Home" url="/" onClick={handleClick} />
      <br />
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Custom words"
            multiline
            rows="6"
            value={words}
            variant="outlined"
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <br />
        <ButtonComponent name="Start" onClick={handleSubmit} />
      </form>
    </Fragment>
  );
}

export default withRouter(CustomComponent);
