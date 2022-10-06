import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import storageUnitClient from "../api/storageUnitClient";

class StorageUnitPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onCreateStorageUnit', 'renderStorageUnits'], this);
        this.dataStore = new DataStore();
    }

    async mount() {
        document.getElementById("create-storage-unit").addEventListener('submit', this.onCreateStorageUnit);
        this.client = new storageUnitClient();

        this.dataStore.addChangeListener(this.renderStorageUnits)

    }
    /** Render Methods -----------------------------------------------------------------------------------------------*/
    async renderStorageUnits() {
        let resultArea = document.getElementById("result-info");

        const storageUnit = this.dataStore.get("storageUnit");

        if (storageUnit) {
            resultArea.innerHTML = `
                <div>ID: ${storageUnit.id}</div>
                <div>ArtType: ${storageUnit.artType}</div>
                <div>HumiditySensitive: ${storageUnit.humiditySensitive}</div>
                <div>AmountOfArtStored: ${storageUnit.amountOfArtStored}</div>
            `
        } else {
            resultArea.innerHTML = "No Storage Units";
        }
    }

    /** Event Handlers -----------------------------------------------------------------------------------------------*/

    async onCreateStorageUnit(event) {
        event.preventDefault();
        this.dataStore.set("storageUnit", null);

        let artType = document.getElementById("art-type").value;
        let humiditySensitive = document.getElementById("humidity-sensitive").value;
        let amountOfArtStored = document.getElementById("amount-of-art-stored").value

        const createdStorageUnit = await  this.client.createStorageUnit(artType, humiditySensitive, amountOfArtStored, this.errorHandler);
        this.dataStore.set("storageUnit", createdStorageUnit);

        if (createdStorageUnit) {
            this.showMessage('Created a new storage unit.')
        } else {
            this.errorHandler("Error creating!  Try again...");
        }
    }
}

const main = async  => {
    const storageUnitPage = new StorageUnitPage();
    storageUnitPage.mount();
};

window.addEventListener('DOMContentLoaded', main);