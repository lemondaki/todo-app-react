import React from 'react';
import { useTodoContext } from '../../contexts/TodoProvider';
import { checkDeadline } from '../../../helper/formatDateTime';
import { getActiveFilter } from '../../reducer/todo.action';
import { EFilterStatus } from '../../../enum/todo.enum';
import styles from './Notification.module.css';
const Notification = (): JSX.Element => {
  const {
    dispatch,
    state: { todos }
  } = useTodoContext();
  const todosComeDeadline = todos.filter((todo) => checkDeadline(todo));
  const handleSetActiveFilter = (event: React.MouseEvent<HTMLInputElement>): void => {
    dispatch(getActiveFilter(EFilterStatus.NOTIFICATION));
  };
  return (
    <div className={styles.notification} onClick={handleSetActiveFilter}>
      <p className={styles.headingNoti}>Notification</p>
      <span className={styles.countNoti}>{todosComeDeadline.length}</span>
    </div>
  );
};

export default Notification;
