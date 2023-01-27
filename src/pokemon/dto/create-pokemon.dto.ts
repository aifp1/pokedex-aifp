import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    //Requerimientos: isString, Minlenght 1
    @IsString()
    @MinLength(1)
    name: string;

    //Requerimientos: isInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    readonly no: number;
}
