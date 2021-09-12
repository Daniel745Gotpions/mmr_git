import { Component, OnInit , ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ChangesLogicService} from  './changes-logic.service';
import {Changes} from "./changes.model";
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[ChangesLogicService]
})

export class MainPageComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  itemList:Changes[] = [];
  projectList = [];


  constructor(private changesLogicService:ChangesLogicService,private fb: FormBuilder,private http:HttpClient) {}

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
      pageLength: 25
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
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

    this.changesLogicService.getProjectList().subscribe((response:any[])=>{
        this.projectList = response;
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
        this.changesLogicService.addChange(JSON.stringify(this.myForm.value)).subscribe((data)=>{

              debugger;
        });
    }

  }


}
