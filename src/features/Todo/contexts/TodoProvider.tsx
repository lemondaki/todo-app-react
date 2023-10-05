import React, { useContext, useReducer, createContext } from 'react';
import { reducer } from '../reducer/todo.reducer';
import { IStateInit, ITodoAction } from '../../interface/todo.interface';
import { EFilterStatus, ESortStatus } from '../../enum/todo.enum';
const initState: IStateInit = {
  getTodoLoading: false,
  getTodoError: false,
  currentTodo: { id: 0, task: '', deadline: '', isCompleted: false },
  isEditTodo: false,
  activeFilter: EFilterStatus.ALL,
  activeSort: ESortStatus.DEFAULT,
  currentSearch: '',
  todos: []
};

interface ITodoContextType {
  state: IStateInit;
  dispatch: React.Dispatch<ITodoAction>;
}

export const TodoContext = createContext<ITodoContextType>({
  state: initState,
  dispatch: () => {}
});

export const TodoProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodoContext = (): ITodoContextType => {
  return useContext(TodoContext);
};
