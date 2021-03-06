import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { ContentType } from "../../Models/IVariationInfo";
import { assert } from "chai";
const should = chai.should();

export class Validators {
    public static validateObject(value: any): void {
        value.should.be.a("object");
        value.should.not.be.a("array");
    }

    public static validateArray(arr: any, isEmpty: boolean = false): void {
        arr.should.be.a("array");
        isEmpty ? arr.length.should.be.eql(0) : arr.length.should.be.not.eql(0);
    }

    public static validateErrorAxiosResponse(res: any, statusCode: number, errorCode?: ErrorCodes): void {
        assert.equal(statusCode, res.status);
        Validators.validateError(res.data, errorCode);
    }

    public static validateErrorChaiResponse(res: any, statusCode: number, errorCode?: ErrorCodes): void {
        res.should.have.status(statusCode);
        Validators.validateError(res.body, errorCode);
    }

    public static validateError(value: any, errorCode?: ErrorCodes): void {
        Validators.validateObject(value);
        if (errorCode !== null && errorCode !== undefined) {
            value.should.have.property("errorCode");
            value.should.have.property("errorCode").eql(ErrorCodes[errorCode]);
        }
        value.should.have.property("message");
    }

    public static validateArrayChaiResponse(res: any, isEmpty: boolean = false): void {
        res.should.have.status(200);
        Validators.validateArray(res.body, isEmpty);
    }

    public static validateObjectChaiResponse(res: any): void {
        res.should.have.status(200);
        Validators.validateObject(res.body);
    }

    public static validateSeason(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
        value.should.have.property("verse");
        value.should.have.property("isDateSpecific");
    }

    public static validateService(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
    }

    public static validateServiceHymn(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
    }

    public static validateServiceHymnFormat(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("variationCount");
        value.should.have.property("order");
    }

    public static validateServiceHymnFormatVariation(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+\/${ResourceTypes.Variations}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("content");
    }

    public static validateTextContent(value: any): void {
        value.should.have.property("paragraphs");
        value.should.have.property("contentType").eq(ContentType.TextContent);
        Validators.validateTextParagraphArrayContent(value.paragraphs);
    }

    public static validateTextParagraphArrayContent(textParagraphs: any): void {
        Validators.validateArray(textParagraphs);
        textParagraphs[0].should.have.property("columns");
        Validators.validateTextColumnArrayContent(textParagraphs[0].columns);
    }

    public static validateTextColumnArrayContent(textColumns: any): void {
        Validators.validateArray(textColumns);
        textColumns[0].should.have.property("content");
        textColumns[0].should.have.property("language");
    }

    public static validateHazzatContent(value: any): void {
        value.should.have.property("arabicHazzat");
        value.should.have.property("copticHazzat");
        value.should.have.property("englishHazzat");
        value.should.have.property("contentType").eq(ContentType.HazzatContent);
    }

    public static validateVerticalHazzatContent(value: any): void {
        value.should.have.property("arabicVerticalHazzat");
        value.should.have.property("copticVerticalHazzat");
        value.should.have.property("englishVerticalHazzat");
        value.should.have.property("contentType").eq(ContentType.VerticalHazzatContent);
    }

    public static validateMusicalNotesContent(value: any): void {
        value.should.have.property("musicFilePath");
        value.should.have.property("audioFilePath");
        value.should.have.property("contentType").eq(ContentType.MusicalNotesContent);
    }

    public static validateAudioContent(value: any): void {
        value.should.have.property("audioFilePath");
        value.should.have.property("contentType").eq(ContentType.AudioContent);
    }

    public static validateVideoContent(value: any): void {
        value.should.have.property("arabicVideo");
        value.should.have.property("copticVideo");
        value.should.have.property("englishVideo");
        value.should.have.property("contentType").eq(ContentType.VideoContent);
    }

    public static validateInformationContent(value: any): void {
        value.should.have.property("arabicInformation");
        value.should.have.property("englishInformation");
        value.should.have.property("contentType").eq(ContentType.InformationContent);
    }

    public static validateHymnType(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Types}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("nameSingular");
        value.should.have.property("order");
        value.should.have.property("hymnCount");
    }

    public static validateHymnTune(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Tunes}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
        value.should.have.property("hymnCount");
    }

    public static validateDoesNotInclude(contentString: string, searchString: string): void {
        if (!contentString) {
            return;
        }

        contentString.should.not.contain(searchString);
    }
}
