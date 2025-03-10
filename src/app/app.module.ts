import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppComponent, 
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }