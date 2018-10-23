import { Component, OnInit } from '@angular/core';
import {GetJsonFileService} from '../services/get-json-file.service'
import { ConfigService } from './configuration.service';
import { Event } from '../models/event.enum';

@Component({
  selector: 'app-easy-table',
  templateUrl: './easy-table.component.html',
  styleUrls: ['./easy-table.component.css']
})
export class EasyTableComponent implements OnInit {
  
  columns = [
    { key: 'date', title: 'Date' },
    { key: 'title', title: 'Title' },
    { key: 'desc', title: 'Description' },
    { key: 'mainContent', title: 'Main Content' },
    { key: 'tags', title: 'Tags' },
    { key: 'category', title: 'Category' },
    { key: 'subCategory', title: 'Sub-Category' },
    { key: 'weighty', title: 'Weighty' },
    { key: 'type', title: 'Type' }
  ];
  configuration;
  selected_data = [];
  raw_data =[];
  selected = '0';

  // ];
  constructor(    private getJsonService : GetJsonFileService
    ) { }

  ngOnInit() {
    this.configuration = ConfigService.config;
    this.getJsonService.getJSON().subscribe(data => {
      data.forEach(category => {
        category.forEach(article => {
          var date = Date.parse(article.date);
          article.date = date;
        });
      });
      this.raw_data = data;
      this.selected_data = data[0];
      console.log(data);
  });
  }

  changeData(selected){
    this.selected_data = this.raw_data[selected];
    console.log(this.selected_data);
  }


  // sortByLevel(asc: boolean): void {
  //   this.data = [...this.data.sort((a, b) => {
  //     const levelA = this.levels[a.level];
  //     const levelB = this.levels[b.level];
  //     if (levelA < levelB) {
  //       return asc ? -1 : 1;
  //     }
  //     if (levelA > levelB) {
  //       return asc ? 1 : -1;
  //     }
  //     return 0;
  //   })];
  // }

  // eventEmitted($event) {
  //   if ($event.event === Event.onOrder) {
  //     console.log($event)
  //     if ($event.value.key === 'date') {
  //       // this.sortByLevel($event.value.order === 'asc');
  //     } else if ($event.value.key === 'name') {
  //       // this.sortByLastName($event.value.order === 'asc');
  //     }
  //   }
  // }

}
