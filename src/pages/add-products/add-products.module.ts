import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductsPage } from './add-products';

@NgModule({
  declarations: [
    AddProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductsPage),
  ],
})
export class AddProductsPageModule {}
