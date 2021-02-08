import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { ContentType } from "../../Models/IVariationInfo";
const should = chai.should();

export class Validators {
    public static validateErrorResponse(res: any, statusCode: number, errorCode?: ErrorCodes): void {
        res.should.have.status(statusCode);
        res.body.should.be.a("object");
        res.body.should.not.be.a("array");
        if (errorCode !== null && errorCode !== undefined) {
            res.body.should.have.property("errorCode");
            res.body.should.have.property("errorCode").eql(ErrorCodes[errorCode]);
        }
        res.body.should.have.property("message");
    }

    public static validateArrayResponse(res: any, isEmpty: boolean = false): void {
        res.should.have.status(200);
        res.body.should.be.a("array");
        isEmpty ? res.body.length.should.be.eql(0) : res.body.length.should.be.not.eql(0);
    }

    public static validateObjectResponse(res: any): void {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.not.be.a("array");
    }

    public static validateSeasonResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("order");
        resBody.should.have.property("verse");
        resBody.should.have.property("isDateSpecific");
    }

    public static validateServiceResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnFormatResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("variationCount");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnFormatVariationResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+\/${ResourceTypes.Variations}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("content");
    }

    public static validateTextContentResponse(contentBody: any): void {
        contentBody.should.have.property("paragraphs");
        contentBody.should.have.property("contentType").eq(ContentType.TextContent);
        Validators.validateTextParagraphArrayContent(contentBody.paragraphs);
    }

    public static validateTextParagraphArrayContent(textParagraphs: any): void {
        textParagraphs.should.be.a("array");
        textParagraphs[0].should.have.property("columns");
        Validators.validateTextColumnArrayContent(textParagraphs[0].columns);
    }

    public static validateTextColumnArrayContent(textColumns: any): void {
        textColumns.should.be.a("array");
        textColumns[0].should.have.property("content");
        textColumns[0].should.have.property("language");
    }

    public static validateHazzatContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicHazzat");
        contentBody.should.have.property("copticHazzat");
        contentBody.should.have.property("englishHazzat");
        contentBody.should.have.property("contentType").eq(ContentType.HazzatContent);
    }

    public static validateVerticalHazzatContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicVerticalHazzat");
        contentBody.should.have.property("copticVerticalHazzat");
        contentBody.should.have.property("englishVerticalHazzat");
        contentBody.should.have.property("contentType").eq(ContentType.VerticalHazzatContent);
    }

    public static validateMusicalNotesContentResponse(contentBody: any): void {
        contentBody.should.have.property("musicFilePath");
        contentBody.should.have.property("audioFilePath");
        contentBody.should.have.property("contentType").eq(ContentType.MusicalNotesContent);
    }

    public static validateAudioContentResponse(contentBody: any): void {
        contentBody.should.have.property("audioFilePath");
        contentBody.should.have.property("contentType").eq(ContentType.AudioContent);
    }

    public static validateVideoContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicVideo");
        contentBody.should.have.property("copticVideo");
        contentBody.should.have.property("englishVideo");
        contentBody.should.have.property("contentType").eq(ContentType.VideoContent);
    }

    public static validateInformationContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicInformation");
        contentBody.should.have.property("englishInformation");
        contentBody.should.have.property("contentType").eq(ContentType.InformationContent);
    }

    public static validateDoesNotInclude(contentString: string, searchString: string): void {
        if (!contentString) {
            return;
        }

        contentString.should.not.contain(searchString);
    }
}
