import { Todo } from "./model";
interface Edit {
    id: number;
    todo: string;
  }
export type Actions =
    | { type: "done"; payload: number }
    | { type: "add"; payload: string }
    | { type: "edit"; payload: Edit }
    | { type: "remove"; payload: number }

const TodoReducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
        case "done":
            return state.map((todo) => {
               return todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
            });
        case "add":
            return [
                ...state,
                { id: Date.now(), todo: action.payload, isDone: false }
            ];
        case "edit":
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo));
        case "remove":
            return state.filter((todo) => todo.id !== action.payload);
        default:
            return state;

    }
};
export default TodoReducer;


