import { IsString,IsEmail, IsNotEmpty, IsNumber, IsInt } from "class-validator";
import { Transform } from "class-transformer";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly name!:string;
    
    @IsString()
    @IsNotEmpty()
    readonly familyName!:string;

    @IsString()
    @IsNotEmpty()
    readonly position?:string;

    @IsString()
    @IsNotEmpty()
    readonly salaire?:string;

    @IsEmail()
    @IsNotEmpty()
    readonly email!:string;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @IsNotEmpty()
    readonly age!:number;

    @IsString()
    @IsNotEmpty()
    readonly password!: string;
}
