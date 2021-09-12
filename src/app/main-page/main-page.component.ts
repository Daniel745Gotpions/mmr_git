import { Component, OnInit , ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ChangesLogicService} from  './changes-logic.service';
import {Changes} from "./changes.model";
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[ChangesLogicService]
})

export class MainPageComponent implements OnInit {

  itemList:Changes[] = [];
  projectList = [];
  searchFilter:string = '';
  pageNumber:number = 1;

  constructor(private changesLogicService:ChangesLogicService,private fb: FormBuilder) {}

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

    this.changesLogicService.getItems().subscribe((data :any[])=>{

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
    });

    this.changesLogicService.getProjectList().subscribe((response:any[])=>{
        debugger;
    });

  }
  openPopUp(){
    debugger
  }

  key:string = 'description';
  reverse:boolean = true;

  sort(sortIdentifier){
    this.key = sortIdentifier;
    this.reverse = !this.reverse;
  }

  onSubmit(){
    
    if (!this.myForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.myForm.value));
    }

  }


}
