export interface Repair {
    id: number;
    repairType: string;
    shortDescription: string;
    submissionDate: number;
    description: string;
    proposedStartDate: number;
    proposedEndDate: number;
    proposedCost: number;
    acceptanceStatus: boolean;
    repairStatus: string;
    actualStartDate: number;
    actualEndDate: number;
    property: Property;
    deleted: boolean;
  }
  
  export interface Property {
    id: number;
    e9: string;
    propertyAddress: string;
    constructionYear: number;
    propertyType: string;
    owner: Owner;
    deleted: boolean;
  }
  
  export interface Owner {
    id: number;
    vat: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    role: string;
    deleted: boolean;
  }
  