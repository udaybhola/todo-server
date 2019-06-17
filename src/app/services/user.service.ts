import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAll(){
    return  this.http.get<User[]>(`${this.Url}/users`);
  }

  getById(id: number){
    return this.http.get(`${this.Url}/users/` +id);
  }

  register(user: User){
    return this.http.post(`${this.Url}/users/register`,user);
  }

  update(user: User){
    return this.http.put(`${this.Url}/users/` +user.id, user);
  }

  delete(id: number){
    return this.http.delete(`${this.Url}/users/` +id);
  }


}
