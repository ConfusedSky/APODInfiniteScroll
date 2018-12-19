import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnlimitedPhotoCollageComponent } from './collage/collage.component';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { HttpClientModule } from "@angular/common/http";
import { SafeUrlPipe } from './shared/safe-url.pipe';

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    UnlimitedPhotoCollageComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
