import { ConfirmationResult, User } from "firebase/auth";


export interface UserStateType{
    user: User | null;
    isLoading: boolean;
    error: string | null;
    firebaseConfirmation : ConfirmationResult | null;
}

export type Action = any;
