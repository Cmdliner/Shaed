export interface IFetchData {
    errMssg?: string;
    authenticated?: boolean;
    /* Room data */
    rooms?: any[];
    currentUser?: string;
    mssg?: string;
    username?: string;
    room_name: string;
    messages?: any[];
    host?: string[];
    participants?: any[];
    createdAt?: Date;
}

export interface IFetchProps {
    fetchUri: string;
    fetchOptions: RequestInit;
}