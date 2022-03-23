import React, { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import TodoReducer from "./TodoReducer";
import { initialState } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "add", payload: todo });
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = state.active,
      complete = state.complete;
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
      dispatch({
        type: "active",
        payload: active,
      });
    } else {
      complete.splice(destination.index, 0, add);
      dispatch({
        type: "complete",
        payload: complete,
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasking</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          activeTodos={state.active}
          completedTodos={state.complete}
          dispatch={dispatch}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
