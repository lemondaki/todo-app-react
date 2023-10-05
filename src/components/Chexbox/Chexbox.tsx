import React from 'react';
import styles from './Checkbox.module.css';
interface PropsType {
  checkStatus: boolean;
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Chexbox = ({ onCheck, checkStatus }: PropsType): JSX.Element => {
  return (
    <div className='wrapper-checkbox'>
      <input
        className={styles.inputCheckbox}
        onChange={onCheck}
        checked={checkStatus}
        placeholder='checkbox'
        type='checkbox'
      />
      <label htmlFor='check-completed'>{checkStatus ? 'Completed' : 'Active'}</label>
    </div>
  );
};

export default Chexbox;
