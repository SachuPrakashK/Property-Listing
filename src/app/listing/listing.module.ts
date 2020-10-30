import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingsComponent } from './listings/listings.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddListingComponent, ListingDetailComponent, ListingsComponent],
  imports: [
    CommonModule,
    ListingRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ListingModule { }
