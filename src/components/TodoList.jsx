import axios from "axios";
import { useEffect, useState } from "react";
import { TODOS } from "../api/api";

const localStorageToken = localStorage.getItem("token");

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState({});

  useEffect(() => {
    getTodos();
  }, [token]);

  const getTodos = async () => {
    try {
      const response = await axios.get(TODOS, {
        headers: {
          // 如果 localStorageToken 存在且有值，就使用它；否則使用 token。
          Authorization: localStorageToken || token,
        },
      });
      setTodos(response.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const addTodo = async () => {
    // 如果 !todo 為 true，則執行 return 立即退出當前的函式，無需繼續執行後續的程式碼。
    if (!todo) return;
    try {
      const response = await axios.post(
        TODOS,
        {
          content: todo,
        },
        {
          headers: {
            Authorization: localStorageToken || token,
          },
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setTodo("");
      getTodos();
    } catch (error) {
      console.log({ error });
    }
  };

  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.content = todoEdit[id];

    await axios.put(
      `${TODOS}${id}`,
      { content: todo.content },
      {
        headers: {
          Authorization: localStorageToken || token,
        },
      }
    );
    getTodos();
    setTodoEdit({
      ...todoEdit,
      [id]: "",
    });
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${TODOS}${id}`, {
      headers: {
        Authorization: localStorageToken || token,
      },
    });
    getTodos();
  };

  const toggleTodoStatus = async (id) => {
    await axios.patch(
      `${TODOS}${id}/toggle`,
      {},
      {
        headers: {
          Authorization: localStorageToken || token,
        },
      }
    );
    getTodos();
  };

  return (
    <div className="sign-up-wrapper">
      <h3>Todo List</h3>
      <div>
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={addTodo}>add todo</button>
        <ul>
          {todos.map((todo, index) => (
            <li style={{ paddingBottom: "10px" }} key={index}>
              <div className="inputs-wrapper">
                {!todo.status ? "未完成" : "已完成"}
                {` ${todo.content} | `}
                <input
                  value={todoEdit[todo.id]}
                  placeholder="update value"
                  onChange={(e) => {
                    const newTodoEdit = {
                      ...todoEdit,
                    };
                    newTodoEdit[todo.id] = e.target.value;
                    setTodoEdit(newTodoEdit);
                  }}
                />
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => updateTodo(todo.id)}>Update</button>
                <button onClick={() => toggleTodoStatus(todo.id)}>
                  Toggle status
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
