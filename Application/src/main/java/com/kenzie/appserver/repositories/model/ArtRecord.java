package com.kenzie.appserver.repositories.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;


@DynamoDBTable(tableName = "Art")
public class ArtRecord {

    String artId;
    String name;
    String artistName;
    String locationId;
    String type;
    boolean humiditySensitive;
    String timeStamp;
    String price;

    @DynamoDBHashKey(attributeName = "ArtId")
    public String getArtId() {
        return artId;
    }

    public void setArtId(String artId) {
        this.artId = artId;
    }

    @DynamoDBAttribute(attributeName = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @DynamoDBAttribute(attributeName = "ArtistName")
    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    @DynamoDBAttribute(attributeName = "LocationId")
    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    @DynamoDBAttribute(attributeName = "Type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @DynamoDBAttribute(attributeName = "HumiditySensitive")
    public boolean isHumiditySensitive() {
        return humiditySensitive;
    }

    public void setHumiditySensitive(boolean humiditySensitive) {
        this.humiditySensitive = humiditySensitive;
    }

    @DynamoDBAttribute(attributeName = "TimeStamp")
    public String getTimeStamp() {
        return this.timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    @DynamoDBAttribute(attributeName = "Price")
    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "ArtRecord{" +
                "artId='" + artId + '\'' +
                ", name='" + name + '\'' +
                ", artistName='" + artistName + '\'' +
                ", locationId='" + locationId + '\'' +
                ", type=" + type +
                ", humiditySensitive=" + humiditySensitive +
                ", timeStamp='" + timeStamp + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}

