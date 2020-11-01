export interface Employment {
    sortOrder: number;
    company: string;
    title: string;
    salaryLevel: number;
}

export interface Education {
    sortOrder: number;
    name: string;
    level: string;
    school: string;
}

export interface Profile {
    isActive: boolean;
    registeredAt: string;
    updatedAt: string;
    isAdmin: boolean;
    birthYear: number;
    gender: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    zipCode: string;
    city: string;
    country: string;
    currentOccupation: string;
    employments: Employment[];
    educations: Education[];
    prefLang: string;
}
