export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB || 'mongodb+srv://pokemondb_user:c6GkM2d9objMzAvV@cluster0.hk9ovgn.mongodb.net/?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    defaul_limit: +process.env.DEFAULT_LIMIT || 5,
})