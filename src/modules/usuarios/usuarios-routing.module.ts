/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { UsuariosModule } from './usuarios.module';

/* Containers */
import * as usuariosContainers from './containers';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
  {
      path: '',
      canActivate: [],
      component: usuariosContainers.UsuariosComponent,
      data: {
          title: 'Usuarios - Libreria',
          breadcrumbs: [
              {
                  text: 'Libros',
                  link: '/libros',
              },
              {
                  text: 'Usuarios',
                  active: true,
              },
          ],
      } as SBRouteData,
  },
];

@NgModule({
    imports: [UsuariosModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule { }
