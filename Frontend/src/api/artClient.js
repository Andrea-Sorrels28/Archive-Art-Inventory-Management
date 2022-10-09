import BaseClass from "../util/baseClass";
import axios from 'axios'

/**
 * Client to call the MusicPlaylistService.
 *
 * This could be a great place to explore Mixins. Currently the client is being loaded multiple times on each page,
 * which we could avoid using inheritance or Mixins.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
 * https://javascript.info/mixins
 */
export default class ArtClient extends BaseClass {

    constructor(props = {}){
        super();
        const methodsToBind = ['clientLoaded', 'getAllArt', 'getArtByArtId', 'addArt'];
        this.bindClassMethods(methodsToBind, this);
        this.props = props;
        this.clientLoaded(axios);
    }

    /**
     * Run any functions that are supposed to be called once the client has loaded successfully.
     * @param client The client that has been successfully loaded.
     */
    clientLoaded(client) {
        this.client = client;
        if (this.props.hasOwnProperty("onReady")){
            this.props.onReady();
        }
    }

    /**
     * Get all concerts
     * @param errorCallback (Optional) A function to execute if the call fails.
     * @returns an array of concerts
     */
    async getAllArt(errorCallback) {
        try {
            const response = await this.client.get(`/Art`);
            return response.data;
        } catch(error) {
            this.handleError("getAllArt", error, errorCallback);
        }
    }

    /**
     * Gets the concert for the given ID.
     * @param artId Unique identifier for a concert
     * @param errorCallback (Optional) A function to execute if the call fails.
     * @returns The concert
     */
    async getArtByArtId(artId, errorCallback) {
        try {
            const response = await this.client.get(`/Art/${artId}`);
            return response.data;
        } catch (error) {
            this.handleError("getArtByArtId", error, errorCallback)
        }
    }

    async addArt(name, artistName, type, humiditySensitive, locationId, price, errorCallback) {
        try {
            const response = await this.client.post(`/Art`, {
                "name": name,
                "artistName" : artistName,
                "type" : type,
                "humiditySensitive" : Boolean(humiditySensitive),
                "locationId" : locationId,
                "price" : price,
            });
            return response.data;
        } catch (error) {
            this.handleError("addArt", error, errorCallback);
        }
    }

    handleError(method, error, errorCallback) {
        console.error(method + " failed - " + error);
        if (error.response.data.message !== undefined) {
            console.error(error.response.data.message);
        }
        if (errorCallback) {
            errorCallback(method + " failed - " + error);
        }
    }
}
