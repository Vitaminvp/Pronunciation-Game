import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";
import { isDark } from "../utils";
import { AppContext } from "../App";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: "2px"
    }
  },
  got: {
    textDecoration: "line-through",
    animation: "jump 0.2s ease-in-out 2 alternate-reverse",
    opacity: ".1"
  },
  chip: ({ word, words }) => ({
    backgroundColor: words[word],
    color: isDark(word, words) ? "#f0e9e99c" : "#353131",
    fontWeight: "500",
    boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.75)"
  })
});

export default function Word({ word, pronounced }) {
  const [said, setSaid] = useState(false);
  const {
    state: { allWords }
  } = useContext(AppContext);

  useEffect(() => {
    if (word === pronounced) setSaid(true);
  }, [word, pronounced]);

  const classes = useStyles({ word, words: allWords });
  const chipClasses = classNames(classes.chip, { [classes.got]: said });

  return (
    <div className={classes.root}>
      <Chip label={word} className={chipClasses} />
    </div>
  );
}
