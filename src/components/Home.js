import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ButtonComponent from "./Button";
import { withRouter } from "react-router";
import { AppContext } from "../App";
import colors from "../constants/colors";
import { NotificationContainer, NotificationManager } from "../notification";
import Button from "@material-ui/core/Button";

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

  const createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            30000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />

          <div style={{margin: "auto"}}>
            <Button variant="contained" color="default"
              className="btn btn-info"
              onClick={createNotification("info")}
            >
              Info
            </Button>
            <Button variant="contained" color="default"
              className="btn btn-success"
              onClick={createNotification("success")}
            >
              Success
            </Button>
            <Button variant="contained" color="primary"
              className="btn btn-warning"
              onClick={createNotification("warning")}
            >
              Warning
            </Button>
            <Button variant="contained" color="secondary"
              className="btn btn-danger"
              onClick={createNotification("error")}
            >
              Error
            </Button>

            <NotificationContainer />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Home);
