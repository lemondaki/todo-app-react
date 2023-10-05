import React, { useState } from 'react';
import { ITodo } from '../../../interface/todo.interface';
import styles from './TodoItem.module.css';
import Chexbox from '../../../../components/Chexbox/Chexbox';
import { editTodoApi, getAllTodosApi } from '../../../api/todo.api';
import { formatDateTime } from '../../../helper/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getAllTodosAction, getCurrentTodo, setEditTodo, setError } from '../../reducer/todo.action';
import { useTodoContext } from '../../contexts/TodoProvider';
interface PropsType {
  todoItem: ITodo;
  openDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateorEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export const TodoItem = ({ todoItem, openDeleteDialog, openCreateorEditDialog }: PropsType): JSX.Element => {
  const [checked, setCheckbox] = useState(todoItem.isCompleted);
  const { dispatch } = useTodoContext();
  const handleCheckbox = (): void => {
    const todoItemCheck = { ...todoItem, isCompleted: !todoItem.isCompleted };
    setCheckbox(!todoItem.isCompleted);
    editTodoApi(todoItemCheck)
      .then(async () => await getAllTodosApi())
      .then((todos) => dispatch(getAllTodosAction(todos)))
      .catch(() => dispatch(setError()));
  };
  const handleOpenDeleteDialog = (): void => {
    dispatch(getCurrentTodo(todoItem));
    openDeleteDialog(true);
  };
  const handleOpenCreateOrEditDialogModal = (): void => {
    openCreateorEditDialog(true);
    dispatch(getCurrentTodo(todoItem));
    dispatch(setEditTodo(true));
  };
  return (
    <>
      <div className={`custom-shadow  ${styles.todoItem}`}>
        <div>
          <Chexbox onCheck={handleCheckbox} checkStatus={checked} />
          <h4 className={todoItem.isCompleted ? styles.taskCompleted : ''}>{todoItem.task}</h4>
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faClock} />
            <span className={styles.deadlineTime}>{formatDateTime(todoItem.deadline)}</span>
          </p>
          <div className={styles.actionTodo}>
            <p className={`${styles.actionBtn} ${styles.editBtn}`} onClick={handleOpenCreateOrEditDialogModal}>
              <FontAwesomeIcon icon={faPencil} />
              <span className={styles.actionText}>Edit</span>
            </p>
            <p className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={handleOpenDeleteDialog}>
              <FontAwesomeIcon icon={faTrashCan} />
              <span className={styles.actionText}>Delete</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
