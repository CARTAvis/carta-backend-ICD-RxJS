import { CARTA } from "carta-protobuf";
import { checkConnection, Stream} from './myClient';
import { MessageController } from "./MessageController";
import config from "./config.json";
import { take } from 'rxjs/operators';

let testServerUrl: string = config.serverURL0;
let testSubdirectory: string = config.path.QA;
let connectTimeout: number = config.timeout.connection;
let openFileTimeout: number = config.timeout.openFile;
let imageFittingTimeout: number = config.timeout.imageFitting;

interface AssertItem {
    register: CARTA.IRegisterViewer;
    filelist: CARTA.IFileListRequest;
    fileOpen: CARTA.IOpenFile;
    addTilesReq: CARTA.IAddRequiredTiles[];
    setCursor: CARTA.ISetCursor;
    fittingRequest: CARTA.IFittingRequest[];
    fittingResponse: CARTA.IFittingResponse[];
    regionHistogramResponses: CARTA.IRegionHistogramData[];
    precisionDigits: number;
    setRegion: CARTA.ISetRegion;
};

let assertItem: AssertItem = {
    register: {
        sessionId: 0,
        clientFeatureFlags: 5,
    },
    filelist: { directory: testSubdirectory },
    fileOpen: {
        directory: testSubdirectory,
        file: "M17_SWex-channel0-addOneGaussian-addBackgroundFlux.fits",
        hdu: "0",
        fileId: 0,
        renderMode: CARTA.RenderMode.RASTER,
    },
    addTilesReq: [
        {
            fileId: 0,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [0],
        },
        {
            fileId: -999,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [33558529, 33558528, 33562625, 33554433, 33562624, 33558530, 33554432, 33562626, 33554434, 33566721, 33566720, 33566722],
        },
        {
            fileId: -999,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [33558529, 33558528, 33562625, 33554433, 33562624, 33554432],
        },
        {
            fileId: -998,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [16777216, 16781312, 16777217, 16781313],
        },
        {
            fileId: -999,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [0],
        },
        {
            fileId: -998,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [0],
        },
        {
            fileId: -999,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [0],
        },
        {
            fileId: -998,
            compressionQuality: 11,
            compressionType: CARTA.CompressionType.ZFP,
            tiles: [0],
        }
    ],    
    setCursor: {
        fileId: 0,
        point: { x: 1, y: 1 },
    },
    fittingRequest: [
        {
            fileId: 0,
            createModelImage: false,
            createResidualImage: false,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: null,
            regionId: -1, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}],
        },
        {
            fileId: 0,
            createModelImage: false,
            createResidualImage: false,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: {
                controlPoints: [{x:319.5, y:399.5}, {x: 216.70644391408112, y: 199.99999999999997}],
                regionType: 3,
                rotation: 0,
            },
            regionId: 0, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}],
            solver: 1
        },
        {
            fileId: 0,
            createModelImage: true,
            createResidualImage: false,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: null,
            regionId: -1, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}]
        },
        {
            fileId: 0,
            createModelImage: true,
            createResidualImage: true,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: null,
            regionId: -1, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}]
        },
        {
            fileId: 0,
            createModelImage: false,
            createResidualImage: false,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: {
                controlPoints: [{x:319.5, y:399.5}, {x: 216.70644391408112, y: 199.99999999999997}],
                regionType: 3,
                rotation: 0,
            },
            regionId: 0, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}],
            solver: 0
        },
        {
            fileId: 0,
            createModelImage: false,
            createResidualImage: false,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: {
                controlPoints: [{x:319.5, y:399.5}, {x: 216.70644391408112, y: 199.99999999999997}],
                regionType: 3,
                rotation: 0,
            },
            regionId: 0, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}],
            solver: 3
        },
        {
            fileId: 0,
            createModelImage: true,
            createResidualImage: true,
            fixedParams: [false, false, false, false, false, false, true],
            fovInfo: null,
            regionId: 1, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}],
            solver: 1,
            offset: 0,
        },
        {
            fileId: 0,
            createModelImage: true,
            createResidualImage: true,
            fixedParams: [false, false, false, false, false, false, false],
            fovInfo: null,
            regionId: 1, 
            initialValues: [{amp: 10, center: {x: 320, y: 400}, fwhm: {x: 100, y: 50}, pa: 135}],
            solver: 1,
            offset: 9,
        },
    ],
    fittingResponse: [
        {
            resultValues: [
                {
                    center: {x: 319.4995814506346, y: 399.4997816490029}, 
                    amp: 9.999559472737332,
                    fwhm: {x: 170.63727122575295, y: 41.48182201673784},
                    pa: 142.16266600131718
                }
            ],
            resultErrors: [
                {
                    center: {x: 0.004862282328088298, y: 0.006083234199648924},
                    amp: 0.0010394004351452657,
                    fwhm: {x: 0.017829815443100857, y: 0.004289403722596462},
                    pa: 0.002164788713961321
                }
            ],
            success: true,
            log: 'Gaussian fitting with 1 component'
        },
        {
            resultValues: [
                {
                    center: {x: 319.498940837943, y: 399.4988615251924}, 
                    amp: 9.999454722592997,
                    fwhm: {x: 170.6382683676851, y: 41.48206117869241},
                    pa: 142.16251357416306
                }
            ],
            resultErrors: [
                {
                    center: {x: 0.28395183040510463, y: 0.3552522810087399},
                    amp: 0.060698898414551956,
                    fwhm: {x: 1.0412382510473062, y: 0.2504947531757667},
                    pa: 0.12641955643752142
                }
            ],
            success: true,
            log: 'Gaussian fitting with 1 component'
        },
        {
            resultValues: [
                {
                    center: {x: 319.4995814506346, y: 399.4997816490029}, 
                    amp: 9.999364723563854,
                    fwhm: {x: 170.63727122575295, y: 41.48182201673784},
                    pa: 142.16253087438943
                }
            ],
            resultErrors: [
                {
                    center: {x: 0.2839504902335992, y: 0.3552501801628741},
                    amp: 0.06070009999532681,
                    fwhm: {x: 1.0412323853467904, y: 0.25049418978226967},
                    pa: 0.1264221290078967,
                }
            ],
            integratedFluxValues: [ 3684.4455134450345 ],
            integratedFluxErrors: [ 22.426663226537094 ],
            success: true,
            log: 'Gaussian fitting with 1 component',
            offsetError: 0.002090941903577148,
            offsetValue: 10.000099734013848,
        },
    ],
    precisionDigits: 2,
    regionHistogramResponses: [
        {
            fileId: -999,
            progress: 1,
            regionId: -1,
        }, 
        {
            fileId: -998,
            progress: 1,
            regionId: -1,
        }
    ],
    setRegion: {
        fileId: 0,
        regionId: 1,
        regionInfo: {
            regionType: CARTA.RegionType.RECTANGLE,
            controlPoints: [{x:319.5, y:399.5}, {x: 216.70644391408112, y: 199.99999999999997}],
            rotation: 0,
        }
    }
};

