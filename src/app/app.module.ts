import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Include the components we created
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutUsModule } from './pages/about-us-module/aboutus.module'
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header-component/header.component';
import { FooterComponent } from './shared/footer-component/footer.component';
import { LoginbtnComponent } from './shared/loginbtn-component/loginbtn.component';

@NgModule({
  declarations: [
    AppComponent ,HeaderComponent, FooterComponent,LoginbtnComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AboutUsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
