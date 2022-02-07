/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { LibrosModule } from './libros.module';

/* Containers */
import * as librosContainers from './containers';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
  {
      path: '',
      canActivate: [],
      component: librosContainers.LibrosComponent,
      data: {
          title: 'Libros - Libreria',
          breadcrumbs: [
              {
                  text: 'Libros',
                  link: '/Libros',
              }
          ],
      } as SBRouteData,
  },
];

@NgModule({
  imports: [LibrosModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class LibrosRoutingModule { }
