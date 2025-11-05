import { UserDBType } from "../repositories/types.ts";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDBType | null
        }
    }
}