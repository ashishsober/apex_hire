import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import { UserService } from './user.service';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {

    constructor(private userService: UserService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (currentUser) => {
                if (Object.keys(currentUser).length != 0) {
                    console.log(`inside the isauthenticated subscriber ----${currentUser.emails[0].value}`);
                    this.show(currentUser.emails[0].value)
                } else {
                    this.viewContainer.clear();
                }
            })
    }

    show(currentUserEmail: string) {
        if (currentUserEmail === 'ashishguptawaiting@gmail.com' || currentUserEmail === 'vivek.rai@gmail.com' 
    || currentUserEmail === 'hr@vrdnetwork.com') {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}