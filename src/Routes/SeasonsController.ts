import * as express from "express";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";
import { ResourceTypes } from "./ResourceTypes";

export class SeasonsController extends BaseController {
    constructor(hymnsServiceProvider: IHymnsServiceProvider) {
        super();

        /**
         * @swagger
         *
         * definitions:
         *   Season:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       isDateSpecific:
         *         type: boolean
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *       verse:
         *         type: string
         *     required: [id, isDateSpecific, name, order, verse]
         *
         * /seasons:
         *   get:
         *     description: Gets a list of Seasons
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Seasons
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Season'
         *
         *
         */
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeasonList();
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]:
         *   get:
         *     description: Returns the details of the given season id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Season
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Season'
         *
         *       404:
         *         description: A Season detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get("/:seasonId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeason(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   Service:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, name, order]
         *
         * /seasons/[seasonId]/services:
         *   get:
         *     description: Gets a list of Services within a given season id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Services
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Service'
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeasonServiceList(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]:
         *   get:
         *     description: Returns the details of the given service
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Service
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Service'
         *
         *       404:
         *         description: A service detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeasonService(req.params.seasonId, req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   Hymn:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, name, order]
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns:
         *   get:
         *     description: Gets a list of hymns in the service
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymns
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Hymn'
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnList(req.params.seasonId, req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]:
         *   get:
         *     description: Returns the details of the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymn
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Hymn'
         *
         *       404:
         *         description: A hymn detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymn(req.params.seasonId, req.params.serviceId, req.params.hymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   Format:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *       variationCount:
         *         type: integer
         *     required: [id, name, order, variationCount]
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats:
         *   get:
         *     description: Gets a list of formats for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymn formats
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Format'
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnFormatList(req.params.seasonId, req.params.serviceId, req.params.hymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats/[formatId]:
         *   get:
         *     description: Returns the details of the format for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Format
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Format'
         *
         *       404:
         *         description: A format detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnFormat(req.params.seasonId, req.params.serviceId, req.params.hymnId, req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   TextColumn:
         *     type: object
         *     properties:
         *       content:
         *         type: string
         *       language:
         *         type: string
         *     required: [content, language]
         *
         *   TextParagraph:
         *     type: object
         *     properties:
         *       columns:
         *         type: array
         *         items:
         *           $ref: '#/definitions/TextColumn'
         *       isComment:
         *         type: boolean
         *     required: [columns]
         *
         *   TextContent:
         *     type: object
         *     properties:
         *       paragraphs:
         *         type: array
         *         items:
         *           $ref: '#/definitions/TextParagraph'
         *     required: [paragraphs]
         *
         *   HazzatContent:
         *     type: object
         *     properties:
         *       arabicHazzat:
         *         type: string
         *       copticHazzat:
         *         type: string
         *       englishHazzat:
         *         type: string
         *
         *   VerticalHazzatContent:
         *     type: object
         *     properties:
         *       arabicVerticalHazzat:
         *         type: string
         *       copticVerticalHazzat:
         *         type: string
         *       englishVerticalHazzat:
         *         type: string
         *
         *   MusicalNotesContent:
         *     type: object
         *     properties:
         *       musicFilePath:
         *         type: string
         *       audioFilePath:
         *         type: string
         *
         *   AudioContent:
         *     type: object
         *     properties:
         *       audioFilePath:
         *         type: string
         *
         *   VideoContent:
         *     type: object
         *     properties:
         *       arabicVideo:
         *         type: string
         *       copticVideo:
         *         type: string
         *       englishVideo:
         *         type: string
         *
         *   InformationContent:
         *     type: object
         *     properties:
         *       arabicInformation:
         *         type: string
         *       englishInformation:
         *         type: string
         *
         *   HymnContent:
         *     oneOf:
         *       - $ref: '#/definitions/TextContent'
         *       - $ref: '#/definitions/HazzatContent'
         *       - $ref: '#/definitions/VerticalHazzatContent'
         *       - $ref: '#/definitions/MusicalNotesContent'
         *       - $ref: '#/definitions/AudioContent'
         *       - $ref: '#/definitions/VideoContent'
         *       - $ref: '#/definitions/InformationContent'
         *     discriminator:
         *       propertyName: contentType
         *
         *   Variation:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       content:
         *         $ref: '#/definitions/HymnContent'
         *     required: [id, name, content]
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats/[formatId]/variations:
         *   get:
         *     description: Gets a list of variations for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymn format variations
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Variation'
         *
         *       501:
         *         description: Format variation is not supported at this time
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         *             details:
         *               type: string
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)/${ResourceTypes.Variations}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnsFormatVariationList(req.params.seasonId, req.params.serviceId, req.params.hymnId, req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats/[formatId]/variations/[variationId]:
         *   get:
         *     description: Returns the details of the variation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: variationId
         *         description: Variation ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Variation
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Variation'
         *
         *       404:
         *         description: A variation detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         *
         *       501:
         *         description: Format content is not supported at this time
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         *             details:
         *               type: string
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)/${ResourceTypes.Variations}/:variationId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnsFormatVariation(req.params.seasonId, req.params.serviceId, req.params.hymnId, req.params.formatId, req.params.variationId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
