﻿export const enum ContentType {
    TextContent = "TextContent",
    HazzatContent = "HazzatContent",
    VerticalHazzatContent = "VerticalHazzatContent",
    VideoContent = "VideoContent",
    InformationContent = "VideoContent"
}

export interface TextParagraph {
    content?: string;
    description?: string;
}

export interface ContentCommon {
    contentType: ContentType;
}

export interface ITextContent extends ContentCommon {
    arabicText: TextParagraph[];
    copticText: TextParagraph[];
    englishText: TextParagraph[];
}

export interface IHazzatContent extends ContentCommon {
    arabicHazzat: string;
    copticHazzat: string;
    englishHazzat: string;
}

export interface IVerticalHazzatContent extends ContentCommon {
    arabicVerticalHazzat: string;
    copticVerticalHazzat: string;
    englishVerticalHazzat: string;
}

export interface IVideoContent extends ContentCommon {
    arabicVideo: string;
    copticVideo: string;
    englishVideo: string;
}

export interface IInformationContent extends ContentCommon {
    arabicInformation: string;
    englishInformation: string;
}

export declare type IHymnContent =
    ITextContent |
    IHazzatContent |
    IVerticalHazzatContent |
    IVideoContent |
    IInformationContent;

/*
 * Variation Info
 */
export interface IVariationInfo<T extends IHymnContent> {
    id: string;
    name: string;
    content: T;  // TODO: Not sure how I feel about having this being polymorphic.  Bad design?
}
