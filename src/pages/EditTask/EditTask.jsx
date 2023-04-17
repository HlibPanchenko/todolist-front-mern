import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./EditTask.module.scss";
import axios from "axios";

const EditTask = () => {
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // достаем id из строки запроса чтобы понять какую задачу мы редактируем
  const { id } = useParams();
  console.log(id);

  // достанем информацию о этой задаче из бд по id
  // заполним поля формы информацией о задаче
  React.useEffect(() => {
    // по id который витащили с параметров, длеаем запрос на сервер, и достаем остальные данные
    // то есть когда будем переходить на страницу редактирования, форма будет заполнена актуальными даными
    if (id) {
      axios
        .get(`http://localhost:7777/get-one-task/${id}`)
        .then((res) => {
          setTitle(res.data.oneTask.title);
          setText(res.data.oneTask.text);
        })
        .catch((error) => {
          console.warn(error);
          alert("Ошибка при получении задачи");
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      // fields - содержимое статьи
      const fields = { title, text };
      await axios.patch(`http://localhost:7777/edit-task/${id}`, fields);
      // перекидываем пользователя на страницу статьи
      navigate(`/`);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при изменении задачи");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.allPosts}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Edit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
