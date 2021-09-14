import { Injectable } from '@angular/core';
import {Changes} from './changes.model'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable(/*{
  providedIn: 'root'
}*/)

export class ChangesLogicService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://bi-new.mellanox.com/mmrServer";

  getStatusList(){
    return this.http.get(this.apiUrl+'/getStatusList.php');
  }

  getItems() {
    return this.http.get(this.apiUrl+'/getChangeList.php');
  }

  getMargeById(changeId){
    changeId = parseInt(changeId);
    return this.http.get(this.apiUrl+"/getChangeById.php?mm_changes_id="+changeId);
  }

  getRequestByMargeId(changeId){
    changeId = parseInt(changeId);
    return this.http.get(this.apiUrl+"/getMargeRequest.php?mm_changes_id="+changeId);
  }

  getProjectList(){
    return this.http.get(this.apiUrl+'/getProjectList.php' );
  }

  addChange(jsonData){
    return this.http.post<any>(this.apiUrl+'/putNewChange.php',jsonData);
  }
}
