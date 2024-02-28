import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url='http://localhost:5065/api/Task'

  constructor(private http: HttpClient) { }
  postData(data: any): Observable<any> {
    return this.http.post(this.url, data,
      );
  }
  getData(): Observable<any> {
    return this.http.get(this.url);
  }
  deleteData(Id:number):Observable<any>{
    return this.http.delete(`${this.url}${'/'}${Id}`)
  }
  updateData(Id:any,taskData:any):Observable<any>{
    return this.http.put(this.url,taskData,Id)
  }
}


