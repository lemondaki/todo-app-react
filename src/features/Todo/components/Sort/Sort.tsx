import React from 'react';
import { useTodoContext } from '../../contexts/TodoProvider';
import { getActiveSort } from '../../reducer/todo.action';
import styles from './Sort.module.css';
const Sort = (): JSX.Element => {
  const { dispatch } = useTodoContext();
  const handleSelectOptionSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(getActiveSort(event.target.value));
  };
  return (
    <div>
      <label className='mr-8' htmlFor='Sort'>
        Sort
      </label>
      <select className={styles.selectSort} title='sort' name='sort' onChange={handleSelectOptionSort}>
        <option value='default'>Default</option>
        <option value='name(a-z)'>Name (A-Z)</option>
        <option value='name(z-a)'>Name (Z-A)</option>
        <option value='deadline(inc)'>Deadline (INC)</option>
        <option value='deadline(dec)'>Deadline (DEC)</option>
      </select>
    </div>
  );
};

export default Sort;
