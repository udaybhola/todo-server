import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigatioChange = false;

  constructor(private router: Router) { 
    router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        if(this.keepAfterNavigatioChange){
          this.keepAfterNavigatioChange = false;
        }else{
         console.log("in alert service",this.subject.next()) 
        }
      }
    });
  }

  success(message: string, keepAfterNavigatioChange = false){
    this.keepAfterNavigatioChange = keepAfterNavigatioChange;
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, keepAfterNavigatioChange = false){
    this.keepAfterNavigatioChange = keepAfterNavigatioChange;
    this.subject.next({type: 'error', text: message}) 
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
