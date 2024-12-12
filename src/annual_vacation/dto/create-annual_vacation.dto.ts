import { IsString,IsEmail,IsDate, IsNotEmpty, IsNumber,IsMongoId, IsInt } from "class-validator";
import { Types } from "mongoose";
export class CreateAnnualVacationDto {

    @IsMongoId()
    @IsNotEmpty()
    User_id_ref!: Types.ObjectId;


    @IsString()
    @IsNotEmpty()
    readonly demande_Status!: string;
    
    @IsDate()
    readonly Start_date!:Date;

    @IsDate()
    readonly End_date!:Date;

    @IsNumber()
    @IsNotEmpty()
    readonly Remainain_day!:number;
    
}
