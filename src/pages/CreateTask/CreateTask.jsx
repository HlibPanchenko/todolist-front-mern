import React from "react";
import styles from "./createTask.module.scss";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const CreateTask = () => {
  const navigate = useNavigate();
  console.log("CreateTask перерисовался");

  //   const [dataInput, setDataInput] = React.useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, e) => {
    try {
      // titel and text from input
      // console.log(data);

      const taskObj = {
        text: data.taskText,
        title: data.tasktitle,
      };
      // setDataInput(data);
      axios.post("http://localhost:7777/add-task", taskObj);
      e.preventDefault();
      navigate(`/`);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создании задачи");
    }
  };

  //   console.log(watch("tasktitle")); // наблюдать за каким-то плем в live режиме

  //   React.useEffect(() => {
  // 	try {
  // 	axios.post('http://localhost:7777/add-task', dataInput)

  // 	} catch (error) {
  // 		console.warn(error);
  //       alert("Ошибка при создании задачи");
  // 	}
  // }, [dataInput]);

  // const [taskTitle, setTaskTitle] = React.useState('');
  // const [taskText, setTaskText] = React.useState('');

  // const handleChange = (event) => {
  // 	setTaskTitle(event.target.value);
  //  }

  // const handleChangeTextArea = (event) => {
  // 	setTaskText(event.target.value);
  //  }

  // const handleSubmit = (event) => {
  // 	// setTaskText(event.target.value);
  //  }

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.allPosts}>
          {/* <form onSubmit={handleSubmit}>
        <label>
          Name of task:
          <input type="text" value={taskTitle} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
		  <label>
          Your task:
          <textarea value={taskText} onChange={handleChangeTextArea} />
        </label>
      </form> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input
              defaultValue=""
              {...register("tasktitle", { required: true })}
            />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("taskText", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
