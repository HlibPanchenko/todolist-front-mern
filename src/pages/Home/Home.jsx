import React from "react";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./home.module.scss";
import axios from "axios";
import DateBlock from "../../components/DateBlock/DateBlock";
import { getTodayDate, currentDate } from "../../utils/getDate";

const Home = () => {
  const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [fullDate, setFullDate] = React.useState(getTodayDate());
  // const [date, setDate] = React.useState({});

  // проверка есть ли задача в какой-то день, если нету - то покажем пользователю что нету задач
  const [isThereTask, setIsThereTask] = React.useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    const getDateAsync = async () => {
      const todayIs = await getTodayDate();
      setFullDate(todayIs);
    };
    console.log("только при первом рендере");
    getDateAsync();
  }, []);

  console.log(fullDate);

  console.log("Home перерисовался");
  React.useEffect(() => {
    (async () => {
      try {
        const { date, month, year } = fullDate;
        const { data } = await axios.get(
          `http://localhost:7777/get-all-tasks?page=${page}&limit=5&day=${date}&month=${month}&year=${year}`
        );
        console.log(data);
        if (data.length > 0) {
          setIsThereTask(true);
        } else {
          setIsThereTask(false);
        }

        // const { data } = await axios.get("http://localhost:7777/get-all-tasks");
        console.log("только при первом рендере 2");

        setTasks(data);
      } catch (error) {
        console.warn(error.message);
      }
    })();
  }, [page, fullDate]);

  // console.log(tasks);

  const handleCurrentDay = () => {
    setFullDate(getTodayDate());
  };

  const handlePrevDay = () => {
    // const prevDayObj = currentDate(-1);
    // setFullDate((prev) => ({ ...prevDayObj }));
    // setFullDate((prev) => ({ ...prev, date: prev.date - 1 }));
    let today = fullDate;
    console.log(today);
    const formattedDate = `${today.year}-${today.month
      .toString()
      .padStart(2, "0")}-${today.date.toString().padStart(2, "0")}`;
    // let formattedDate = today.toISOString().slice(0, 10); // gives format y-m-d
    let oneDayAgo = new Date(formattedDate);
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    let formattedDayAgo = oneDayAgo.toISOString().slice(0, 10); // gives format y-m-d
    const [year, month, date] = formattedDayAgo.split("-").map(Number);
    const objDayAgo = { date, month, year }; // gives format { date: 30, month: 3, year: 2023 }
    // return objDayAgo;
    setFullDate((prev) => ({ ...objDayAgo }));
  };
  const handleNextDay = () => {
    // setFullDate((prev) => ({ ...prev, date: prev.date + 1 }));
    let today = fullDate;
    console.log(today);
    const formattedDate = `${today.year}-${today.month
      .toString()
      .padStart(2, "0")}-${today.date.toString().padStart(2, "0")}`;
    // let formattedDate = today.toISOString().slice(0, 10); // gives format y-m-d
    let oneDayAfter = new Date(formattedDate);
    oneDayAfter.setDate(oneDayAfter.getDate() + 1);
    let formattedDayAgo = oneDayAfter.toISOString().slice(0, 10); // gives format y-m-d
    const [year, month, date] = formattedDayAgo.split("-").map(Number);
    const objDayAgo = { date, month, year }; // gives format { date: 30, month: 3, year: 2023 }
    // return objDayAgo;
    setFullDate((prev) => ({ ...objDayAgo }));
  };

  const handleDeleteTask = async (id) => {
    console.log("delete");
    try {
      const { data } = await axios.delete(
        `http://localhost:7777/delete-task/${id}`
      );
      console.log(data);

      setTasks((prev) =>
        prev.filter((obj) => obj._id !== data.deletedTask._id)
      );
      console.log(tasks);
    } catch (error) {
      console.warn(error.message);
    }
  };
  const handleEditTask = async (id) => {
    // console.log("edit");
    // try {
    //   const { data } = await axios.delete(
    //     `http://localhost:7777/delete-task/${id}`
    //   );
    //   console.log(data);
    //   setTasks((prev) =>
    //     prev.filter((obj) => obj._id !== data.deletedTask._id)
    //   );
    //   console.log(tasks);
    // } catch (error) {
    //   console.warn(error.message);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <DateBlock
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          handleCurrentDay={handleCurrentDay}
        />
        <div className={styles.allPosts}>
          {/* {[...Array(20)].map((task) => ( */}
          {!isThereTask
            ? "на эту дату у вас нету дел"
            : tasks.map((task) => (
                <TaskCard
                  {...task}
                  key={task._id}
                  handleDeleteTask={() => handleDeleteTask(task._id)}
                  handleEditTask={handleEditTask}
                />
              ))}
        </div>
        <div className={styles.paginationBlock}>
          <Pagination
            color="primary"
            count={10}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
