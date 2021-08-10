import React, { useState, useEffect } from "react";
import "./App.scss";
import Pagination from "./components/Pagination/index.jsx";
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
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?limit=${filters._limit}&_page=${filters._page}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("New page: ", newPage);
    setFilter({
      ...filters,
      _page: newPage,
    });
  }

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
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
