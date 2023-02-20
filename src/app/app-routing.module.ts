import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes=[
  {path:'home', component: HomeComponent},
  {path:'edit/:id', component: EditComponent},
  {path:'', redirectTo:'/home',pathMatch:'full'},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
