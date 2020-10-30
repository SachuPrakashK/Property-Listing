import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingService } from '../service/listing.service';
import { Listing } from '../model/listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings$: Observable<Listing[]>

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.listings$ = this.listingService.getListings();
  }

}

