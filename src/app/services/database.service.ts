import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Task } from '../model/Task';

const TASK_KEY = 'my-tasks';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private storage: Storage, private sqlite: SQLite) {}

  addTask(task: Task): Promise<any> {
    return this.storage.get(TASK_KEY).then((tasks: Task[]) => {
      if (tasks) {
        tasks.push(task);
        return this.storage.set(TASK_KEY, [task]);

      } else {
        return this.storage.set(TASK_KEY, [task]);
      }
    })
  }
  getTasks() {
    return this.storage.get(TASK_KEY);
  }
  updateTask(task: Task): Promise<any> {
    return this.storage.get(TASK_KEY).then((tasks: Task[]) => {
      if (!tasks || tasks.length === 0) {
        return null;
      }
      let newTasks: Task[] = [];
      for (let i of tasks) {
        if (i.id === task.id) {
          newTasks.push(task);
        } else {
          newTasks.push(i);
        }
      }
      return this.storage.set(TASK_KEY, newTasks);
    });
  }
  deleteTask(id: number) {
    return this.storage.get(TASK_KEY).then((tasks: Task[]) => {
      if (!tasks || tasks.length === 0) {
        return null;
      }
      let toKeep: Task[] = [];
      for (let i of tasks) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(TASK_KEY,toKeep);
    });
  }


}
