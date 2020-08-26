import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YelpService {

  constructor(private http: HttpClient) {
  }

  getBusinessByItemNameAndCity() {
    return this.http.get(environment.ApiUrl+'getBusinessList').toPromise();
  }

  getBusinessReviewsById(id){
    return this.http.get(environment.ApiUrl+`getBusinessReview/${id}`).toPromise();
  }

}
