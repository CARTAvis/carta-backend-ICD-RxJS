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
                regionType: CARTA.RegionType.POLYGON,
                controlPoints: [{x: 547, y: 284}, {x: 543, y: 279}, {x: 551, y: 275}],
                rotation: 0.0,
            }
        },
        {
            fileId: 0,
            regionId: -1,
            regionInfo: {
                regionType: CARTA.RegionType.POLYGON,
                controlPoints: [{x: 647, y: 272}, {x: 630, y: 262}, {x: 648, y: 253}],
                rotation: 0.0,
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
    ],
    spectralProfileData: [
        {
            regionId: 1,
            progress: 1,
            profile: [
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sum,
                    checkValues: [{ index: 10, value: 0.3020695  }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.FluxDensity,
                    checkValues: [{ index: 10, value: 0.01387782  }],
                },
                {
                    coordinate: "z",
                    profileLength: 25,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 10, value: 0.01313346 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.RMS,
                    checkValues: [{ index: 10, value: 0.01345087 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Sigma,
                    checkValues: [{ index: 10, value: 0.00297016 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.SumSq,
                    checkValues: [{ index: 10, value: 0.0041613 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Min,
                    checkValues: [{ index: 10, value: 0.00871281 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Max,
                    checkValues: [{ index: 10, value: 0.02121421 }],
                },
                {
                    coordinate: "z",
                    statsType: CARTA.StatsType.Extrema,
                    checkValues: [{ index: 10, value: 0.02121421 }],
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
describe("REGION_SPECTRAL_PROFILE_POLYGON: Testing spectral profiler with polygon regions", () => {
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