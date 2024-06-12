const { Logger } = require('../config');

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error(`Something Went Wrong with CRUD Repo : Create Logic -> ${error}`);
            throw error;
        }
    }

    async destroy(data){
        try {
            const response = await this.model.destroy(
                {
                    where: {
                        id: data
                    }
                }
            );
            return response;
        } catch (error) {
            Logger.error(`Something Went Wrong with CRUD Repo : Destroy Logic -> ${error}`);
        }
    }

    async get(data){
        try {
            const response = await this.model.findByPk(data)
            return response;
        } catch (error) {
            Logger.error(`Something Went Wrong with CRUD Repo : Get Logic -> ${error}`);
        }
    }

    async getAll(){
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error(`Something Went Wrong with CRUD Repo : GetAll Logic -> ${error}`);
        }
    }

    async update(data){ // data -> { id, data: {`field to change`: `new values`} };
        try {
            const response = await this.model.update(data.data, {
                where : {
                    id: data.id
                }
            });
            return response;
        } catch (error) {
            Logger.error(`Something Went Wrong with CRUD Repo : Update Logic -> ${error}`);
        }
    }
}

module.exports = CrudRepository;