import React from 'react'
import styles from "./TaskInCalendar.module.scss";

const TaskInCalendar = ({text, title, _id, date}) => {
  return (
	 <div className={styles.taskCard}>
		<div className={styles.content}>
        <h3 className={styles.taskTitle}> {title} </h3>
        <div className={styles.bodyTask}>{text}</div>
      </div>
	 </div>
  )
}

export default TaskInCalendar