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
    message?: string;
    severity?: number;
    tags?: string[];
}
interface ISpectralProfileData extends CARTA.ISpectralProfileData {
    profile?: IProfilesExt[];
}
interface AssertItem {
    registerViewer: CARTA.IRegisterViewer;
    openFile: CARTA.IOpenFile[];
    setCursor: CARTA.ISetCursor;
    addRequiredTiles: CARTA.IAddRequiredTiles;
    setImageChannels: CARTA.ISetImageChannels[];
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
    openFile: [
        {
            directory: testSubdirectory,
            file: "HH211_IQU.fits",
            fileId: 0,
            hdu: "",
            renderMode: CARTA.RenderMode.RASTER,
        },
        {
            directory: testSubdirectory,
            file: "HH211_IQU.hdf5",
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
    setImageChannels: [
        {
            fileId: 0,
            channel: 0,
            requiredTiles: {
                fileId: 0,
                tiles: [0],
                compressionType: CARTA.CompressionType.ZFP,
                compressionQuality: 11,
            },
        },
        {
            fileId: 0,
            channel: 0,
            stokes: 1,
            requiredTiles: {
                fileId: 0,
                tiles: [0],
                compressionType: CARTA.CompressionType.ZFP,
                compressionQuality: 11,
            },
        },
    ],
    setRegion: [
        {
            fileId: 0,
            regionId: -1,
            regionInfo: {
                regionType: CARTA.RegionType.RECTANGLE,
                controlPoints: [{ x: 522, y: 522 }, { x: 10, y: 10 }],
                rotation: 0.0,
            },
        },
    ],
    regionAck: [
        {
            success: true,
            regionId: 1,
        },
    ],
    setSpectralRequirements: [
        {
            fileId: 0,
            regionId: 1,
            spectralProfiles: [
                {
                    coordinate: "z",
                    statsTypes: [CARTA.StatsType.Mean],
                }
            ],
        },
        {
            fileId: 0,
            regionId: 1,
            spectralProfiles: [
                {
                    coordinate: "z",
                    statsTypes: [CARTA.StatsType.Mean],
                }
            ],
        },
        {
            fileId: 0,
            regionId: 1,
            spectralProfiles: [
                {
                    coordinate: "Uz",
                    statsTypes: [CARTA.StatsType.Mean],
                }
            ],
        },
        {
            fileId: 0,
            regionId: 1,
            spectralProfiles: [
                {
                    coordinate: "Vz",
                    statsTypes: [CARTA.StatsType.Mean],
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
                    profileLength: 5,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 2, value: 0.035725489635913335 }],
                },
            ],
        },
        {
            regionId: 1,
            progress: 1,
            profile: [
                {
                    coordinate: "z",
                    profileLength: 5,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 2, value: -0.0004460110767806237 }],
                },
            ],
        },
        {
            regionId: 1,
            progress: 1,
            profile: [
                {
                    coordinate: "Uz",
                    profileLength: 5,
                    statsType: CARTA.StatsType.Mean,
                    checkValues: [{ index: 2, value: -0.00010940432089077795 }],
                },
            ],
        },
        {
            regionId: 1,
            progress: 1,
            profile: [
                {
                    coordinate: "Vz",
                    message: "Spectral requirements not valid for region id 1",
                    severity: 3,
                    tags: ["spectral"],
                },
            ],
        },
    ],
    precisionDigits: 4,
}

