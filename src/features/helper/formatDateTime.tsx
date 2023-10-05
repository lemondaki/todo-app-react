import { ETime } from '../enum/todo.enum';
import { ITodo } from '../interface/todo.interface';

export const formatDateTime = (dateTime: string): string => {
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return formatter.format(new Date(dateTime));
};

export const checkDeadline = (task: ITodo): boolean => {
  const currentTime = new Date().getTime();
  const deadlineTime = new Date(task.deadline).getTime();
  const timeOneHour = 1 * ETime.HOUR * ETime.MINUTE * ETime.MILISECOND;
  const restTime = deadlineTime - currentTime;
  if (restTime > 0 && restTime <= timeOneHour && !task.isCompleted) {
    return true;
  }
  return false;
};

export const getMiliseconds = (dateTime: string): number => {
  return new Date(dateTime).getTime();
};
