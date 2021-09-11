import { Component, OnInit , ViewChild} from '@angular/core';

import {ChangesLogicService} from  './changes-logic.service';
import {Changes} from "./changes.model";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[ChangesLogicService]
})

export class MainPageComponent implements OnInit {

  itemList:Changes[] = [];
  searchFilter:string = '';
  pageNumber:number = 1;

  constructor(private changesLogicService:ChangesLogicService) {}

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
  }

  key:string = 'description';
  reverse:boolean = true;

  sort(sortIdentifier){

    this.key = sortIdentifier;
    this.reverse = !this.reverse;

  }

}
