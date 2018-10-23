import { Component, OnInit,ViewChild } from '@angular/core';
import { GetJsonFileService } from '../services/get-json-file.service'
import { CdkFooterRowDefBase } from '@angular/cdk/table';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';
import {PageEvent, MatDialog, MatTableDataSource, MatPaginator} from '@angular/material';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {UpdateDataService} from '../services/update-data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  selected_data = [];
  raw_data = [];
  selected_menu = '0';
  editing = {};
  menu = {
    0: {name:"News",value:"news"},
    1: {name:"Features",value:"features"},
    2: {name:"Opinion",value:"opinion"},
    3: {name:"Teaching & Learning",value:"teaching"},
    4: {name:"Sectors",value:"sectors"},
    5: {name:"Future",value:"future"},
  }
  selected =[];
  temp = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  weighty_list = [0,1,2,3,4,5,6,7,8,9];
  mainCategory_list = ["Study resources","Education and learning theories","Education inspiration and motivation","School news","Curriculum news","Other"];
  subCategory_list = {"Study resources":["","Maths","Natural Science","Social Sciences","Languages"]};
  @ViewChild(DatatableComponent) table: DatatableComponent;
  loading = true;

  constructor(private getJsonService: GetJsonFileService,
    public dialog: MatDialog,
    private dataService : UpdateDataService
  ) { }

  ngOnInit() {
    this.dataService.getData(this.menu[this.selected_menu].value).subscribe(data=>{
      console.log(data);
      this.selected_data = data;
      this.temp = [...this.selected_data];
      this.loading =false;

    });
    // this.getJsonService.getJSON().subscribe(data => {
    //   data.forEach(category => {
    //     category.forEach(article => {
    //       var date = Date.parse(article.date);
    //       article.date = date;
    //     });
    //   });
    //   this.raw_data = data;
    //   this.selected_data = data[0];
    //   this.temp = [...this.selected_data];
    //   // console.log(data);
    // });
  }

  updateValue(event, cell, rowIndex) {
    console.log(cell);
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.selected_data[rowIndex][cell] = event.target.value;
    this.selected_data = [...this.selected_data];
    console.log('UPDATED!', this.selected_data[rowIndex][cell]);
  }

  updateArrayValue(event, cell, rowIndex) {
    console.log(cell);
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    // console.log(event.target.value.split(','));
    var tags = event.target.value.split(',');
    this.selected_data[rowIndex][cell] = tags;
    this.selected_data = [...this.selected_data];
    console.log('UPDATED!', this.selected_data[rowIndex][cell]);
  }

  changeData(selected_menu) {
    // this.selected_data = this.raw_data[selected_menu];
    // this.temp = [...this.selected_data];
    // console.log(this.selected_data);
    this.selected_data = [];
    console.log(this.menu[selected_menu]);
    this.loading = true;
    this.dataService.getData(this.menu[selected_menu].value).subscribe(data=>{
      console.log(data);
      this.selected_data = data;
      this.temp = [...this.selected_data];
      this.loading=false;
    });
    

  }

  openDialog(article_title, article_content, event, cell, rowIndex): void {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      data: {
        content:article_content,
        title: article_title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editing[rowIndex + '-' + cell] = false;
      console.log('The dialog was closed');
    });
  }
  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.selected_data = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateLimit(size) {
    console.log(size);
    this.table.limit = size;
    this.table.recalculatePages();
  }

  onSubmit(){
    var data = Array.from(this.table.bodyComponent.rowIndexes.keys());
    console.log(data);
    for(var i=0;i<data.length;i++){
      var id = data[i]['_id'];
      var date:Date = data[i]['date'];
      data[i]['originalDate'] = date;
      data[i]['refId'] = id;
      data[i]['categorize']=true;
      delete data[i]['date'];
      delete data[i]['_id'];
      delete data[i]['__v'];
      delete data[i]['precategory'];
    }

    console.log(data);
    this.dataService.sendEditedData(data).subscribe(
      (res) => console.log(res),
      (err:any)=> console.log(err),
      ()=>console.log("finish upload")
      );
  }

  // onKeydown(event) {
  //   if (event.key === "Enter") {
  //     console.log(event);
  //   }
  // }

  


}

