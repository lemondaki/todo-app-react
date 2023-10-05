import React from 'react';
import styles from './Dialog.module.css';
interface PropsType {
  children: JSX.Element;
  actionTitle: string;
}
const Dialog = ({ children, actionTitle }: PropsType): JSX.Element => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalDialog}>
        <div className={styles.heading}>
          <p className={styles.modalTitle}>{actionTitle} todo</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
