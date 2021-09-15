import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ChangesLogicService} from  './changes-logic.service';
import {Changes} from "./changes.model";
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[ChangesLogicService]
})

export class MainPageComponent implements OnInit {

  @ViewChild(DataTableDirective) dtElement : DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  itemList:Changes[] = [];
  projectList = [{"mm_project_name":"Select Project","mm_project_id":""}];
  deleteId:number = 0;

  constructor(private changesLogicService:ChangesLogicService,private fb: FormBuilder,private http:HttpClient,private chRef:ChangeDetectorRef) {}

  myForm = this.fb.group({
    changeName: ['',Validators.required],
    projectName:['', Validators.required]
  });

  onChooseProject(e){
    this.myForm.get('projectName').setValue(e.target.value, {
      onlySelf: true
    });

  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.http.get<Changes[]>('https://bi-new.mellanox.com/mmrServer/getChangeList.php')
      .subscribe((data:any[]) => {

        if (data.length) {
          for (let i = 0; i < data.length; i++) {

            this.itemList.push( new Changes(
              data[i].mm_changes_id,
              data[i].mm_desc,
              data[i].mm_project_id,
              data[i].mm_states_id,
              data[i].mm_state.mm_states_name,
              data[i].mm_project.mm_project_name,
              data[i].createdAt,
              data[i].updatedAt,
            ));

          }
        }

        // Listen to any change
        this.chRef.detectChanges();

        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

    this.changesLogicService.getProjectList().subscribe((response:any[])=>{
        if(response.length){
          for (let i = 0; i < response.length; i++) {
            this.projectList.push( response[i]);
          }
        }

    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onSubmit(){

    if (!this.myForm.valid) {
      return false;
    } else {

        this.changesLogicService.addChange(JSON.stringify(this.myForm.value)).subscribe((data:any )=>{

          this.itemList.push( new Changes(
            data.mm_changes_id,
            data.mm_desc,
            data.mm_project_id,
            data.mm_states_id,
            '',
            '',
            data.createdAt,
            data.updatedAt
            /*data.mm_state.mm_states_name,
            data.mm_project.mm_project_name,
            data.createdAt,
            data.updatedAt*/
          ));

          // Reset to default form
          this.myForm.controls.projectName.patchValue(this.projectList[0].mm_project_id);
          this.myForm.controls.changeName.patchValue('');
          document.getElementById('exampleModal').click();
          // Render datatable with new inserted row
          this.rerender();
        });
    }

  }

  // Show Confirmation alert
  deleteChangeAlert(deleteId){
    this.deleteId = parseInt(deleteId);
    ($('#confirmModal') as any).modal('show');
  }

  onDeleteChange(){
      this.changesLogicService.deleteChangeById(this.deleteId).subscribe((data:any)=>{
        if (this.itemList.length){
          for (let i = 0 ; i< this.itemList.length;i++){
            if( this.itemList[i].changeId == this.deleteId ){
              this.itemList.splice(i, 1);
            }
          }
        }
        // Call API to remove item from DB
        this.rerender();
        document.getElementById('confirmModal').click();
      });
  }

  rerender(){
    this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
      // Destroy datatable
      dtInstance.destroy();
      // Call the datatable to render again
      this.dtTrigger.next();
    });
  }

}
