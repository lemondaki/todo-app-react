import React, { useMemo } from 'react';
import RadioButton from '../../../../components/RadioButton/RadioButton';
import { EFilterStatus } from '../../../enum/todo.enum';
import { IFilterStatus } from '../../../interface/todo.interface';
import { useTodoContext } from '../../contexts/TodoProvider';
import styles from './Filter.module.css';
export const Filters = (): JSX.Element => {
  const { todos } = useTodoContext().state;
  const filterStatus: IFilterStatus[] = [
    {
      id: 0,
      status: EFilterStatus.ALL,
      count: 0
    },
    {
      id: 1,
      status: EFilterStatus.ACTIVE,
      count: 0
    },
    {
      id: 2,
      status: EFilterStatus.COMPLETED,
      count: 0
    }
  ];
  const handleGetCounter = (): IFilterStatus[] => {
    const allCounter = todos.length;
    const activeCounter = todos.filter((todo) => !todo.isCompleted).length;
    const completedCounter = allCounter - activeCounter;
    return filterStatus.map((s) => {
      if (s.status === EFilterStatus.ACTIVE) {
        return { ...s, count: activeCounter };
      }
      if (s.status === EFilterStatus.COMPLETED) {
        return { ...s, count: completedCounter };
      }
      return { ...s, count: allCounter };
    });
  };

  const filterCount = useMemo(() => handleGetCounter(), [todos]);
  return (
    <div className={styles.filter}>
      <p>Filter</p>
      {filterCount.map((status) => (
        <RadioButton key={status.id} filter={status} />
      ))}
    </div>
  );
};
