export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface Edit {
  id: number;
  todo: string;
}

export type Actions =
  | { type: "done"; payload: number }
  | { type: "add"; payload: string }
  | { type: "edit"; payload: Edit }
  | { type: "remove"; payload: number };

export type InitialState = {
  active: Todo[];
  complete: Todo[];
};

export const initialState: InitialState = {
  active: [],
  complete: [],
};
