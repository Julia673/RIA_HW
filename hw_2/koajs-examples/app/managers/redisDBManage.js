"use strict";
const config = require('config');
const redis = require('redis');
const { promisify } = require('util');


const redisClient = redis.createClient(config.redis.port, config.redis.host, {});
redisClient.on("error", function(error) {
    console.error(error);
});
const getKeys = promisify(redisClient.keys).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const dellAsync = promisify(redisClient.del).bind(redisClient);

module.exports = {
    /**
     * * Get all records from memory DB
     * @return {Promise}
     */
    getAll: async function getAllFromDb() {
        let response = [] ;
        try {
            let keys = await getKeys('*')
            for(let i = 0; i < keys.length; i++) {
                let data = await getAsync(Number(keys[i]))
                response.push({id: keys[i],name: data });
            }
        } catch (e) {
            console.log('getFromRedis err---->', e);
        }
        return response;
    },
    /**
     * Get record by id from memory DB
     * @param id
     * @return {Promise}
     */
    getById: async function getIdFromDb(id) {
        let response = 0;
        try {
            if (id) {
                response = await getAsync(id);
            }
        } catch (e) {
            console.log('getFromRedis err---->', e);
        }
        if(response){
            return {id: id, name: response}
        }
    },
    /**
     * Add new record to memory DB
     * @param name
     * @return {Promise}
     */
    setNewId: async function setNewIdToDb(id,name) {
        let response = null;
        try {
            if (id) {
                response = setAsync(id, name);
            }
        } catch (e) {
            console.log('sendToRedis err--->', e);
        }
        if(response){
            return {id: id, name: name}
        }
    },
    /**
     * Update record into memory DB
     * @param id
     * @param name
     * @return {Promise}
     */
    updateId: async function updateIdToDb(id, name) {

        let response = null;
        try {
            if (id) {
                response = setAsync(id, name);
            }
        } catch (e) {
            console.log('sendToRedis err--->', e);
        }
        if(response){
            return {id: id, name: name}
        }
    },
    /**
     * Remove record from memory DB
     * @param id
     * @return {Promise}
     */
    removeId: function removeIdInDb(id) {
        let response = null;
        try {
            if (id) {
                response = dellAsync(id);
            }
        } catch (e) {
            console.log('delKeyFromRedis err--->', e);
        }
        return response;
    }
};