let basepath: string;
describe("REGION_SPECTRAL_PROFILE_STOKES: Testing spectral profiler with regions and Stokes", () => {
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

                    describe(`Change to stokes = ${assertItem.setImageChannels[1].stokes}`, () => {
                        let SpectralProfileData: any;
                        beforeAll(async () => {
                            msgController.setChannels(assertItem.setImageChannels[1]);
                            SpectralProfileData = await Stream(CARTA.SpectralProfileData, 1);
                        });
    
                        test(`SPECTRAL_PROFILE_DATA.region_id = ${assertItem.spectralProfileData[1].regionId}`, () => {
                            expect(SpectralProfileData[0].regionId).toEqual(assertItem.spectralProfileData[1].regionId);
                        });
    
                        test(`SPECTRAL_PROFILE_DATA.progress = ${assertItem.spectralProfileData[1].progress}`, () => {
                            expect(SpectralProfileData[0].progress).toEqual(assertItem.spectralProfileData[1].progress);
                        });
    
                        test("Assert SPECTRAL_PROFILE_DATA.profiles of CARTA.StatsType.Mean", () => {
                            let _meanProfile = SpectralProfileData[0].profiles.find(f => f.statsType === CARTA.StatsType.Mean);
                            expect(_meanProfile.coordinate).toEqual(assertItem.spectralProfileData[1].profile[0].coordinate);
                            let v0 = ProtobufProcessing.ProcessSpectralProfile(_meanProfile,1);
                            expect(v0.values.length).toEqual(assertItem.spectralProfileData[1].profile[0].profileLength);
                            expect(v0.statsType).toEqual(assertItem.spectralProfileData[1].profile[0].statsType);
                            assertItem.spectralProfileData[1].profile[0].checkValues.map(assertVal => {
                                if (isNaN(assertVal.value)) {
                                    expect(isNaN(_meanProfile.values[assertVal.index])).toBe(true);
                                } else {
                                    expect(v0.values[assertVal.index]).toBeCloseTo(assertVal.value, assertItem.precisionDigits);
                                }
                            });
                        });
                    });

                    describe(`Set coordinate = ${assertItem.setSpectralRequirements[2].spectralProfiles[0].coordinate}`, () => {
                        let SpectralProfileData: any;
                        test(`SPECTRAL_PROFILE_DATA.region_id = ${assertItem.spectralProfileData[2].regionId}`, async () => {
                            msgController.setSpectralRequirements(assertItem.setSpectralRequirements[2]);
                            SpectralProfileData = await Stream(CARTA.SpectralProfileData, 1);
                            expect(SpectralProfileData[0].regionId).toEqual(assertItem.spectralProfileData[2].regionId);
                        });
    
                        test(`SPECTRAL_PROFILE_DATA.progress = ${assertItem.spectralProfileData[2].progress}`, () => {
                            expect(SpectralProfileData[0].progress).toEqual(assertItem.spectralProfileData[2].progress);
                        });
    
                        test("Assert SPECTRAL_PROFILE_DATA.profiles of CARTA.StatsType.Mean", () => {
                            let _meanProfile = SpectralProfileData[0].profiles.find(f => f.statsType === CARTA.StatsType.Mean);
                            expect(_meanProfile.coordinate).toEqual(assertItem.spectralProfileData[2].profile[0].coordinate);
                            let v0 = ProtobufProcessing.ProcessSpectralProfile(_meanProfile,1);
                            expect(v0.values.length).toEqual(assertItem.spectralProfileData[2].profile[0].profileLength);
                            expect(v0.statsType).toEqual(assertItem.spectralProfileData[2].profile[0].statsType);
                            assertItem.spectralProfileData[2].profile[0].checkValues.map(assertVal => {
                                if (isNaN(assertVal.value)) {
                                    expect(isNaN(_meanProfile.values[assertVal.index])).toBe(true);
                                } else {
                                    expect(v0.values[assertVal.index]).toBeCloseTo(assertVal.value, assertItem.precisionDigits);
                                }
                            });
                        });
                    });

                    describe(`Set coordinate = ${assertItem.setSpectralRequirements[3].spectralProfiles[0].coordinate}`, () => {
                        let ErrorData: any;
                        test(`ERROR_DATA should return within ${regionTimeout} ms`, async () => {
                            await msgController.setSpectralRequirements(assertItem.setSpectralRequirements[3]);
                            ErrorData = await Stream(CARTA.ErrorData, 1);
                        }, regionTimeout);
    
                        test(`ERROR_DATA.message = "${assertItem.spectralProfileData[3].profile[0].message}"`, () => {
                            expect(ErrorData[0].message).toEqual(assertItem.spectralProfileData[3].profile[0].message);
                        });
    
                        test(`ERROR_DATA.severity = ${assertItem.spectralProfileData[3].profile[0].severity}`, () => {
                            expect(ErrorData[0].severity).toEqual(assertItem.spectralProfileData[3].profile[0].severity);
                        });
    
                        test(`ERROR_DATA.tags = ["${assertItem.spectralProfileData[3].profile[0].tags.join(`", "`)}"]`, () => {
                            expect(ErrorData[0].tags).toEqual(assertItem.spectralProfileData[3].profile[0].tags);
                        });
                    });
                });
            });
    
            afterAll(() => msgController.closeConnection());
        });
    });
});