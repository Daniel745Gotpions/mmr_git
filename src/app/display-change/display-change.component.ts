import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ChangesLogicService} from  '../main-page/changes-logic.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-display-change',
  templateUrl: './display-change.component.html',
  styleUrls: ['./display-change.component.css'],
  providers:[ChangesLogicService]
})
export class DisplayChangeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private changesLogicService:ChangesLogicService, public sanitizer: DomSanitizer) { }
  changeId:number;
  changeStatus:number;
  changeDetails = [];
  margeRequests = []
  iframeUel;
  showList = false;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.changeId = parseInt(params.get('id'));
      this.changesLogicService.getRequestByMargeId(this.changeId).subscribe((data:any[])=>{
          debugger;
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

  getIframe(){
    if(this.iframeUel =='')
      return ;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUel);
  }

}
