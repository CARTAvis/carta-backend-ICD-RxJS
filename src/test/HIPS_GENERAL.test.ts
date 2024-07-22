import { CARTA } from "carta-protobuf";
import { checkConnection, Stream} from './myClient';
import { MessageController } from "./MessageController";
import config from "./config.json";

let testServerUrl: string = config.serverURL0;
let testSubdirectory: string = config.path.QA;
let connectTimeout: number = config.timeout.connection;
let hipsTimeout: number = config.timeout.hips;


interface AssertItem {
    remoteFileRequest: CARTA.IRemoteFileRequest;
    remoteFileResponse: CARTA.IRemoteFileResponse;
    // filelist: CARTA.IFileListRequest;
    // openFile: CARTA.IOpenFile;
    // addTilesReq: CARTA.IAddRequiredTiles[];
    // setCursor: CARTA.ISetCursor[];
    // setSpatialReq: CARTA.ISetSpatialRequirements[];
};

let assertItem: AssertItem = {
    remoteFileRequest: {
        coordsys: "icrs",
        fileId: 0,
        fov: 0.5,
        height: 80,
        width: 80,
        hips: "xcatdb/P/XMM/PN/eb2",
        object: "M31",
        projection: "SIN",
        rotationAngle: 0
    },
    remoteFileResponse: {
        message: "File opened successfully",
        openFileAck: {
            beamTable: [],
            fileInfo: {
                name: "remote_file.fits"
            },
            success: true
        },
        success: true
    },
    // filelist: { directory: testSubdirectory },
    // openFile: {
    //     directory: testSubdirectory,
    //     file: "HD163296_CO_2_1.fits",
    //     hdu: "0",
    //     fileId: 0,
    //     renderMode: CARTA.RenderMode.RASTER,
    // },
    // addTilesReq: [
    //     {
    //         fileId: 0,
    //         compressionQuality: 11,
    //         compressionType: CARTA.CompressionType.ZFP,
    //         tiles: [0],
    //     },
    // ],
    // setCursor: [
    //     {
    //         fileId: 0,
    //         point: { x: 1, y: 1 },
    //     },
    // ],
    // setSpatialReq: [
    //     {
    //         fileId: 0,
    //         regionId: 0,
    //         spatialProfiles: [{coordinate:"x", mip:1}, {coordinate:"y", mip:1}]
    //     },
    // ],
};

let basepath: string;
describe("HIPS_GENERAL: Testing the HIPS ICD message", () => {
    const msgController = MessageController.Instance;
    describe(`Register a session`, () => {
        beforeAll(async ()=> {
            await msgController.connect(testServerUrl);
        }, connectTimeout);

        checkConnection();
        test(`Get basepath and modify the directory path`, async () => {
            let fileListResponse = await msgController.getFileList("$BASE",0);
            basepath = fileListResponse.directory;
        });

        let regionHistogramData = [];
        test(`Send the HIPS request and receive the response`, async () => {
            let regionHistogramDataPromise = new Promise((resolve)=>{
                msgController.histogramStream.subscribe({
                    next: (data) => {
                        regionHistogramData.push(data)
                        resolve(regionHistogramData)
                    }
                })
            });
            let hipsResponse = await msgController.requestRemoteFile(assertItem.remoteFileRequest);
            let regionHistogramDataResponse = await regionHistogramDataPromise;
            console.log(hipsResponse);
            expect(hipsResponse.success).toEqual(assertItem.remoteFileResponse.success);
            console.log(regionHistogramDataResponse);
        }, hipsTimeout);

        afterAll(() => msgController.closeConnection());
    });
})