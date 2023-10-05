import React from 'react';
import { useTodoContext } from '../../contexts/TodoProvider';
import { getCurrentSearchText } from '../../reducer/todo.action';
import styles from './Search.module.css';
const Seacrh = (): JSX.Element => {
  const { dispatch } = useTodoContext();
  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(getCurrentSearchText(event.target.value));
  };
  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        type='text'
        name='search'
        placeholder='Search todo by name...'
        onChange={handleChangeSearchText}
      />
    </div>
  );
};

export default Seacrh;
