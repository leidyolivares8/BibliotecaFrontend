/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UsuariosComponent } from './containers/usuarios/usuarios.component';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      AppCommonModule,
      NavigationModule
  ]
})
export class UsuariosModule { }
