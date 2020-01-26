import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ButtonComponent from "./Button";
import { withRouter } from "react-router";
import { AppContext } from "../App";
import colors from "../constants/colors";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function Home({ history }) {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const handleClick = url => {
    dispatch({ type: "UPDATE_WORDS", data: colors });
    history.push(url);
  };

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <ButtonComponent
            name="Use default worlds"
            url="/default"
            onClick={handleClick}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ButtonComponent
            name="Add custom words"
            url="/custom"
            onClick={handleClick}
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Home);
