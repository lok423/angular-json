import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetJsonFileService {


constructor(private http: HttpClient) {
        // this.getJSON().subscribe(data => {
        //     console.log(data)
        // });
    }

    public getJSON(): Observable<any> {
        console.log("hello");

        return this.http.get("./assets/demofile.json")
    }

}
