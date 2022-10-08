import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import ExampleClient from "../api/exampleClient";
import ArtClient from "../api/artClient";

/**
 * Logic needed for the view playlist page of the website.
 */
class ArtPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGet', 'onCreate', 'renderExample'], this);
        this.dataStore = new DataStore();
    }

    /**
     * Once the page has loaded, set up the event handlers and fetch the concert list.
     */
    async mount() {
        document.getElementById('add-art-form').addEventListener('submit', this.onGet);
        document.getElementById('add-art-form').addEventListener('submit', this.onCreate);
        this.client = new ArtClient();

        this.dataStore.addChangeListener(this.renderExample)
    }

    // Render Methods --------------------------------------------------------------------------------------------------

    async renderExample() {
        let resultArea = document.getElementById("result-info");

        const art = this.dataStore.get("art");

        if (art) {
            resultArea.innerHTML = `
                <div>ID: ${art.id}</div>
                <div>Name: ${art.name}</div>
            `
        } else {
            resultArea.innerHTML = "No Item";
        }
    }

    // Event Handlers --------------------------------------------------------------------------------------------------

    async onGet(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();

        let artId = document.getElementById("artId-field").value;
        this.dataStore.set("art", null);

        let result = await this.client.getArtByArtId(artId, this.errorHandler);
        this.dataStore.set("art", result);
        if (result) {
            this.showMessage(`Got ${result.name}!`)
        } else {
            this.errorHandler("Error doing GET!  Try again...");
        }
    }

    async onCreate(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();
        this.dataStore.set("Art", null);

        let name = document.getElementById("name").value;
        let artistName = document.getElementById("artistName").value;
        let type = document.getElementById("type").value;
        let humiditySensitive = document.getElementById("humiditySensitive").value;
        let locationId = document.getElementById("locationId").value;
        let price = document.getElementById("price").value;

        const createdExample = await this.client.addArt(name, artistName, type, humiditySensitive, locationId, price, this.errorHandler);
        this.dataStore.set("Art", createdExample);

        if (createdExample) {
            this.showMessage(` ${createdExample.name}!`)
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const examplePage = new ArtPage();
    examplePage.mount();
};

window.addEventListener('DOMContentLoaded', main);
