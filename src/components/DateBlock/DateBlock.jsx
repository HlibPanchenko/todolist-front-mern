import React from "react";
import Button from "@mui/material/Button";
import styles from "./DateBlock.module.scss";
const DateBlock = ({ handlePrevDay, handleNextDay, handleCurrentDay }) => {
  return (
    <div className={styles.dateButtonsblock}>
      <Button
        onClick={handlePrevDay}
        className={styles.btn}
        variant="contained"
        color="success"
      >
        previous day
      </Button>
      <Button
        onClick={handleCurrentDay}
        className={styles.btn}
        variant="contained"
        color="success"
      >
        today
      </Button>
      <Button
        onClick={handleNextDay}
        className={styles.btn}
        variant="contained"
        color="success"
      >
        next day
      </Button>
    </div>
  );
};

export default DateBlock;
