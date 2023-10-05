import { EActionTodo } from '../../enum/todo.enum';
import { IStateInit, ITodo, ITodoAction } from '../../interface/todo.interface';

export function reducer(state: IStateInit, action: ITodoAction): IStateInit {
  switch (action.type) {
    case EActionTodo.GET_TODOS_LOADING:
      return {
        ...state,
        getTodoLoading: true
      };
    case EActionTodo.GET_ALL_TODOS:
      return {
        ...state,
        getTodoLoading: false,
        todos: action.payload as ITodo[]
      };
    case EActionTodo.GET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: action.payload as ITodo
      };
    case EActionTodo.SET_EDIT_TODO:
      return {
        ...state,
        isEditTodo: action.payload as boolean
      };
    case EActionTodo.SET_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.payload as string
      };
    case EActionTodo.SET_ACTIVE_SORT:
      return {
        ...state,
        activeSort: action.payload as string
      };
    case EActionTodo.GET_SEARCH_TEXT:
      return {
        ...state,
        currentSearch: action.payload as string
      };
    default:
      return {
        ...state,
        getTodoLoading: false,
        getTodoError: true
      };
  }
}
