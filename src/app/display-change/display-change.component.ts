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
  changeStatusId:number;
  description:string;
  projectName :string;
  statusList = [];
  projectList = [];
  margeRequests = []
  iframeUel;
  showList = false;
  displayError = false;

  editActiveClassAction = 'bi bi-pencil-fill';
  editActiveTitleAction = 'Edit Change Details';
  editActiveIndex = 0;
  disableInput = true;

  defaultIcon = [
    {
      action:'edit',
      class:'bi bi-pencil-fill',
      title:'Edit Change Details',
      disable:true
    },
    {
      action:'apply',
      class:'bi bi-caret-right-fill',
      title:'Apply Action',
      disable:false
    }
  ]

  myForm = this.fb.group({
    urlString: ['',Validators.required],
  });

  changeDetails = this.fb.group({
    statusInput: ['',Validators.required],
    projectInput: ['',Validators.required],
    descriptionInput: ['',Validators.required],
    mm_changes_id:['',Validators.required]
  });

  // Handle edit form
  changeEditAction(index:number){
    index = (index == 0 )?1:0;
    this.editActiveClassAction = this.defaultIcon[index].class;
    this.editActiveTitleAction = this.defaultIcon[index].title;
    this.editActiveIndex = index;
    this.disableInput = this.defaultIcon[index].disable;
    if(index == 1){
      this.changeDetails.controls.statusInput.enable();
      this.changeDetails.controls.projectInput.enable();
      this.changeDetails.controls.descriptionInput.enable();
    }else{
      // Call API to update change
      this.changesLogicService.editChange(JSON.stringify(this.changeDetails.value)).subscribe((data:any)=>{});
      this.changeDetails.controls.statusInput.disable();
      this.changeDetails.controls.projectInput.disable();
      this.changeDetails.controls.descriptionInput.disable();
    }

  }



  ngOnInit(): void {

    // Get project list
    this.changesLogicService.getProjectList().subscribe((response:any[])=>{
      if(response.length){
        for (let i = 0; i < response.length; i++) {
          this.projectList.push( response[i]);
        }
      }
    });

    this.route.paramMap.subscribe(params => {
      this.changeId = parseInt(params.get('id'));

      // Get all change details
      this.changesLogicService.getMargeById(this.changeId).subscribe((data:any)=>{

        if(data != null){
          this.description = data.mm_desc;
          this.projectName = data.mm_project.mm_project_name;
          this.changeStatusId = data.mm_states_id

          // Set default values from DB
          this.changeDetails.controls.statusInput.setValue(data.mm_states_id);
          this.changeDetails.controls.projectInput.setValue(data.mm_project_id);
          this.changeDetails.controls.descriptionInput.setValue(data.mm_desc);
          this.changeDetails.controls.mm_changes_id.setValue(this.changeId);

          // Disabled all the inputs by default
          this.changeDetails.controls.descriptionInput.disable();
          this.changeDetails.controls.statusInput.disable();
          this.changeDetails.controls.projectInput.disable();
        }
      });

      // Get open request per change
      this.changesLogicService.getRequestByMargeId(this.changeId).subscribe((data:any[])=>{

        if(data.length){
          this.showList = true
            for (var i=0; i<data.length;i++){
                data[i].fullUrl = data[i].mm_mrs_base_url.trim()+data[i].mm_mrs_group.trim()+'/'+data[i].mm_mrs_num;
                this.margeRequests.push(data[i]);
            }
          }
      });

      // Get status list
      this.changesLogicService.getStatusList().subscribe((data:any[])=>{
        this.statusList = data;
      });

    });
  }

  // Handle change status
 /* onStatusChange(event){

    this.changeStatusId = parseInt( event.target.value);
    let json = {
      mm_states_id:this.changeStatusId,
      mm_changes_id:this.changeId
    }
    this.changesLogicService.editChange(JSON.stringify(json)).subscribe((data:any)=>{});
  }*/

  // Create new request
  onSubmit(){

    if( !this.myForm.get('urlString').value || !this.isValidURL(this.myForm.get('urlString').value)){
      this.displayError = true;
      return false;
    }

    let fullUrl = this.myForm.get('urlString').value
    let splitUrl = fullUrl.split('/');
    let splitByDomain = fullUrl.split('nvidia.com');
    let  v = splitByDomain[1].slice(1,splitByDomain[1].length)

    let json =  {
      mm_changes_id:this.changeId,
      mm_mrs_base_url:'https://gitlab-master.nvidia.com/',
      mm_mrs_group:v.slice(0,v.lastIndexOf('/')).trim(),
      mm_mrs_num:parseInt(splitUrl[splitUrl.length-1]),
      mm_mrs_group_full_url:this.myForm.get('urlString').value.trim()
    }


    this.changesLogicService.addRequest(JSON.stringify(json)).subscribe((data:any)=>{

      // Hide error in case is active
      this.displayError = false;
      // Reset input field
      this.myForm.get('urlString').setValue('');
      // Close model
      document.getElementById('exampleModal').click();
      // Create new instance of request
      data.fullUrl = data.mm_mrs_base_url.trim()+data.mm_mrs_group.trim()+'/'+data.mm_mrs_num;
      this.margeRequests.push(data);
    });

  }

  onDeleteRequestAlert(requestId:number){
    this.requestId = requestId;
    ($('#confirmModal') as any).modal('show');
  }

  isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  // Delete request
  onDeleteChange(){

    // Get open request per change
    this.changesLogicService.deleteMmrById(this.requestId).subscribe((data:any[])=>{

      if(this.margeRequests.length){
        for (let i= 0 ; i< this.margeRequests.length;i++){
          if(this.margeRequests[i].mm_mrs_id == this.requestId){
            this.margeRequests.splice(i, 1);
          }
        }
      }
      document.getElementById('confirmModal').click();
    });

  }

  setIframe(url){
    this.iframeUel = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
