export interface UserType{
    id:number;
    phoneNumber:string;
    token:string;
}

export interface UserStateType{
    user: UserType | null;
    loading: boolean;
    error: string | null;
    
}

export type Action = any;
