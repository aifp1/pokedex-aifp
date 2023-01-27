import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//como se quiere que este sea un documento, se debe agregar extends ...
@Schema()
export class Pokemon extends Document{
    // id: string; //mongo me lo da
    @Prop({
        unique: true,
        index: true,
    })
    //De esta forma decimos que el nombre y numero debe ser unico y que debe tebner un indice
    name: string;
    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

//Con esto se exporta todas estas reglas que se definiran en la clase
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);