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

  // Get status list
  getStatusList(){
    return this.http.get(this.apiUrl+'/getStatusList.php');
  }

  // Get change list
  getItems() {
    return this.http.get(this.apiUrl+'/getChangeList.php');
  }

  // Get marge details by id
  getMargeById(changeId){
    changeId = parseInt(changeId);
    return this.http.get(this.apiUrl+"/getChangeById.php?mm_changes_id="+changeId);
  }

  // Get open request by change id
  getRequestByMargeId(changeId){
    changeId = parseInt(changeId);
    return this.http.get(this.apiUrl+"/getMargeRequest.php?mm_changes_id="+changeId);
  }

  // Get project list
  getProjectList(){
    return this.http.get(this.apiUrl+'/getProjectList.php' );
  }

  // Add new change
  addChange(jsonData){
    return this.http.post<any>(this.apiUrl+'/putNewChange.php',jsonData);
  }

  // Add new request
  addRequest(jsonData){
    return this.http.post<any>(this.apiUrl+'/putNewRequest.php',jsonData);
  }

  // Delete request by id
  deleteMmrById(mmrId){
    mmrId = parseInt(mmrId);
    return this.http.get(this.apiUrl+'/deleteRequestById.php?mm_mrs_id='+mmrId );
  }

  // Get project list
  editChange(jsonData){
    return this.http.post(this.apiUrl+'/editChange.php', jsonData );

  }
}
