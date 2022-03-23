export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
  isComplete: boolean;
}

export interface Edit {
  id: number;
  todo: string;
}

export interface Remove {
  id: number;
  completed: boolean;
}

export interface InitialState  {
  active: Todo[];
  complete: Todo[];
};

export const initialState: InitialState = {
  active: [],
  complete: [],
};


export type Actions =
  | { type: "done"; payload: number }
  | { type: "add"; payload: string }
  | { type: "edit"; payload: Edit }
  | { type: "remove"; payload: Remove }
  | { type: "active"; payload: Todo[] }
  | { type: "complete"; payload: Todo[] }
  

