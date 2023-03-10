import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import storageUnitClient from "../api/storageUnitClient";

class StorageUnitPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onCreateStorageUnit','onGetById','onGetAllUnits', 'onDeletedById', 'renderStorageUnits'], this);
        this.dataStore = new DataStore();
    }

    async mount() {
        document.getElementById("create-storage-unit-form").addEventListener('submit', this.onCreateStorageUnit);
        document.getElementById("get-by-id-form").addEventListener('submit', this.onGetById);
        document.getElementById("get-all-form").addEventListener('submit', this.onGetAllUnits);
        document.getElementById("delete-by-id-form").addEventListener('submit', this.onDeletedById);

        this.client = new storageUnitClient();

        this.dataStore.addChangeListener(this.renderStorageUnits)
    }

    /** Render Methods -----------------------------------------------------------------------------------------------*/
    async renderStorageUnits() {
        let resultArea = document.getElementById("result-info");

        const storageUnit = this.dataStore.get("storageUnit");
        const storageUnits = this.dataStore.get("storageUnits");

        if(storageUnit) {
            resultArea.innerHTML = `
            <div>ID: ${storageUnit.unitId}</div>
            <div>Art Type: ${storageUnit.artType}</div>
            <div>Humidity Sensitive: ${storageUnit.humiditySensitive}</div>
            <div>Amount Of Art Stored: ${storageUnit.amountOfArtStored}</div>
         `
        } else if (storageUnits) {
            var myHtml = "<ul>";

            for (let unit of storageUnits) {
                myHtml += `
                    <div>ID: ${unit.unitId}</div>
                    <div>Art Type: ${unit.artType}</div>
                    <div>Humidity Sensitive: ${unit.humiditySensitive}</div>
                    <div>Amount Of Art Stored: ${unit.amountOfArtStored}</div>
                    `;
            }
            myHtml += "</ul>";
            resultArea.innerHTML = myHtml;
        } else {
            resultArea.innerHTML = "No Storage Units!";
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

    async onGetById(event) {
        // Prevent the page from refreshing on form submit
        event.preventDefault();

        let id = document.getElementById("unit-id").value;
        this.dataStore.set("storageUnit", null);

        let result = await this.client.getById(id, this.errorHandler);
        this.dataStore.set("storageUnit", result);
        if (result) {
            this.showMessage(`Got ${result.unitId}!`)
        } else {
            this.errorHandler("Error doing GET!  Try again...");
        }
    }

    async onGetAllUnits(event) {
        event.preventDefault();

        let result = await this.client.getAllUnits(this.errorHandler);
        this.dataStore.set("storageUnits", result);
    }

    async onDeletedById(event) {
        event.preventDefault();

        let id = document.getElementById("delete-unit-id").value;
        let result = await this.client.deletedById(id, this.errorHandler);
        if (!result) {
            this.dataStore.set("storageUnit", null)
            this.showMessage(`Successfully deleted ${id}!`)
        } else {
            this.errorHandler("Error deleting!  Try again...");
        }
    }

}

const main = async () => {
    const storageUnitPage = new StorageUnitPage();
    storageUnitPage.mount();
};

window.addEventListener('DOMContentLoaded', main);