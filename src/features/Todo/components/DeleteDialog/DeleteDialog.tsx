import React from 'react';
import Dialog from '../../../../components/Dialog/Dialog';
import { useTodoContext } from '../../contexts/TodoProvider';
import Button from '../../../../components/Button/Button';
import { deleteTodoApi, getAllTodosApi } from '../../../api/todo.api';
import { getAllTodosAction, setError, setLoading } from '../../reducer/todo.action';
import styles from './DeleteDialog.module.css';
import { ETitleAction } from '../../../enum/todo.enum';
interface propsType {
  openDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteDialog = ({ openDeleteDialog }: propsType): JSX.Element => {
  const {
    dispatch,
    state: { currentTodo }
  } = useTodoContext();
  const handleDeleteTodo = (): void => {
    openDeleteDialog(false);
    dispatch(setLoading());
    deleteTodoApi(currentTodo.id)
      .then(async () => await getAllTodosApi())
      .then((todos) => {
        dispatch(getAllTodosAction(todos));
      })
      .catch(() => {
        dispatch(setError());
      });
  };
  return (
    <Dialog actionTitle={ETitleAction.DELETE}>
      <main>
        <p className={styles.deleteConfirm}>Are you sure to delete task: {currentTodo.task} ?</p>
        <div className='wrapper-action-btn'>
          <Button color='btn secondary-btn' handleClick={() => openDeleteDialog(false)}>
            No
          </Button>
          <Button color='btn danger-btn' handleClick={handleDeleteTodo}>
            Yes
          </Button>
        </div>
      </main>
    </Dialog>
  );
};

export default DeleteDialog;
