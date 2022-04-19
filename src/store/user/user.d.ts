import { ConfirmationResult, UserCredential } from "firebase/auth";


export interface UserStateType{
    user: UserCredential | null;
    isLoading: boolean;
    error: string | null;
    firebaseConfirmation : ConfirmationResult | null;
}

export type Action = any;
