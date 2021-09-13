import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ChangesLogicService} from  '../main-page/changes-logic.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-display-change',
  templateUrl: './display-change.component.html',
  styleUrls: ['./display-change.component.css'],
  providers:[ChangesLogicService]
})
export class DisplayChangeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private changesLogicService:ChangesLogicService, public sanitizer: DomSanitizer,private fb: FormBuilder,private http:HttpClient) { }
  requestId:number;
  changeId:number;
  changeStatus:number;
  changeDetails = [];
  margeRequests = []
  iframeUel;
  showList = false;

  myForm = this.fb.group({
    urlString: ['',Validators.required],
  });

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.changeId = parseInt(params.get('id'));
      this.changesLogicService.getRequestByMargeId(this.changeId).subscribe((data:any[])=>{
        if(data.length){
          this.showList = true
            for (var i=0; i<data.length;i++){

                data[i].fullUrl = data[i].mm_mrs_base_url.trim()+data[i].mm_mrs_group.trim()+'/'+data[i].mm_mrs_num;
                this.margeRequests.push(data[i]);
            }
          }
      });

    });

  }

  onSubmit(){

  }

  onDeleteRequestAlert(requestId:number){
    this.requestId = requestId;
    ($('#confirmModal') as any).modal('show');
  }

  onDeleteChange(){
    if(this.margeRequests.length){
      for (let i= 0 ; i< this.margeRequests.length;i++){
        if(this.margeRequests[i].mm_mrs_id == this.requestId){
          this.margeRequests.splice(i, 1);
        }
      }
    }
    document.getElementById('confirmModal').click();
  }

  getIframe(){
    if(this.iframeUel =='')
      return ;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUel);
  }

}
