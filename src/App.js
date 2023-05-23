import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editButonunaBasildiMi, setEditButonunaBasildiMi] = useState();
  const [guncellenecekText, setGuncellenecekText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("please type");
      return;
    }
    console.log(todoText);
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false,
    };

    console.log(newTodo);
    setTodos([...todos, newTodo]);
    setTodoText("");
  };
  const deleteTodo = (id) => {
    const filtereTodos = todos.filter((i) => i.id !== id);
    setTodos(filtereTodos);
  };
  const changeHasDone = (todo) => {
    console.log(todo);
    let tempTodos = [];
    todos.map((item) => {
      if (item.id === todo.id) {
        let updatedTodo = {
          ...todo,
          hasDone: !todo.hasDone,
        };
        tempTodos.push(updatedTodo);
      } else {
        tempTodos.push(item);
      }
    });
    // let tempTodos=[]
    // for(let i=0; i < todos.length; i++){
    //   if(todos[i].id === todo.id){
    //     let updateTodo={
    //       ...todo,
    //       hasDone: !todo.hasDone
    //     }
    //     tempTodos.push(updateTodo)
    //   }else{
    //     tempTodos.push(todos[i])
    //   }
    // }

    setTodos(tempTodos);
  };
  const todoGuncelle = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Type  your todo"
          />

          <button className="btn btn-primary" type="button">
            ADD
          </button>
        </div>
      </form>
      {editButonunaBasildiMi === true && (
        <form onSubmit={todoGuncelle}>
          <div className="input-group mb-3">
            <input
              value={guncellenecekText}
              onChange={(event) => setGuncellenecekText(event.target.value)}
              className="form-control"
              type={"text"}
            />
            <button
              onClick={() => {
                setEditButonunaBasildiMi(false);
              }}
              className="btn btn-danger w-25"
              type="submit"
            >
              Cancel
            </button>
            <button className="btn btn-info w-25" type="submit">
              Save
            </button>
          </div>
        </form>
      )}

      <div className="container">
        {todos.length === 0 ? (
          <p>You don't have any todos yet</p>
        ) : (
          <>
            {todos.map((item, index) => (
              <div
                key={index}
                style={{ borderBottom: "1px solid gray" }}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h1
                    style={{
                      textDecoration:
                        item.hasDone === true ? "line-through" : "none",
                    }}
                  >
                    {item.title}{" "}
                  </h1>
                  <small>{new Date(item.date).toLocaleDateString()}</small>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteTodo(item.id);
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditButonunaBasildiMi(true);
                      setGuncellenecekText(item.title);
                    }}
                    className="btn btn-sm btn-secondary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => changeHasDone(item.id)}
                    className="btn btn-sm btn-success"
                  >
                    {item.hasDone === false ? "Done" : "Undone"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
