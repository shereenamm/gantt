import { Injectable } from '@angular/core';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  get(): Promise<Task[]>{
    return Promise.resolve([
        {id: 1, text: "Phase #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6},
        {id: 2, text: "Phase #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4},
        {id: 3, text: "Task #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6,parent:1},
        {id: 4, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4,parent:2},
        {id: 5, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4,parent:2}
    ]as Task[]);
}
}
