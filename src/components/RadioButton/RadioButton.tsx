import React from 'react';
import { IFilterStatus } from '../../features/interface/todo.interface';
import { useTodoContext } from '../../features/Todo/contexts/TodoProvider';
import { getActiveFilter } from '../../features/Todo/reducer/todo.action';
import styles from './RadioButton.module.css';
interface PropsType {
  key: number;
  filter: IFilterStatus;
}
const RadioButton = ({ filter }: PropsType): JSX.Element => {
  const {
    dispatch,
    state: { activeFilter }
  } = useTodoContext();
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(getActiveFilter(event.target.value));
  };

  return (
    <div className={styles.radioButton}>
      <input
        name='filter-status'
        placeholder='radio'
        className={styles.radioInput}
        type='radio'
        value={filter.status}
        checked={activeFilter === filter.status}
        onChange={handleRadioChange}
      />
      <label htmlFor={filter.status}>
        {filter.status}({filter.count})
      </label>
    </div>
  );
};

export default RadioButton;
