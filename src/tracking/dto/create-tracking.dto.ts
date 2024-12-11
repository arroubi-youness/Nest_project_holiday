import { IsString,IsEmail, IsNotEmpty, IsNumber, IsInt,IsMongoId,IsDate  } from "class-validator";
// import { Transform } from "class-transformer";
import {  Types } from "mongoose";


export class CreateTrackingDto {
    @IsMongoId()
    @IsNotEmpty()
    User_id_ref!: Types.ObjectId;

    @IsDate()
     readonly check_in_date?:Date | undefined;;


    @IsDate()
     readonly check_out_date?:Date | undefined;;

    @IsNumber()
    @IsNotEmpty()
    readonly diffrence?:number;

    @IsString()
    @IsNotEmpty()
    readonly Status!:string;

    @IsString()
     readonly abscent_status?:string;


}
