import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../user/guard/auth.guard';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingsComponent } from './listings/listings.component';

const routes: Routes = [
  {
    path: "",
    component: ListingsComponent
  },
  {
    path: "add-listing",
    component: AddListingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ":id",
    component: ListingDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule { }
