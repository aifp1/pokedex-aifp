import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  constructor(
    //Si se quiere ingresar de una manera controlada se implementa de esta forma con mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
    //Si deseamos usar otro adaptador lo creamos y le implementamos el httpAdapter
  ){}
  
  async executeSeed(){
    // const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    let pokemonsDB= [];
    data.results.forEach(({name, url}) =>{
      const segments = url.split('/');
      const no: number = +segments[segments.length-2];
      pokemonsDB.push({name, no});
    })
    await this.pokemonModel.create(pokemonsDB);
    return 'Seed execute'
  }

}
