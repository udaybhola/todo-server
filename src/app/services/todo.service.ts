import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }
  )
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'http://localhost:3000/todoItem';
  todosLimit = '?_limit=5';
  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  deleteTodo(todo: Todo):Observable<Todo>{
    console.log("this item got deleted" ,todo)
    const url =`${this.todosUrl}/${todo._id}`;
    return this.http.delete<Todo>(url,httpOptions)
  }

  addTodo(todo:Todo):Observable<Todo>{
    console.log("this item added" ,todo)
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  toggleCompleted(todo:Todo):Observable<any>{
    const url =`${this.todosUrl}/${todo._id}`;
    console.log("toggled todo item" ,todo);
    console.log("this is url ",url)
    return this.http.put(url, todo, httpOptions)
  }
}
