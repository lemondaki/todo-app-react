import React, { useMemo } from 'react';
import { ITodo } from '../../../interface/todo.interface';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodoContext } from '../../contexts/TodoProvider';
import styles from './TodoList.module.css';
import { EFilterStatus, ESortStatus } from '../../../enum/todo.enum';
import { checkDeadline, getMiliseconds } from '../../../helper/formatDateTime';
interface propsType {
  openDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateorEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export const TodoList = ({ openDeleteDialog, openCreateorEditDialog }: propsType): JSX.Element => {
  const { todos, getTodoLoading, getTodoError, activeFilter, activeSort, currentSearch } = useTodoContext().state;
  const handleFilterTodoList = (): ITodo[] => {
    let cloneTodos = [...todos];
    if (currentSearch !== '') {
      cloneTodos = cloneTodos.filter((todo) => todo.task.startsWith(currentSearch));
    }
    if (activeFilter === EFilterStatus.ACTIVE) {
      cloneTodos = cloneTodos.filter((todo) => !todo.isCompleted);
    }
    if (activeFilter === EFilterStatus.COMPLETED) {
      cloneTodos = cloneTodos.filter((todo) => todo.isCompleted);
    }
    if (activeFilter === EFilterStatus.NOTIFICATION) {
      cloneTodos = cloneTodos.filter((todo) => checkDeadline(todo));
    }
    return cloneTodos;
  };
  const handleSortTodos = (filterTodos: ITodo[]): ITodo[] => {
    if (activeSort === ESortStatus.NAME_ATOZ) {
      return [...filterTodos].sort((a, b) => b.task.localeCompare(a.task));
    }
    if (activeSort === ESortStatus.NAME_ZTOA) {
      return [...filterTodos].sort((a, b) => a.task.localeCompare(b.task));
    }
    if (activeSort === ESortStatus.DEALINE_INC) {
      return [...filterTodos].sort((a, b) => getMiliseconds(a.deadline) - getMiliseconds(b.deadline));
    }
    if (activeSort === ESortStatus.DEALINE_DEC) {
      return [...filterTodos].sort((a, b) => getMiliseconds(b.deadline) - getMiliseconds(a.deadline));
    }
    return filterTodos;
  };
  const todoFilter = useMemo(
    () => handleSortTodos(handleFilterTodoList()),
    [todos, activeFilter, activeSort, currentSearch]
  );
  if (getTodoError) {
    return (
      <div className={styles.todoList}>
        <h2 className={styles.titleError}>There are something wrong...</h2>
      </div>
    );
  }

  if (getTodoLoading) {
    return (
      <div className={styles.todoList}>
        <div className={styles.loading}>
          <h2 className={styles.titleHeading}>Loading...</h2>
        </div>
      </div>
    );
  }
  if (todos.length < 1) {
    return (
      <div className={styles.todoList}>
        <h2 className={styles.titleShowInfor}>There are no todos, add a new todo... </h2>
      </div>
    );
  }

  if (todoFilter.length < 1) {
    if (activeFilter === EFilterStatus.NOTIFICATION) {
      return (
        <div className={styles.todoList}>
          <h2 className={styles.titleShowInfor}>No todos is due 1 hour before the deadline! </h2>
        </div>
      );
    }
    return (
      <div className={styles.todoList}>
        <h2 className={styles.titleShowInfor}>There are no todos matching... </h2>
      </div>
    );
  }
  return (
    <div>
      {todoFilter.map((task: ITodo) => (
        <TodoItem
          key={task.id}
          todoItem={task}
          openCreateorEditDialog={openCreateorEditDialog}
          openDeleteDialog={openDeleteDialog}
        ></TodoItem>
      ))}
    </div>
  );
};
