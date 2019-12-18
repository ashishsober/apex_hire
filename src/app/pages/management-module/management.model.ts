export class managementModal {
    constructor(
        public name: string,
        public emailid: string,
        public position: string,
        public profileImage: string,
        public discription: string,
        public _id: string
    ) { }
}

export interface management {
    name: string;
    emailid: string;
    position: string;
    profileImage: string;
    discription: string;
    _id: string;
}