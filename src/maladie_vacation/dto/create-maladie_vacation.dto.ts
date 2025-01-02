import { IsDate, IsNotEmpty,IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";
 export class CreateMaladieVacationDto {

        @IsMongoId()
        @IsNotEmpty()
        User_id_ref!: string;

        readonly Certificate_medical!: Buffer;

        @IsString()
        @IsNotEmpty()
        readonly demande_Status!: string;
        @IsString()
        readonly Start_date!:string;

        @IsString()
        readonly End_date!:string;

}
