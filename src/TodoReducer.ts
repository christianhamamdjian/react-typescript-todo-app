import { Actions, initialState } from "./model";

const TodoReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "done":
      const newActiveAdd = state.active.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isDone: !todo.isDone }
          : todo;
      });
      return {
        active: [...newActiveAdd],
        complete: [...state.complete],
      };
    case "add":
      return {
        active: [
          ...state.active,
          { id: Date.now(), todo: action.payload, isDone: false },
        ],
        complete: [...state.complete],
      };
    case "edit":
      const newActiveEdit = state.active.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
      return {
        active: [...newActiveEdit],
        complete: [...state.complete],
      };
    case "remove":
      const newActiveRemove = state.active.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        active: [...newActiveRemove],
        complete: [...state.complete],
      };
    default:
      return initialState;
  }
};
export default TodoReducer;
