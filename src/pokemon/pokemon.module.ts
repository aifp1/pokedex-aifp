import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    //No es forRoot poorque solo hay un root en la aplicacion, son utilizados por si se quiere traer la configuracion de otros lados
    //y esta no se levante hasta obtener esos requerimientos
    MongooseModule.forFeature([
      {
        //El name es de la extension del documento
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  exports: [
    // PokemonService,
    MongooseModule
  ]
})
export class PokemonModule {}
