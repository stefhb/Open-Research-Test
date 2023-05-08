export interface CompanyRaw {
    id: string;
    name: string;
}

export interface Company {
    name: string;
    items: Department[];
}

export interface Department {
    name: string;
    items: Item[];
}

export interface Item {
    id: string;
    name: string;
}


export interface CompanyTemp {
    name: string;
    items: any;
}