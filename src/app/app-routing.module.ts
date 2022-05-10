import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkComponent } from './work/work.component';
import {ConfigComponent} from './config/config.component';
import { MenuComponent } from './menu/menu.component';
import { Work2Component } from './work2/work2.component';
import { Config2Component } from './config2/config2.component';
const routes: Routes = [
   { path: '', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },

  { path: 'connexion', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },
  { path: 'work', component: WorkComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'work2', component: Work2Component },
  { path: 'config2', component: Config2Component },
  { path: 'menu', component: MenuComponent },
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
