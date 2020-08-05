export class FeedbackData {
    constructor(
        public nameF: string,
        public emailF: string,
        public msgF: string
    ) {}
}

export class LoginData {
    constructor(
        public userName: string,
        public password: string
    ) {}
}

export class LoginResponse {
    constructor(        
        public userName: string,
        public f_name: string,
        public m_name: string,
        public l_name: string,
        public b_group: string,
        public dob: string,
        public gender: string,
        public phone: string,
        public email: string,
        public thana: string,
        public district: string,
        public pin: string,
        public photo: string
    ) {}
}

export class ListFir {
    constructor(
        public ref_id: string,
        public de_date_time: string,
        public de_status: string
    ) {}
}

export class FullDataReceived {
    constructor(
        public de_date_time: string,
        public de_ip_address: string,
        public de_officer: string,
        public de_officer_id: string,
        public de_officer_sign: string,
        public de_reject_reason: string,
        public de_sign: string,
        public de_status: string,
        public de_thana: string,
        public doc_name: string,
        public doc_fname: string,
        public doc_dob: string,
        public doc_nationality: string,
        public doc_idcard: string,
        public doc_idno: string,
        public doc_address: string,
        public doc_district: string,
        public doc_pin: string,
        public doc_occupation: string,
        public doc_phone: string,
        public doi_desc: string,
        public doi_sdate: string,
        public doi_edate: string,
        public doi_stime: string,
        public doi_etime: string,
        public doi_address: string,
        public doi_district: string,
        public doi_pin: string,
        public doi_reason: string,
        public dos: {
            dos_name: string,
            dos_rname: string,
            dos_address: string,
            dos_district: string,
            dos_pin: string,
        }[],
        public dow: {
            dow_name: string,
            dow_phone: string,
            dow_address: string,
            dow_district: string,
            dow_pin: string,
        }[],
        public ref_id: string
    ) {}
}