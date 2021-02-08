export namespace HazzatDbSchema {
    export interface ISeason {
        ItemId: number;
        Name: string;
        Verse: string;
        Season_Order: number;
        Reason_ID: number;
        Reason_Name: string;
        Date_Specific: boolean;
    }

    export interface IService {
        ItemId: number;
        Season_ID: number;
        Season_Name: string;
        Service_Name: string;
        Service_Order: number;
    }

    export interface IServiceHymn {
        ItemId: number;
        Season_ID: number;
        Season_Name: string;
        Service_ID: number;
        Service_Name: string;
        Hymn_Order: number;
        Title: string;
    }

    export interface IServiceHymnFormat {
        ItemId: number;
        Format_Name: string;
        Season_ID: number;
        Season_Name: string;
        Service_ID: number;
        Service_Name: string;
        Hymn_Order: number;
        ServiceHymn_ID: number;
        ServiceHymn_Title: string;
        Content_Count: number;
    }

    export interface IServiceHymnFormatContent {
        ItemId: number;
        Content_Name: string;
        Content_Arabic: string;
        Content_Coptic: string;
        Content_English: string;
        Audio_Path: string;
        Music_Path: string;
        Season_ID: number;
        Season_Name: string;
        Reason_ID: number;
        Service_ID: number;
        Service_Name: string;
        ServiceHymn_ID: number;
        ServiceHymn_Title: string;
        Format_ID: number;
        Format_Name: string;
    }

    export interface ICommonContent {
        ItemId: number;
        Name: string;
        Content: string;
        Language: string;
        Format_ID: number;
    }

    export interface IReason {
        ItemId: number;
        Name: string;
        Long_English: string;
        Long_Coptic: string;
        Long_Arabic: string;
        Short_English: string;
        Short_Coptic: string;
        Short_Arabic: string;
    }
}
