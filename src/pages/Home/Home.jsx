import React from "react";
import Pagination from "@mui/material/Pagination";
import Typography from '@mui/material/Typography';
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./home.module.scss";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  
  const handleChange = (event, value) => {
    setPage(value);
  };

  console.log("Home перерисовался");
  React.useEffect(() => {
    (async () => {
      try {
      
        const { data } = await axios.get(`http://localhost:7777/get-all-tasks?page=${page}&limit=5`);
        // const { data } = await axios.get("http://localhost:7777/get-all-tasks");
        setTasks(data);
      } catch (error) {
        console.warn(error.message);
      }
    })();
  }, [page]);

  console.log(tasks);

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
        <div className={styles.allPosts}>
          {/* {[...Array(20)].map((task) => ( */}
          {tasks.map((task) => (
            <TaskCard
              {...task}
              key={task._id}
              handleDeleteTask={() => handleDeleteTask(task._id)}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>
        <div className={styles.paginationBlock}>
          <Typography>Page: {page}</Typography>
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
