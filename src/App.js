import React, { useState, useEffect } from "react";
import "./App.scss";
import PostList from "./components/PostList/index.jsx";

import TodoForm from "./components/TodoForm/index.jsx";
import TodoList from "./components/TodoList/index.jsx";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "i love Trinh haha!" },
    { id: 2, title: "i love Chin haha!" },
    { id: 3, title: "i love Ching haha!" },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl =
          "http://js-post-api.herokuapp.com/api/posts?limit=10&_page=1";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPostList();
  }, []);

  useEffect(() => {
    console.log("TODO list effect");
  });

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);

    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log("Form submit: ", formValues);
    const length = todoList.length;
    const newTodo = {
      id: length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React Hooks - To do list</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      <PostList posts={postList} />
    </div>
  );
}

export default App;
