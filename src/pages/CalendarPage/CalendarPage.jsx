import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import styles from "./CalendarPage.module.scss";
import "./CalendarPage.scss";
import { getTodayDate, currentDate } from "../../utils/getDate";
import axios from "axios";

import { TextField } from "@mui/material";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import TaskInCalendar from "../../components/TaskInCalendar/TaskInCalendar";

const CalendarPage = () => {
  // const [value, setValue] = React.useState(getTodayDate());
  const [value, setValue] = React.useState(new Date());
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const getAllTasksForSpecificDay = async () => {
      // console.log(String(value));
      const date = new Date(value);
      const day = date.getDate();
      const month = date.getMonth() + 1; // add 1 to adjust for 0-based month index
      const year = date.getFullYear();
      // const dateObject = { day, month, year };

      // const fullDate = value;
      // const { date, month, year } = fullDate;
      const { data } = await axios.get(
        `http://localhost:7777/get-all-tasks?page=1&limit=5000&day=${day}&month=${month}&year=${year}`
      );
      setTasks(data);
    };
    getAllTasksForSpecificDay();
  }, [value]);

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.flexBox}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              // orientation='portrait'
              orientation="landscape"
              openTo="day"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div className={styles.calendarEvents}>
            {tasks.length > 0
              ? tasks.map((task) => <TaskInCalendar key={task._id} {...task}/>)
              : "На этот день нету запланированных задач"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
