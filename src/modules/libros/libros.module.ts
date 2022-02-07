/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { LibrosComponent } from './containers/libros/libros.component';
import { TablesModule } from '@modules/tables/tables.module';
import { LibrosTableComponent } from "@modules/libros/components/libros-table/libros-table.component"

/* Services */
import * as libroServices from './services';

@NgModule({
  declarations: [LibrosComponent, LibrosTableComponent],
  imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      AppCommonModule,
      NavigationModule,
      TablesModule
  ],
  providers: [...libroServices.services],
})
export class LibrosModule { }
