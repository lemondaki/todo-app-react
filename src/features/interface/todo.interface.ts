export interface ITodo {
  id: number;
  task: string;
  deadline: string;
  isCompleted: boolean;
}

export interface IStateInit {
  getTodoLoading: boolean;
  getTodoError: boolean;
  currentTodo: ITodo;
  isEditTodo: boolean;
  activeFilter: string;
  activeSort: string;
  currentSearch: string;
  todos: ITodo[];
}

export interface IFilterStatus {
  id: number;
  status: string;
  count: number;
}

export interface IGetAllTodosAction {
  type: string;
  payload: ITodo[];
}

export interface IGetCurrentTodo {
  type: string;
  payload: ITodo;
}

export interface ISetEditTodo {
  type: string;
  payload: boolean;
}

export interface IPayloadString {
  type: string;
  payload: string;
}

export type ITodoAction = IGetAllTodosAction | IGetCurrentTodo | ISetEditTodo | IPayloadString;
