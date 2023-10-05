import React, { useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import Button from '../../components/Button/Button';
import { TodoList } from './components/TodoList/TodoList';
import styles from './Todo.module.css';
import CreateOrEditDialog from './components/CreateOrEditDialog/CreateOrEditDialog';
import DeleteDialog from './components/DeleteDialog/DeleteDialog';
import Notification from './components/Notification/Notification';
import Sort from './components/Sort/Sort';
import Seacrh from './components/Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { getAllTodosAction, setError, setLoading } from './reducer/todo.action';
import { getAllTodosApi } from '../api/todo.api';
import { ITodo } from '../interface/todo.interface';
import { useTodoContext } from './contexts/TodoProvider';
export const Todo = (): JSX.Element => {
  const { dispatch } = useTodoContext();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openCreateorEditDialog, setOpenCreateorEditDialog] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setLoading());
    getAllTodosApi()
      .then((todos: ITodo[]) => dispatch(getAllTodosAction(todos)))
      .catch(() => dispatch(setError()));
  }, []);
  return (
    <main className={styles.mainContent}>
      <header className={styles.header}>
        <p className={styles.headingTodo}>
          <FontAwesomeIcon icon={faSquareCheck} />
          <span className={styles.titleTodo}>TODO APP</span>
        </p>
      </header>
      <main className={styles.mainTop}>
        <div className={styles.headerContent}>
          <Filters></Filters>
          <Notification></Notification>
          <Button
            color='btn primary-btn'
            handleClick={() => {
              setOpenCreateorEditDialog(true);
            }}
          >
            Create new Task
          </Button>
        </div>
        <div className={styles.wraperSearch}>
          <div className={styles.sortBox}>
            <Sort></Sort>
          </div>
          <div className={styles.searchBox}>
            <Seacrh></Seacrh>
          </div>
        </div>
      </main>
      <TodoList openCreateorEditDialog={setOpenCreateorEditDialog} openDeleteDialog={setOpenDeleteDialog}></TodoList>
      {openCreateorEditDialog && (
        <CreateOrEditDialog openCreateorEditDialog={setOpenCreateorEditDialog}></CreateOrEditDialog>
      )}
      {openDeleteDialog && <DeleteDialog openDeleteDialog={setOpenDeleteDialog}></DeleteDialog>}
    </main>
  );
};
