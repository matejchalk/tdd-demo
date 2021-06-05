import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PollV1Component } from './components/poll-v1/poll-v1.component';
import { PollV2Component } from './components/poll-v2/poll-v2.component';
import { PollV3Component } from './components/poll-v3/poll-v3.component';
import { effects, reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    PollV1Component,
    PollV2Component,
    PollV3Component,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
