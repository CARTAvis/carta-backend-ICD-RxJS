import { CARTA } from "carta-protobuf";
import { checkConnection, Stream} from './myClient';
import { MessageController } from "./MessageController";
import config from "./config.json";
import { execSync } from "child_process";

let testServerUrl = config.serverURL0;
let testSubdirectory = config.path.QA;
let regionSubdirectory = config.path.region;
let saveSubdirectory = config.path.save;
let saveSubdirectoryRedHat9 = config.path.save_rhel9;
let connectTimeout = config.timeout.connection;
let openFileTimeout: number = config.timeout.openFile;
let importTimeout = config.timeout.import;
let exportTimeout = config.timeout.export;

interface AssertItem {
    openFile: CARTA.IOpenFile;
    precisionDigits: number;
    setRegion: CARTA.ISetRegion[];
    exportRegion: CARTA.IExportRegion[];
    exportRegionAck: CARTA.IExportRegionAck[];
    importRegion: CARTA.IImportRegion[];
    regionType: string[];
};

let assertItem: AssertItem = {
    openFile:
    {
        directory: testSubdirectory,
        file: "M17_SWex.fits",
        fileId: 0,
        hdu: "",
        renderMode: CARTA.RenderMode.RASTER,
    },
    precisionDigits: 4,
    regionType:["Point", "Rectangle", "Ellipse", "Polygon"],
    setRegion:
    [
        {
            fileId: 0,
            regionId: -1,   // 1
            regionInfo: {
                regionType: CARTA.RegionType.POINT,
                rotation: 0,
                controlPoints: [{ x: 262.071716, y: 377.173907 }],
            },
        },
        {
            fileId: 0,
            regionId: -1,   // 2
            regionInfo: {
                regionType: CARTA.RegionType.RECTANGLE,
                rotation: 0,
                controlPoints: [{ x: 224.531619, y: 503.871734 }, { x: 154.852900, y: 319.090825 }],
            },
        },
        {
            fileId: 0,
            regionId: -1,   // 3
            regionInfo: {
                regionType: CARTA.RegionType.ELLIPSE,
                rotation: 0,
                controlPoints: [{ x: 405.191764, y: 628.238373 }, { x: 105.581523, y: 79.772706 }],
            },
        },
        {
            fileId: 0,
            regionId: -1,   // 4
            regionInfo: {
                regionType: CARTA.RegionType.POLYGON,
                rotation: 0,
                controlPoints: [{ x: 419.270873, y: 367.788882 }, { x: 330.113142, y: 285.669920 }, { x: 431.002154, y: 177.742140 }],
            },
        },
    ],
    exportRegion:
    [
        {
            coordType: CARTA.CoordinateType.WORLD,
            file: "M17_SWex_test_world.reg",
            fileId: 0,
            type: CARTA.FileType.DS9_REG,
            regionStyles: {
                '1': { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" },
                '2': { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" },
                '3': { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" },
                '4': { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" },
            },
        },
    ],
    exportRegionAck:
    [
        {
            success: true,
            contents: [],
        },
    ],
    importRegion:
    [
        {
            contents: [],
            file: "M17_SWex_test_world.reg",
        },
    ],
};

let platformOS: String;
let basepath: string;
let isRedHat9: boolean;
describe("FITS_DS9_REGION_EXPORT_IMPORT_MATCHING.test.ts: check the difference (precision) exported/imported region", () => {
    const msgController = MessageController.Instance;
    describe(`Register a session`, () => {
        beforeAll(async ()=> {
            let registerViewerAck = await msgController.connect(testServerUrl);
            platformOS = registerViewerAck.platformStrings.platform;
            if (platformOS === "Linux"){
                let Response = String(execSync('lsb_release -a',{encoding: 'utf-8'}));
                isRedHat9 = Response.includes("Red Hat Enterprise Linux 9.0");
            } else {
                isRedHat9 = false
            }
        }, connectTimeout);

        checkConnection();
        test(`Get basepath`, async () => {
            let fileListResponse = await msgController.getFileList("$BASE",0);
            basepath = fileListResponse.directory;
            assertItem.openFile.directory = basepath + "/" + assertItem.openFile.directory;
        });

        describe(`Go to "${testSubdirectory}" folder and open image "${assertItem.openFile.file} and set regions"`, () => {
            let OpenFileAck: any;
            let RegionHistogramData: any
            test(`OPEN_FILE_ACK and REGION_HISTOGRAM_DATA should arrive within ${openFileTimeout} ms`, async () => {
                OpenFileAck  = await msgController.loadFile(assertItem.openFile);
                RegionHistogramData = await Stream(CARTA.RegionHistogramData,1);

                expect(OpenFileAck.success).toBe(true);
                expect(OpenFileAck.fileInfo.name).toEqual(assertItem.openFile.file);
            }, openFileTimeout);

            test(`Set Regions`, async () => {
                let SetRegionAck: any;
                for (let region of assertItem.setRegion) {
                    SetRegionAck = await msgController.setRegion(region.fileId, region.regionId, region.regionInfo);
                    expect(SetRegionAck.success).toEqual(true);
                }
            });

            describe(`Export "${assertItem.exportRegion[0].file}"`, () => {
                let exportRegionAck: any;
                test(`EXPORT_REGION_ACK should return within ${importTimeout}ms`, async () => {
                    let regionStyle = new Map<number, CARTA.IRegionStyle>().set(1, { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" });
                        regionStyle.set(2, { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" });
                        regionStyle.set(3, { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" });
                        regionStyle.set(4, { color: "#2EE6D6", dashList: [], lineWidth: 2, name: "" });
                    
                        if (isRedHat9 === false) {
                            assertItem.exportRegion[0].directory = basepath + "/" + saveSubdirectory; 
                        } else if (isRedHat9 === true) {
                            assertItem.exportRegion[0].directory = basepath + "/" + saveSubdirectoryRedHat9; 
                        }
                        exportRegionAck = await msgController.exportRegion(assertItem.exportRegion[0].directory, assertItem.exportRegion[0].file, assertItem.exportRegion[0].type, assertItem.exportRegion[0].coordType, assertItem.exportRegion[0].fileId, regionStyle);
                }, exportTimeout);

                test(`EXPORT_REGION_ACK.success = ${assertItem.exportRegionAck[0].success}`, () => {
                    expect(exportRegionAck.success).toBe(assertItem.exportRegionAck[0].success);
                });
    
                test(`EXPORT_REGION_ACK.contents = [${assertItem.exportRegionAck[0].contents}]`, () => {
                    expect(exportRegionAck.contents).toEqual(assertItem.exportRegionAck[0].contents);
                });
            });

            describe(`Import "${assertItem.importRegion[0].file}"`, () => {
                let importRegionAck: any;
            });
        });

        afterAll(() => msgController.closeConnection());
    });
});