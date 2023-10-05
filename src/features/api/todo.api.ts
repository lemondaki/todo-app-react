import { instanceAxios } from '../../environment/api.config';
import { ITodo } from '../interface/todo.interface';

export const getAllTodosApi = async (): Promise<ITodo[]> => {
  try {
    return (await instanceAxios.get('todos')).data;
  } catch (error) {
    throw new Error(' Failed to fetch data');
  }
};

export const addNewTodoApi = async (task: ITodo): Promise<ITodo> => {
  try {
    return (await instanceAxios.post('todos', task)).data;
  } catch (error) {
    throw new Error(' Failed to fetch data');
  }
};

export const editTodoApi = async (task: ITodo): Promise<ITodo> => {
  try {
    return await instanceAxios.put(`todos/${task.id}`, task);
  } catch (error) {
    throw new Error(`Failed to edit task: ${task.task}`);
  }
};

export const deleteTodoApi = async (id: number): Promise<ITodo> => {
  try {
    return await instanceAxios.delete(`todos/${id}`);
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};
