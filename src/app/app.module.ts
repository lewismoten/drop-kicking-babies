import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DropKickComponent } from './drop-kick/drop-kick.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: DropKickComponent },
      { path: 'drop-kicking-babies', component: DropKickComponent },
      { path: 'docs', component: DropKickComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    DropKickComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }