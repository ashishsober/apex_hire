export interface careerResponse {
    applicants: {
        firstname: string,
        lastname: string,
        address: string,
        city: string,
        state: string,
        zipcode: number,
        phone_no: number,
        email: string,
        currentLocation: string,
        gender: string,
        currentEmpName: string,
        jobTitle: string,
        nightShift: string,
        totalExp: string,
        keySkills: string,
        references: string,
        vrd_ref_number: string
    },
    application: {
        message: string,
        response_type: string,
        response_action: string,
        stage: string
    }
}

export class carrerModal {
    constructor(
        public firstname: string,
        public lastname: string,
        public address: string,
        public city: string,
        public state: string,
        public zipcode: number,
        public phone_no: number,
        public email: string,
        public currentLocation: string,
        public gender: string,
        public currentEmpName: string,
        public jobTitle: string,
        public nightShift: string,
        public totalExp: string,
        public keySkills: string,
        public references: string,
        public vrd_ref_number: string
    ) { }
}
