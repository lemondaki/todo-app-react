export enum EActionTodo {
  GET_TODOS_LOADING = 'GET_TASKS_LOADING',
  GET_TODOS_ERROR = 'GET_TASKS_ERROR',
  GET_ALL_TODOS = 'GET_ALL_TASKS',
  GET_CURRENT_TODO = 'GET_CURRENT_TODO',
  SET_EDIT_TODO = 'SET_EDIT_TODO',
  SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER',
  SET_ACTIVE_SORT = 'SET_ACTIVE_SORT',
  GET_SEARCH_TEXT = 'GET_SEARCH_TEXT'
}

export enum EFilterStatus {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  NOTIFICATION = 'NOTIFICATION'
}

export enum ETitleAction {
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete'
}

export enum ETime {
  HOUR = 60,
  MINUTE = 60,
  MILISECOND = 1000
}

export enum ESortStatus {
  DEFAULT = 'default',
  NAME_ATOZ = 'name(z-a)',
  NAME_ZTOA = 'name(a-z)',
  DEALINE_INC = 'deadline(inc)',
  DEALINE_DEC = 'deadline(dec)'
}
