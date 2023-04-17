import React from "react";
import { Link } from "react-router-dom";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import styles from "./taskCard.module.scss";
import axios from "axios";

const TaskCard = ({ text, title, _id, handleDeleteTask, handleEditTask }) => {
  return (
    <div className={styles.taskItem}>
      <div className={styles.content}>
        <h3 className={styles.taskTitle}> {title} </h3>
        <div className={styles.bodyTask}>{text}</div>
      </div>
      <AiFillDelete className={styles.icon} onClick={handleDeleteTask} />
      <Link to={`/editTask/${_id}`}>
        <AiFillEdit className={styles.iconEdit} onClick={handleEditTask} />
      </Link>
    </div>
  );
};

export default TaskCard;
