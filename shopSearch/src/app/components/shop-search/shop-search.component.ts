import { Component, OnInit } from '@angular/core';
import { YelpService } from './yelp.service';

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.css']
})
export class ShopSearchComponent implements OnInit {

  public cityName:string = 'alpharetta';
  public itemName:string = 'icecream';
  public shopList:any;
  public shop:any;
  public reviewList:any;

  constructor(private yelp:YelpService) { }

  ngOnInit() {
    this.getBusinessList();
  }

  public getBusinessList(){
    this.yelp.getBusinessByItemNameAndCity()
    .then(res => {
      let data:any = res;
      this.shopList = data.businesses.slice(0,5);
      if(this.shopList.length > 0) this.showDetails(this.shopList[0]);
    })
    .catch(err => 
      console.error("error : ",err))
  }

  public showDetails(shop){
    this.shop = shop;
    this.loadReviews();
  }

  public getLocation(location){
    return [location.address1,location.address2,location.address3,location.city,location.state,location.zip_code].join(' ').replace('  ',' ');
  }

  public loadReviews(){
    this.yelp.getBusinessReviewsById(this.shop.id).then(res => {
      let data:any = res;
      this.reviewList = data.reviews;
    })
  }
}
