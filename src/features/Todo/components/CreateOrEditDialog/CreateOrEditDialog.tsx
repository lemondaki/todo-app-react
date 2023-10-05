import React, { useEffect, useState } from 'react';
import styles from './CreateOrEditDialog.module.css';
import Dialog from '../../../../components/Dialog/Dialog';
import Button from '../../../../components/Button/Button';
import { useTodoContext } from '../../contexts/TodoProvider';
import { ITodo } from '../../../interface/todo.interface';
import { addNewTodoApi, editTodoApi, getAllTodosApi } from '../../../api/todo.api';
import { getAllTodosAction, setError, setLoading, setEditTodo } from '../../reducer/todo.action';
import { ETitleAction } from '../../../enum/todo.enum';
interface propsType {
  openCreateorEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateOrEditDialog = ({ openCreateorEditDialog }: propsType): JSX.Element => {
  const [formTodo, setFormTodo] = useState({ task: '', deadline: '' });
  const [formError, setErrorForm] = useState({
    task: '',
    deadline: ''
  });
  const {
    dispatch,
    state: { isEditTodo, currentTodo }
  } = useTodoContext();

  useEffect(() => {
    if (isEditTodo) {
      setFormTodo({ task: currentTodo.task, deadline: currentTodo.deadline });
    }
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormTodo({
      ...formTodo,
      [name]: value
    });
    handleSetFormError(name, value);
  };
  const handleAddNewTask = (): void => {
    const { task, deadline } = formTodo;
    const newTask: ITodo = {
      id: Math.random() * 1000,
      task,
      deadline,
      isCompleted: false
    };
    dispatch(setLoading());
    addNewTodoApi(newTask)
      .then(async () => await getAllTodosApi())
      .then((todos) => dispatch(getAllTodosAction(todos)))
      .catch(() => dispatch(setError()));
    openCreateorEditDialog(false);
  };

  const handleUpdateTodo = (): void => {
    const { task, deadline } = formTodo;
    const editTodoItem = { ...currentTodo, task, deadline };
    dispatch(setLoading());
    editTodoApi(editTodoItem)
      .then(async () => await getAllTodosApi())
      .then((todos) => dispatch(getAllTodosAction(todos)))
      .catch(() => dispatch(setError()));
    handleCloseDialog();
  };

  const handleCloseDialog = (): void => {
    openCreateorEditDialog(false);
    setFormTodo({ task: '', deadline: '' });
    dispatch(setEditTodo(false));
  };

  const handleSetFormError = (name: string, value: string): void => {
    if (value.trim() === '') {
      setErrorForm({ ...formError, [name]: `${name} không được để trống` });
    } else {
      setErrorForm({ ...formError, [name]: '' });
    }
  };

  const handleSubmitTodo = (): void => {
    const { task, deadline } = formTodo;
    if (task.trim() === '') {
      setErrorForm((prevError) => ({ ...prevError, task: 'task không được để trống' }));
    }
    if (deadline.trim() === '') {
      setErrorForm((prevError) => ({ ...prevError, deadline: 'deadline không được để trống' }));
    }
    if (task.trim() === '' || deadline.trim() === '') {
      return;
    }
    if (isEditTodo) {
      handleUpdateTodo();
    } else handleAddNewTask();
  };

  const handleFocusInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    handleSetFormError(name, value);
  };
  return (
    <Dialog actionTitle={isEditTodo ? ETitleAction.EDIT : ETitleAction.CREATE}>
      <>
        <form className={styles.form}>
          <label htmlFor='task'>Task:</label>
          <input
            className={styles.inputForm}
            type='text'
            name='task'
            required
            value={formTodo.task}
            placeholder='Add a new task...'
            onChange={handleInputChange}
            onBlur={handleFocusInput}
          />
          {formError.task !== '' && <p className={styles.errorText}>*{formError.task}</p>}
          <label className={styles.deadlineLabel} htmlFor='deadine'>
            Deadline:
          </label>
          <input
            type='datetime-local'
            name='deadline'
            required
            className={styles.inputForm}
            value={formTodo.deadline}
            placeholder='deadline'
            onChange={handleInputChange}
            onBlur={handleFocusInput}
          />
          {formError.deadline !== '' && <p className={styles.errorText}>*{formError.deadline}</p>}
        </form>
        <div className='wrapper-action-btn'>
          <Button color='btn secondary-btn' handleClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color='btn primary-btn' handleClick={handleSubmitTodo}>
            {isEditTodo ? 'Update' : 'Save'}
          </Button>
        </div>
      </>
    </Dialog>
  );
};

export default CreateOrEditDialog;
