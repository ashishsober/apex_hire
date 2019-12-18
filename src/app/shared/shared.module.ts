import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppMaterialModule } from './app.material.module';
import { RouterModule } from '@angular/router';
import { AlertDialogComponent } from '../modals/alert-dialog/alert-dialog.component';
import { UserInfoModalComponent } from '../modals/user-info-modal/user-info-modal.component'
import { TokenService } from './token.service';
import { ShowAuthedDirective } from './show-authed.directive';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpTokenInterceptor } from '../core/interceptors/token.interceptor';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AppMaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AppMaterialModule,
        ShowAuthedDirective,
        ReactiveFormsModule
    ],
    declarations: [
        AlertDialogComponent,
        UserInfoModalComponent,
        ShowAuthedDirective],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        TokenService
    ],//services to inject,
    entryComponents: [AlertDialogComponent, UserInfoModalComponent]
})
export class SharedModule { }