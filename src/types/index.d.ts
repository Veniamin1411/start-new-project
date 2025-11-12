import { UserAccountDBType } from "../repositories/db-types.ts";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserAccountDBType | null
        }
    }
}