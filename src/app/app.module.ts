import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { AssessmentsComponent } from './assessments/assessments.component';
import { DataPipe } from './data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AssessmentsComponent,
    DataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
