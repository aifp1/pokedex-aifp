import { Injectable } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    //Si se quiere ingresar de una manera controlada se implementa de esta forma con mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,
  ){
    this.defaultLimit = +this.configService.get<Number>('default_limit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (e) {
      this.handleExceptions(e);     
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 }= paginationDto 
    try {
      const pokemons = await this.pokemonModel.find().limit(limit).skip(offset).sort({
        no: 1
      }).select('-__v');
      return pokemons;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term});
    }

    //Verificacion por Mongo ID
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    //Verificacion por name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase().trim()});
    }

    if(!pokemon) throw new NotFoundException(`Pokemon With Id, Name or No "${term}" Not Found`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const updatePokemon = await this.findOne(term);
    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    //Si no se le pone el new: true entonces no actualiza los datos
    try {
      await updatePokemon.updateOne(updatePokemonDto, {new: true});
      return {...updatePokemon.toJSON(), ...updatePokemonDto};
    } catch (e) {
      this.handleExceptions(e); 
    }

  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return `This action removes a #${id} pokemon`;
    // const pokemon = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount, acknowledged} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0){
      throw new BadRequestException(`Pokemon with ID "${id}" not found`)
    }
    return `Delete Pokemon with ID "${id}" `;
  }

  private handleExceptions(e: any){
    if(e.code === 11000){
      throw new BadRequestException(`Pokemin exist in db ${JSON.stringify(e.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}
