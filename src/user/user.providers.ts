import { Connection } from "mongoose";
import { userScehma } from "../schemas/user.schema";
export const userProvides=[
    {
        provide:'User_Model',
        useFactory: (connection: Connection) => connection.model('User', userScehma),
        inject: ['DATABASE_CONNECTION'],




    }
]
