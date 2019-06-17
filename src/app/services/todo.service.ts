import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2NiZDgxODQyNjg1MjI1M2NkMWJmM2UiLCJpYXQiOjE1NTY5NDUxODJ9.XwrpqfhyqFgFMxD71yxZmhJ8WMU6hLsbgF7Bvpqp6Ls";
var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Bearer " + token);

const httpOptions = {
   headers: headers_object
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'http://localhost:8080/todoItems';
  todosLimit = '?_limit=5';
  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }
  
  deleteTodo(todo: Todo):Observable<Todo>{
    // console.log("this item got deleted" ,todo)
    // var id = todo["id"] = JSON.parse(localStorage.getItem('currentUser'))['_id']
    // console.log("item id", id)
    const url =`${this.todosUrl}/${todo._id}`;
    return this.http.delete<Todo>(url,httpOptions)
  }

  addTodo(todo:Todo):Observable<Todo>{
  //  todo["username"]=JSON.parse(localStorage.getItem('currentUser'))['username'];
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
