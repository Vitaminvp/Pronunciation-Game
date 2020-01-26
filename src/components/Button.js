import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    whiteSpace: "nowrap"
  }
});

function ButtonComponent({ name, url, onClick }) {
  const classes = useStyles();
  const handleClick = () => onClick(url);
  return (
    <Button className={classes.root} onClick={handleClick}>
      {name}
    </Button>
  );
}

ButtonComponent.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  url: PropTypes.string,
  history: PropTypes.object
};

ButtonComponent.defaultProps = {
  classes: {},
  name: "button",
  url: "",
  history: {}
};

export default withRouter(ButtonComponent);
