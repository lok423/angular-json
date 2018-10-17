import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import {GetJsonFileService} from '../services/get-json-file.service'
import {PageEvent, MatDialog, MatTableDataSource, MatPaginator} from '@angular/material';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';

@Component({
  selector: 'app-loading-json',
  templateUrl: './loading-json.component.html',
  styleUrls: ['./loading-json.component.css'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,

})
export class LoadingJsonComponent implements OnInit {

  data:Article[];
  // dataSource = new MatTableDataSource<Article>(this.data);
  dataSource :MatTableDataSource<Article>;

  displayedColumns: string[] = ['position','title','tags','category'];
  news:Article[];
  features:Article[];
  opinion:Article[];
  teaching:Article[];
  sectors:Article[];
  future:Article[];


  // @ViewChild('paginator')
  // private paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private getJsonService : GetJsonFileService,
    public dialog: MatDialog

    ) { }

  ngOnInit() {
    this.getJsonService.getJSON().subscribe(data => {
            let element: Article[]=data[0].concat(data[1],data[2],data[3],data[4],data[5]);
            console.log(element);
            
            for(var i=0;i<element.length;i++){
            element[i].id = i+1
            element[i].category = '';
            }
            this.data = element;
            this.dataSource = new MatTableDataSource<Article>(this.data);
            this.dataSource.paginator = this.paginator;
            console.log(this.dataSource);
        });
  }

  // ngAfterViewInit() {
  //   // this.dataSource.paginator = this.paginator;
  // }

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  openDialog(article_title, article_content): void {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      data: {
        content:article_content,
        title: article_title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

export interface Article {
  id: number;
  // keywords:string[];
  title: string;
  subtitle:string;
  content:string[];
  category: string;
  tags: string[];
}
