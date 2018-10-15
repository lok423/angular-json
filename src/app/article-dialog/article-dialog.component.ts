import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare let $:any; // declare jquery

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.css']
})


export class ArticleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ArticleData) { }

  ngOnInit() {
    console.log(this.data);
    var html = this.loadhtml(this.data);
    $("#main-content").html(html);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadhtml(data){
    var html ="";
    for(var i=0;i<data.content.length;i++){
      html += "<p>" + data.content[i] + "</p>";
    }
    return html;
  }
}

export interface ArticleData {
  content: string[];
  title: string;
}
