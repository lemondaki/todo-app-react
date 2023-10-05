import { EActionTodo } from '../../enum/todo.enum';
import { ITodo, ITodoAction } from '../../interface/todo.interface';

export const getAllTodosAction = (payload: ITodo[]): ITodoAction => {
  return {
    type: EActionTodo.GET_ALL_TODOS,
    payload
  };
};

export const setLoading = (): ITodoAction => {
  return {
    type: EActionTodo.GET_TODOS_LOADING,
    payload: ''
  };
};

export const setError = (): ITodoAction => {
  return {
    type: EActionTodo.GET_TODOS_ERROR,
    payload: ''
  };
};

export const getCurrentTodo = (payload: ITodo): ITodoAction => {
  return {
    type: EActionTodo.GET_CURRENT_TODO,
    payload
  };
};

export const setEditTodo = (payload: boolean): ITodoAction => {
  return {
    type: EActionTodo.SET_EDIT_TODO,
    payload
  };
};

export const getActiveFilter = (payload: string): ITodoAction => {
  return {
    type: EActionTodo.SET_ACTIVE_FILTER,
    payload
  };
};

export const getActiveSort = (payload: string): ITodoAction => {
  return {
    type: EActionTodo.SET_ACTIVE_SORT,
    payload
  };
};

export const getCurrentSearchText = (payload: string): ITodoAction => {
  return {
    type: EActionTodo.GET_SEARCH_TEXT,
    payload
  };
};
