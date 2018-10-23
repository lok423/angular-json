import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {
    serverUrl = "http://localhost:4000/api/preparedata/"
    

constructor(private http: HttpClient,

    ) {
        // this.getJSON().subscribe(data => {
        //     console.log(data)
        // });
    }

    sendEditedData (data): Observable<any> {
        return this.http.post<any>(this.serverUrl, data, httpOptions)
        //   .pipe(
        //     catchError(err => console.log(err.statusText)))
        //   );
      }

    // handleHttpError(error: HttpErrorResponse):Observable<any>{
        
    // }
    getData(category):Observable<any> {
      return this.http.get<any>(this.serverUrl + category);
    }

}
