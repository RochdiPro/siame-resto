import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {ConfigComponent} from './config/config.component';
 
const routes: Routes = [
   { path: '', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) }, 
  { path: 'connexion', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },
   { path: 'config', component: ConfigComponent },
  
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
