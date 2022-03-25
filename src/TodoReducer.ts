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
          {
            id: Date.now(),
            todo: action.payload,
            isDone: false,
            isComplete: false,
          },
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
      let newActiveRemove;
      if (!action.payload.completed) {
        newActiveRemove = state.active.filter(
          (todo) => todo.id !== action.payload.id
        );
        return {
          active: [...newActiveRemove],
          complete: [...state.complete],
        };
      } else {
        newActiveRemove = state.complete.filter(
          (todo) => todo.id !== action.payload.id
        );
        return {
          active: [...state.active],
          complete: [...newActiveRemove],
        };
      }

    case "active":
      const newActiveDragged = action.payload.map((todo) => ({
        ...todo,
        isDone: false,
        isComplete: false,
      }));
      return {
        active: [...newActiveDragged],
        complete: [...state.complete],
      };
    case "complete":
      const newCompletedDone = action.payload.map((todo) => ({
        ...todo,
        isDone: true,
        isComplete: true,
      }));
      return {
        active: [...state.active],
        complete: [...newCompletedDone],
      };
    default:
      return initialState;
  }
};
export default TodoReducer;