let basepath: string;
describe("IMAGE_FITTING_FITS test: Testing Image Fitting (with and without fov) with fits file.", () => {
    const msgController = MessageController.Instance;
    describe(`Register a session`, () => {
        beforeAll(async ()=> {
            await msgController.connect(testServerUrl);
        }, connectTimeout);

        checkConnection();
        test(`Get basepath`, async () => {
            let fileListResponse = await msgController.getFileList("$BASE",0);
            basepath = fileListResponse.directory;
            assertItem.fileOpen.directory = basepath + "/" + assertItem.filelist.directory;
        });

        describe(`Go to "${assertItem.filelist.directory}" folder`, () => {
            describe(`(Step 0) Initialization: open the image`, () => {
                test(`OPEN_FILE_ACK and REGION_HISTOGRAM_DATA should arrive within ${openFileTimeout} ms`, async () => {
                    msgController.closeFile(-1);
                    msgController.closeFile(0);
                    let OpenFileResponse = await msgController.loadFile(assertItem.fileOpen);
                    expect(OpenFileResponse.success).toEqual(true);
                    let RegionHistrogramDataResponse = await Stream(CARTA.RegionHistogramData,1);
                }, openFileTimeout);
    
                test(`return RASTER_TILE_DATA(Stream) and check total length `, async () => {
                    msgController.addRequiredTiles(assertItem.addTilesReq[0]);
                    let RasterTileData = await Stream(CARTA.RasterTileData,3); //RasterTileData * 1 + RasterTileSync * 2
                    msgController.setCursor(assertItem.setCursor.fileId, assertItem.setCursor.point.x, assertItem.setCursor.point.y);
                    let SpatialProfileDataResponse = await Stream(CARTA.SpatialProfileData,1);
                }, openFileTimeout);
            });

            describe(`(Case 6) Image fitting with setting region, sky offset and creating model image and residual image:`, ()=>{
                test(`Set a region:`, async () => {
                    let setRegionAckResponse = await msgController.setRegion(assertItem.setRegion.fileId, assertItem.setRegion.regionId, assertItem.setRegion.regionInfo);
                    expect(setRegionAckResponse.regionId).toEqual(1);
                    expect(setRegionAckResponse.success).toEqual(true);
                });
                
                test(`Send Image fitting request and match the result`, async()=>{
                    let imageFittingProgressArray4 = [];
                    let imageFittingProgressReponse4 : any;
                    let RegionHistogramDataResponse2: CARTA.RegionHistogramData[] = [];
                    let imageFittingProgressPromise4 = new Promise((resolve)=>{
                        msgController.fittingProgressStream.subscribe({
                            next: (data) => {
                                imageFittingProgressArray4.push(data)
                                if (Math.round(data.progress) > 0.99) {
                                    msgController.histogramStream.pipe(take(2)).subscribe(data2 => {
                                        RegionHistogramDataResponse2.push(data2)
                                    })
                                    resolve(imageFittingProgressArray4)
                                }
                            }
                        })
                    });

                    let response = await msgController.requestFitting(assertItem.fittingRequest[7]);

                    imageFittingProgressReponse4 = await imageFittingProgressPromise4;
                    for (let i = 0; i < imageFittingProgressReponse4.length; i++) {
                        console.log('[Case 6] Image Fitting progress :', imageFittingProgressReponse4[i].progress);
                    }
                    
                    let RegionHistogramDatafileID = [];
                    RegionHistogramDataResponse2.map(data => {RegionHistogramDatafileID.push(data.fileId)});
                    expect(RegionHistogramDatafileID).toContain(assertItem.regionHistogramResponses[0].fileId);
                    expect(RegionHistogramDatafileID).toContain(assertItem.regionHistogramResponses[1].fileId);

                    console.log(response)

                    expect(response.resultValues[0].center.x).toBeCloseTo(assertItem.fittingResponse[2].resultValues[0].center.x, assertItem.precisionDigits);
                    expect(response.resultValues[0].center.y).toBeCloseTo(assertItem.fittingResponse[2].resultValues[0].center.y, assertItem.precisionDigits);
                    expect(response.resultValues[0].amp).toBeCloseTo(assertItem.fittingResponse[2].resultValues[0].amp, assertItem.precisionDigits);
                    expect(response.resultValues[0].fwhm.x).toBeCloseTo(assertItem.fittingResponse[2].resultValues[0].fwhm.x, assertItem.precisionDigits);
                    expect(response.resultValues[0].fwhm.y).toBeCloseTo(assertItem.fittingResponse[2].resultValues[0].fwhm.y, assertItem.precisionDigits);
                    expect(response.resultValues[0].pa).toBeCloseTo(assertItem.fittingResponse[2].resultValues[0].pa, assertItem.precisionDigits);
                    expect(response.success).toEqual(assertItem.fittingResponse[2].success);
                    expect(response.resultErrors[0].center.x).toBeCloseTo(assertItem.fittingResponse[2].resultErrors[0].center.x, assertItem.precisionDigits);
                    expect(response.resultErrors[0].center.y).toBeCloseTo(assertItem.fittingResponse[2].resultErrors[0].center.y, assertItem.precisionDigits);
                    expect(response.resultErrors[0].amp).toBeCloseTo(assertItem.fittingResponse[2].resultErrors[0].amp, assertItem.precisionDigits);
                    expect(response.resultErrors[0].fwhm.x).toBeCloseTo(assertItem.fittingResponse[2].resultErrors[0].fwhm.x, assertItem.precisionDigits);
                    expect(response.resultErrors[0].fwhm.y).toBeCloseTo(assertItem.fittingResponse[2].resultErrors[0].fwhm.y, assertItem.precisionDigits);
                    expect(response.resultErrors[0].pa).toBeCloseTo(assertItem.fittingResponse[2].resultErrors[0].pa, assertItem.precisionDigits);
                    expect(response.log).toContain(assertItem.fittingResponse[2].log);
                    expect(response.offsetValue).toBeCloseTo(assertItem.fittingResponse[2].offsetValue, assertItem.precisionDigits);
                    expect(response.offsetError).toBeCloseTo(assertItem.fittingResponse[2].offsetError, assertItem.precisionDigits);
                },imageFittingTimeout);

                test(`Request the tiles for the model image`, async () => {
                    msgController.rasterSyncStream.pipe(take(4)).subscribe({
                        next: (data) => {
                            RasterTileSyncArray.push(data)
                        }
                    })

                    msgController.addRequiredTiles(assertItem.addTilesReq[6]);
                    msgController.addRequiredTiles(assertItem.addTilesReq[7]);

                    let RasterTileArray = [];
                    let RasterTileSyncArray = [];
                    let RasterTileDataPromise = new Promise((resolve) => {
                        msgController.rasterTileStream.pipe(take(assertItem.addTilesReq[6].tiles.length + assertItem.addTilesReq[7].tiles.length)).subscribe({
                            next: (data) => {
                                RasterTileArray.push(data)
                            },
                            complete: () => {
                                resolve(RasterTileArray)
                            }
                        })
                    })

                    let RasterTileDataResponse: any = await RasterTileDataPromise;
                    let _countFileID999 = 0;
                    let _countFileID998 = 0;

                    RasterTileDataResponse.forEach(element => {
                        if (element.fileId == assertItem.addTilesReq[6].fileId) {
                            _countFileID999++
                        } else if (element.fileId == assertItem.addTilesReq[7].fileId) {
                            _countFileID998++
                        }
                    });
                    expect(_countFileID999).toEqual(assertItem.addTilesReq[6].tiles.length);
                    expect(_countFileID998).toEqual(assertItem.addTilesReq[7].tiles.length);
                });
            });

        });
        test(`close file`, async () => {
            msgController.closeFile(-1);
        }, connectTimeout);

        afterAll(() => msgController.closeConnection());
    });
});