import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { EditComponent } from './pages/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
