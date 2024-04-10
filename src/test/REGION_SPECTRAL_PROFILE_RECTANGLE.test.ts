import { CARTA } from "carta-protobuf";
import { checkConnection, Stream} from './myClient';
import { MessageController } from "./MessageController";
import config from "./config.json";
import { ProtobufProcessing } from "./Processed";

let testServerUrl = config.serverURL0;
let testSubdirectory = config.path.QA;
let connectTimeout = config.timeout.connection;
let openFileTimeout: number = config.timeout.openFile;
let readFileTimeout: number = config.timeout.readFile;
let regionTimeout = config.timeout.region;

interface IProfilesExt extends CARTA.ISpectralProfile {
    profileLength?: number;
    checkValues?: { index: number, value: number }[];
}
interface ISpectralProfileData extends CARTA.ISpectralProfileData {
    profile?: IProfilesExt[];
}
interface AssertItem {
    registerViewer: CARTA.IRegisterViewer;
    openFile: CARTA.IOpenFile[];
    setCursor: CARTA.ISetCursor;
    addRequiredTiles: CARTA.IAddRequiredTiles;
    setRegion: CARTA.ISetRegion[];
    regionAck: CARTA.ISetRegionAck[];
    setSpectralRequirements: CARTA.ISetSpectralRequirements[];
    spectralProfileData: ISpectralProfileData[];
    precisionDigits: number;
}
let assertItem: AssertItem = {
    registerViewer: {
        sessionId: 0,
        apiKey: "",
        clientFeatureFlags: 5,
    },
    openFile:
        [
            {
                directory: testSubdirectory,
                file: "M17_SWex.image",
                fileId: 0,
                hdu: "",
                renderMode: CARTA.RenderMode.RASTER,
            },
            {
                directory: testSubdirectory,
                file: "M17_SWex.hdf5",
                fileId: 0,
                hdu: "",
                renderMode: CARTA.RenderMode.RASTER,
            },
        ],
    setCursor: {
        fileId: 0,
        point: { x: 1.0, y: 1.0 },
        spatialRequirements: {
            fileId: 0,
            regionId: 0,
            spatialProfiles: []
        },
    },
    addRequiredTiles:
    {
        tiles: [0],
        fileId: 0,
        compressionQuality: 11,
        compressionType: CARTA.CompressionType.ZFP,
    },
    setRegion: [
        {
            fileId: 0,
            regionId: -1,
            regionInfo: {
                regionType: CARTA.RegionType.RECTANGLE,
                controlPoints: [{ x: 83, y: 489 }, { x: 4, y: 6 }],
                rotation: 0.0,
            }
        },
        {
            fileId: 0,
            regionId: -1,
            regionInfo: {
                regionType: CARTA.RegionType.RECTANGLE,
                controlPoints: [{ x: 92, y: 522 }, { x: 4, y: 6 }],
                rotation: 50.0,
            }
        },
        {
            fileId: 0,
            regionId: -1,
            regionInfo: {
                regionType: CARTA.RegionType.RECTANGLE,
                controlPoints: [{ x: 360, y: 490 }, { x: 0.5, y: 0.5 }],
                rotation: 0.0,
            }
        },
        {
            fileId: 0,
            regionId: -1,
            regionInfo: {
                regionType: CARTA.RegionType.RECTANGLE,
                controlPoints: [{ x: 0, y: 522 }, { x: 4, y: 6 }],
                rotation: 50.0,
            }
        },
    ],
    regionAck: [
        {
            success: true,
            regionId: 1,
        },
        {
            success: true,
            regionId: 2,
        },
        {
            success: true,
            regionId: 3,
        },
        {
            success: true,
            regionId: 4,
        },
    ],
    setSpectralRequirements: [
        {
            fileId: 0,
            regionId: 1,
            spectralProfiles: [
                {
                    coordinate: "z",
                    statsTypes: [
                        CARTA.StatsType.NumPixels,
                        CARTA.StatsType.Sum,
                        CARTA.StatsType.FluxDensity,
                        CARTA.StatsType.Mean,
                        CARTA.StatsType.RMS,
                        CARTA.StatsType.Sigma,
                        CARTA.StatsType.SumSq,
                        CARTA.StatsType.Min,
                        CARTA.StatsType.Max,
                        CARTA.StatsType.Extrema
                    ],
                }
            ],
        },
        {
            fileId: 0,
            regionId: 2,
            spectralProfiles: [
                {
                    coordinate: "z",
                    statsTypes: [
                        CARTA.StatsType.NumPixels,
                        CARTA.StatsType.Sum,
                        CARTA.StatsType.FluxDensity,
                        CARTA.StatsType.Mean,
                        CARTA.StatsType.RMS,
                        CARTA.StatsType.Sigma,
                        CARTA.StatsType.SumSq,
                        CARTA.StatsType.Min,
                        CARTA.StatsType.Max,
                        CARTA.StatsType.Extrema
                    ],
                }
            ],
        },
        {
            fileId: 0,
            regionId: 3,
            spectralProfiles: [
                {
                    coordinate: "z",
                    statsTypes: [
                        CARTA.StatsType.NumPixels,
                        CARTA.StatsType.Sum,
                        CARTA.StatsType.FluxDensity,
                        CARTA.StatsType.Mean,
                        CARTA.StatsType.RMS,
                        CARTA.StatsType.Sigma,
                        CARTA.StatsType.SumSq,
                        CARTA.StatsType.Min,
                        CARTA.StatsType.Max,
                        CARTA.StatsType.Extrema
                    ],
                }
            ],
        },
        {
            fileId: 0,
            regionId: 4,
            spectralProfiles: [
                {
                    coordinate: "z",
                    statsTypes: [
                        CARTA.StatsType.NumPixels,
                        CARTA.StatsType.Sum,
                        CARTA.StatsType.FluxDensity,
                        CARTA.StatsType.Mean,
                        CARTA.StatsType.RMS,
                        CARTA.StatsType.Sigma,
                        CARTA.StatsType.SumSq,
                        CARTA.StatsType.Min,
                        CARTA.StatsType.Max,
                        CARTA.StatsType.Extrema
                    ],
                }
            ],
        },
    ],
    spectralProfileData: [
        {
            regionId: 1,
            progress: 1,
            profile: [
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sum,
                    checkValues: [{ index: 10, value: 0.86641663 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.FluxDensity,
                    checkValues: [{ index: 10, value: 0.03980531  }],
                },
                {
                    coordinate: "z",
                    profileLength: 25,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 10, value: 0.05776111 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.RMS,
                    checkValues: [{ index: 10, value: 0.05839548 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sigma,
                    checkValues: [{ index: 10, value: 0.00888533 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.SumSq,
                    checkValues: [{ index: 10, value: 0.05115047 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Min,
                    checkValues: [{ index: 10, value: 0.03859435 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Max,
                    checkValues: [{ index: 10, value: 0.0702243 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Extrema,
                    checkValues: [{ index: 10, value: 0.0702243 }],
                },
            ],
        },
        {
            regionId: 2,
            progress: 1,
            profile: [
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sum,
                    checkValues: [{ index: 10, value: -0.3364888 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.FluxDensity,
                    checkValues: [{ index: 10, value: -0.01545912  }],
                },
                {
                    coordinate: "z",
                    profileLength: 25,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 10, value: -0.02103055 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.RMS,
                    checkValues: [{ index: 10, value: 0.02322209 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sigma,
                    checkValues: [{ index: 10, value: 0.01017089 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.SumSq,
                    checkValues: [{ index: 10, value: 0.00862825 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Min,
                    checkValues: [{ index: 10, value: -0.03209378 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Max,
                    checkValues: [{ index: 10, value: -0.00236961 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Extrema,
                    checkValues: [{ index: 10, value: -0.03209378 }],
                },
            ],
        },
        {
            regionId: 3,
            progress: 1,
            profile: [
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sum,
                    checkValues: [{ index: 10, value: 0.00006235 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.FluxDensity,
                    checkValues: [{ index: 10, value: 0.00000286 }],
                },
                {
                    coordinate: "z",
                    profileLength: 25,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 10, value: 0.00006235 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.RMS,
                    checkValues: [{ index: 10, value: 0.00006235 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sigma,
                    checkValues: [{ index: 10, value: 0.0 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.SumSq,
                    checkValues: [{ index: 10, value: 0.0 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Min,
                    checkValues: [{ index: 10, value: 0.0000623 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Max,
                    checkValues: [{ index: 10, value: 0.0000623 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Extrema,
                    checkValues: [{ index: 10, value: 0.0000623 }],
                },
            ],
        },
        {
            regionId: 4,
            progress: 1,
            profile: [
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sum,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.FluxDensity,
                    checkValues: [{ index: 0, value: NaN  }],
                },
                {
                    coordinate: "z",
                    profileLength: 25,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.RMS,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sigma,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.SumSq,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Min,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Max,
                    checkValues: [{ index: 0, value: NaN }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Extrema,
                    checkValues: [{ index: 0, value: NaN }],
                },
            ],
        },
    ],
    precisionDigits: 4,
}

let basepath: string;
describe("REGION_SPECTRAL_PROFILE_RECTANGLE: Testing spectral profiler with rectangle regions", () => {
    const msgController = MessageController.Instance;
    assertItem.openFile.map((openFile, index) => {
        describe(`Register a session`, () => {
            beforeAll(async ()=> {
                await msgController.connect(testServerUrl);
            }, connectTimeout);

            checkConnection();    
            test(`Get basepath and modify the directory path`, async () => {
                msgController.closeFile(-1);
                let fileListResponse = await msgController.getFileList("$BASE",0);
                basepath = fileListResponse.directory;
                assertItem.openFile[index].directory = basepath + "/" + assertItem.openFile[index].directory;
            });

            let regionHistogramData = [];
            test(`[Preparatio of "${openFile.file}"] Open file and Check OPEN_FILE_ACK and REGION_HISTOGRAM_DATA should arrive within ${openFileTimeout} ms | `, async () => {
                let regionHistogramDataPromise = new Promise((resolve)=>{
                    msgController.histogramStream.subscribe({
                        next: (data) => {
                            regionHistogramData.push(data)
                            resolve(regionHistogramData)
                        }
                    })
                });
                let OpenFileResponse = await msgController.loadFile(openFile);
                let RegionHistogramData = await regionHistogramDataPromise;
    
                expect(OpenFileResponse.success).toBe(true);
                expect(OpenFileResponse.fileInfo.name).toEqual(openFile.file);
            }, openFileTimeout);

            test(`[Preparatio of "${openFile.file}"] Return RASTER_TILE_DATA(Stream) and check total length | `, async () => {
                msgController.addRequiredTiles(assertItem.addRequiredTiles);
                let RasterTileDataResponse = await Stream(CARTA.RasterTileData,assertItem.addRequiredTiles.tiles.length + 2);
    
                msgController.setCursor(assertItem.setCursor.fileId, assertItem.setCursor.point.x, assertItem.setCursor.point.y);
                let SpatialProfileDataResponse1 = await Stream(CARTA.SpatialProfileData,1);
    
                expect(RasterTileDataResponse.length).toEqual(3); //RasterTileSync: start & end + 1 Tile returned
            }, readFileTimeout);

            assertItem.setRegion.map((region, index) => {
                describe(`${region.regionId < 0 ? "Creating" : "Modify"} ${CARTA.RegionType[region.regionInfo.regionType]} region #${assertItem.regionAck[index].regionId} on ${JSON.stringify(region.regionInfo.controlPoints)} for ${openFile.file}`, () => {
                    let SetRegionAck: any;
                    test(`SET_REGION_ACK should return within ${regionTimeout} ms`, async () => {
                        SetRegionAck = await msgController.setRegion(region.fileId, region.regionId, region.regionInfo);
                    }, regionTimeout);

                    test(`SET_REGION_ACK.success = ${assertItem.regionAck[index].success}`, () => {
                        expect(SetRegionAck.success).toBe(assertItem.regionAck[index].success);
                    });

                    test(`SET_REGION_ACK.region_id = ${assertItem.regionAck[index].regionId}`, () => {
                        expect(SetRegionAck.regionId).toEqual(assertItem.regionAck[index].regionId);
                    });
                });

                describe(`SET SPECTRAL REQUIREMENTS on ${CARTA.RegionType[region.regionInfo.regionType]} region #${assertItem.regionAck[index].regionId}`, () => {
                    let SpectralProfileData: any;
                    test(`SPECTRAL_PROFILE_DATA should return within ${regionTimeout} ms`, async () => {
                        msgController.setSpectralRequirements(assertItem.setSpectralRequirements[index]);
                        SpectralProfileData = await Stream(CARTA.SpectralProfileData, 1);
                        SpectralProfileData = SpectralProfileData[0];
                    }, regionTimeout);

                    test(`SPECTRAL_PROFILE_DATA.region_id = ${assertItem.spectralProfileData[index].regionId}`, () => {
                        expect(SpectralProfileData.regionId).toEqual(assertItem.spectralProfileData[index].regionId);
                    });

                    test(`SPECTRAL_PROFILE_DATA.progress = ${assertItem.spectralProfileData[index].progress}`, () => {
                        expect(SpectralProfileData.progress).toEqual(assertItem.spectralProfileData[index].progress);
                    });

                    test("Assert SPECTRAL_PROFILE_DATA.profiles of CARTA.StatsType.Mean", () => {
                        let _meanProfile = SpectralProfileData.profiles.find(f => f.statsType === CARTA.StatsType.Mean);
                        let _assertProfile = assertItem.spectralProfileData[index].profile.find(f => f.statsType === CARTA.StatsType.Mean);
                        let v0 = ProtobufProcessing.ProcessSpectralProfile(_meanProfile,1);
                        expect(v0.values.length).toEqual(_assertProfile.profileLength);
                        _assertProfile.checkValues.map(assertVal => {
                            if (isNaN(assertVal.value)) {
                                expect(v0.values[assertVal.index]).toEqual(assertVal.value);
                            } else {
                                expect(v0.values[assertVal.index]).toBeCloseTo(assertVal.value, assertItem.precisionDigits);
                            }
                        });          
                    });

                    test("Assert other SPECTRAL_PROFILE_DATA.profiles", () => {
                        assertItem.spectralProfileData[index].profile.map(profile => {
                            let _returnedProfile = SpectralProfileData.profiles.find(f => f.statsType === profile.statsType);
                            let v0 = ProtobufProcessing.ProcessSpectralProfile(_returnedProfile,1);
                            profile.checkValues.map(assertVal => {
                                if (isNaN(assertVal.value)) {
                                    expect(v0.values[assertVal.index]).toEqual(assertVal.value);
                                } else {
                                    expect(v0.values[assertVal.index]).toBeCloseTo(assertVal.value, assertItem.precisionDigits);
                                }
                            });
                        });
                    });
                });
            });
    
            afterAll(() => msgController.closeConnection());
        });
    });
});