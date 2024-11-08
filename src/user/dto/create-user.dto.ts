import { IsString,IsEmail, IsNotEmpty } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    readonly password!: string;
}
