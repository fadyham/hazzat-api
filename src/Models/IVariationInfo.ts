import { Language } from "../Common/Types/Language";

export const enum ContentType {
    TextContent = "TextContent",
    HazzatContent = "HazzatContent",
    VerticalHazzatContent = "VerticalHazzatContent",
    MusicalNotesContent = "MusicalNotesContent",
    AudioContent = "AudioContent",
    VideoContent = "VideoContent",
    InformationContent = "InformationContent"
}

export interface TextColumn {
    content: string;
    language: Language;
}

export interface TextParagraph {
    columns: TextColumn[];
    isComment?: boolean;
}

export interface ContentCommon {
    contentType: ContentType;
}

export interface ITextContent extends ContentCommon {
    paragraphs: TextParagraph[];
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

export interface IMusicalNotesContent extends ContentCommon {
    musicFilePath: string;
    audioFilePath: string;
}

export interface IAudioContent extends ContentCommon {
    audioFilePath: string;
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
