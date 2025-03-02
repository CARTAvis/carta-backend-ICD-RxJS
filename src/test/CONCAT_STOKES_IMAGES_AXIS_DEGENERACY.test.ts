import { CARTA } from "carta-protobuf";
import config from "./config.json";
import { checkConnection } from './myClient';
import {MessageController} from "./MessageController";

let testServerUrl: string = config.serverURL0;
let testSubdirectory: string = config.path.QA;
let connectTimeout: number = config.timeout.connection;
let openFileTimeout = config.timeout.openFile;
let concatStokeTimeout = config.timeout.concatStokes;

interface ConcatStokesFilesAckExt extends CARTA.IConcatStokesFilesAck {
    OpenFileAckBeamLength: number
}

interface AssertItem {
    filelist: CARTA.IFileListRequest;
    fileInfoReq: CARTA.IFileInfoRequest[];
    ConcatReq: CARTA.IConcatStokesFiles;
    RegionHistogramDataResponseIQUV: CARTA.IRegionHistogramData;
    ConcatReqIV: CARTA.IConcatStokesFiles;
    RegionHistogramDataResponseIV: CARTA.IRegionHistogramData;
    ConcatReqQU: CARTA.IConcatStokesFiles;
    RegionHistogramDataResponseQU: CARTA.IRegionHistogramData;
    ConcatReqIQU: CARTA.IConcatStokesFiles;
    RegionHistogramDataResponseIQU: CARTA.IRegionHistogramData;
    ConcatReqQUV: CARTA.IConcatStokesFiles;
    RegionHistogramDataResponseQUV: CARTA.IRegionHistogramData;
    ConcatResponse: ConcatStokesFilesAckExt[];
};

let assertItem: AssertItem = {
    filelist: { directory: testSubdirectory },
    fileInfoReq:[
        {
            file:"IRCp10216_sci.spw0.cube.I.dropdeg.manual.pbcor.fits",
            hdu: "",
        },
        {
            file:"IRCp10216_sci.spw0.cube.Q.dropdeg.manual.pbcor.fits",
            hdu: "",
        },
        {
            file:"IRCp10216_sci.spw0.cube.U.dropdeg.manual.pbcor.fits",
            hdu: "",
        },
        {
            file:"IRCp10216_sci.spw0.cube.V.dropdeg.manual.pbcor.fits",
            hdu: "",
        },
    ],
    ConcatReq:{
        fileId: 0,
        renderMode: 0,
        stokesFiles:[
            {
                directory: testSubdirectory,
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.V.dropdeg.manual.pbcor.fits',
                polarizationType: 4
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.U.dropdeg.manual.pbcor.fits',
                polarizationType: 3
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.Q.dropdeg.manual.pbcor.fits',
                polarizationType: 2
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.I.dropdeg.manual.pbcor.fits',
                polarizationType: 1
            },
        ],
    },
    RegionHistogramDataResponseIQUV: {
        progress: 1,
        regionId: -1,
        config: {
            numBins: -1
        },
        histograms: {
            binWidth: 0.004779201466590166,
            firstBinCenter: -0.11032065749168396,
            numBins: 256,
            stdDev: 0.05368401551544911,
            mean: 0.0014072911570091893
        }
    },
    ConcatReqIV: {
        fileId: 0,
        renderMode: 0,
        stokesFiles:[
            {
                directory: testSubdirectory,
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.V.dropdeg.manual.pbcor.fits',
                polarizationType: 4
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.I.dropdeg.manual.pbcor.fits',
                polarizationType: 1
            },
        ],
    },
    RegionHistogramDataResponseIV: {
        progress: 1,
        regionId: -1,
        config: {
            numBins: -1
        },
        histograms: {
            binWidth: 0.004779201466590166,
            firstBinCenter: -0.11032065749168396,
            numBins: 256,
            stdDev: 0.05368401551544911,
            mean: 0.0014072911570091893
        }
    },
    ConcatReqQU: {
        fileId: 0,
        renderMode: 0,
        stokesFiles:[
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.U.dropdeg.manual.pbcor.fits',
                polarizationType: 3
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.Q.dropdeg.manual.pbcor.fits',
                polarizationType: 2
            },
        ],
    },
    RegionHistogramDataResponseQU: {
        progress: 1,
        regionId: -1,
        config: {
            numBins: -1
        },
        histograms: {
            binWidth: 0.00016267175669781864,
            firstBinCenter: -0.018377140164375305,
            numBins: 256,
            stdDev: 0.0038693415380174558,
            mean: -0.00003742659352908538
        }
    },
    ConcatReqIQU: 
    {
        fileId: 0,
        renderMode: 0,
        stokesFiles:[
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.U.dropdeg.manual.pbcor.fits',
                polarizationType: 3
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.Q.dropdeg.manual.pbcor.fits',
                polarizationType: 2
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.I.dropdeg.manual.pbcor.fits',
                polarizationType: 1
            },
        ],
    },
    RegionHistogramDataResponseIQU: {
        progress: 1,
        regionId: -1,
        config: {
            numBins: -1
        },
        histograms: {
            binWidth: 0.004779201466590166,
            firstBinCenter: -0.11032065749168396,
            numBins: 256,
            stdDev: 0.05368401551544911,
            mean: 0.0014072911570091893
        }
    },
    ConcatReqQUV: {
        fileId: 0,
        renderMode: 0,
        stokesFiles:[
            {
                directory: testSubdirectory,
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.V.dropdeg.manual.pbcor.fits',
                polarizationType: 4
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.U.dropdeg.manual.pbcor.fits',
                polarizationType: 3
            },
            {
                directory: testSubdirectory, 
                hdu:"",
                file:'IRCp10216_sci.spw0.cube.Q.dropdeg.manual.pbcor.fits',
                polarizationType: 2
            },
        ],
    },
    RegionHistogramDataResponseQUV: {
        progress: 1,
        regionId: -1,
        config: {
            numBins: -1
        },
        histograms: {
            binWidth: 0.00016267175669781864,
            firstBinCenter: -0.018377140164375305,
            numBins: 256,
            stdDev: 0.0038693415380174558,
            mean: -0.00003742659352908538
        }
    },
    ConcatResponse:[
    {
        success: true,
        openFileAck: {
            success: true,
            fileInfo: {
                name:"IRCp10216_sci.spw0.cube.hypercube_IQUV.dropdeg.manual.pbcor.fits"
            },
            fileInfoExtended:{
                depth: 480,
                dimensions: 4,
                height: 256,
                stokes: 4,
                width: 256,
            },
        },
        OpenFileAckBeamLength: 1920,
    },
    {
        success: true,
        openFileAck: {
            success: true,
            fileInfo: {
                name:"IRCp10216_sci.spw0.cube.hypercube_IV.dropdeg.manual.pbcor.fits"
            },
            fileInfoExtended:{
                depth: 480,
                dimensions: 4,
                height: 256,
                stokes: 2,
                width: 256,
            },
        },
        OpenFileAckBeamLength: 960,
    },
    {
        success: true,
        openFileAck: {
            success: true,
            fileInfo: {
                name:"IRCp10216_sci.spw0.cube.hypercube_QU.dropdeg.manual.pbcor.fits"
            },
            fileInfoExtended:{
                depth: 480,
                dimensions: 4,
                height: 256,
                stokes: 2,
                width: 256,
            },
        },
        OpenFileAckBeamLength: 960,
    },
    {
        success: true,
        openFileAck: {
            success: true,
            fileInfo: {
                name:"IRCp10216_sci.spw0.cube.hypercube_IQU.dropdeg.manual.pbcor.fits"
            },
            fileInfoExtended:{
                depth: 480,
                dimensions: 4,
                height: 256,
                stokes: 3,
                width: 256,
            },
        },
        OpenFileAckBeamLength: 1440,
    },
    {
        success: true,
        openFileAck: {
            success: true,
            fileInfo: {
                name:"IRCp10216_sci.spw0.cube.hypercube_QUV.dropdeg.manual.pbcor.fits"
            },
            fileInfoExtended:{
                depth: 480,
                dimensions: 4,
                height: 256,
                stokes: 3,
                width: 256,
            },
        },
        OpenFileAckBeamLength: 1440,
    }
    ]
};

describe("CONCAT_STOKES_IMAGES_AXIS_DEGENERACY test: Concatenate different axis-degeneracy stokes images into a single image.", () => {
    const msgController = MessageController.Instance;
    beforeAll(async ()=> {
        await msgController.connect(testServerUrl);
    }, connectTimeout);

    checkConnection();

    describe(`Case 1: Combine I,Q,U,V |`,() => {
        test(`(Step 1) Assert FileListRequest |`, async () => {
            let FileListResponse = await msgController.getFileList(assertItem.filelist.directory, 0);
            expect(FileListResponse.success).toEqual(true);
        });

        assertItem.fileInfoReq.map((input,index) => {
            test(`FILE_INFO_RESPONSE-${index+1} should arrive within ${openFileTimeout} ms" | `, async () => {
                let FileInfoResponse = await msgController.getFileInfo(testSubdirectory, input.file, input.hdu)
                expect(FileInfoResponse.success).toEqual(true);
            }, openFileTimeout);
        });

        let ConcatStokesResponse: any = [];
        test(`(Step 2) Modify assert concatenate directory and request CONCAT_STOKES_FILES_ACK within ${concatStokeTimeout} ms | `,async() => {
            assertItem.ConcatReq.stokesFiles.map((input,index) => {
                assertItem.ConcatReq.stokesFiles[index].directory = testSubdirectory;
            });
            msgController.closeFile(-1);
            let regionHistogramDataArray = [];
            let regionHistogramDataPromise = new Promise((resolve) => {
                msgController.histogramStream.subscribe({
                    next: (data) => {
                        regionHistogramDataArray.push(data)
                        resolve(regionHistogramDataArray)
                    }
                })
            });
            ConcatStokesResponse = await msgController.loadStokeFiles(assertItem.ConcatReq.stokesFiles, assertItem.ConcatReq.fileId, assertItem.ConcatReq.renderMode);
            let RegionHistogramData = await regionHistogramDataPromise;

            expect(RegionHistogramData[0].regionId).toEqual(assertItem.RegionHistogramDataResponseIQUV.regionId);
            expect(RegionHistogramData[0].progress).toEqual(assertItem.RegionHistogramDataResponseIQUV.progress);
            expect(RegionHistogramData[0].config.numBins).toEqual(assertItem.RegionHistogramDataResponseIQUV.config.numBins);
            expect(RegionHistogramData[0].histograms.binWidth).toBeCloseTo(assertItem.RegionHistogramDataResponseIQUV.histograms.binWidth, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.firstBinCenter).toBeCloseTo(assertItem.RegionHistogramDataResponseIQUV.histograms.firstBinCenter, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.mean).toBeCloseTo(assertItem.RegionHistogramDataResponseIQUV.histograms.mean, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.numBins).toEqual(assertItem.RegionHistogramDataResponseIQUV.histograms.numBins);
            expect(RegionHistogramData[0].histograms.stdDev).toBeCloseTo(assertItem.RegionHistogramDataResponseIQUV.histograms.stdDev, assertItem.precisionDigits); 
        },concatStokeTimeout);

        test(`(Step 3) Check CONCAT_STOKES_FILES_ACK response | `,() => {
            expect(ConcatStokesResponse.success).toEqual(assertItem.ConcatResponse[0].success);
            expect(ConcatStokesResponse.openFileAck.success).toEqual(assertItem.ConcatResponse[0].openFileAck.success);
            expect(ConcatStokesResponse.openFileAck.beamTable.length).toEqual(assertItem.ConcatResponse[0].OpenFileAckBeamLength);
            expect(ConcatStokesResponse.openFileAck.fileInfo.name).toEqual(assertItem.ConcatResponse[0].openFileAck.fileInfo.name);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.dimensions).toEqual(assertItem.ConcatResponse[0].openFileAck.fileInfoExtended.dimensions);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.stokes).toEqual(assertItem.ConcatResponse[0].openFileAck.fileInfoExtended.stokes);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.width).toEqual(assertItem.ConcatResponse[0].openFileAck.fileInfoExtended.width);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.height).toEqual(assertItem.ConcatResponse[0].openFileAck.fileInfoExtended.height);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.depth).toEqual(assertItem.ConcatResponse[0].openFileAck.fileInfoExtended.depth);
        })
    });

    describe(`Case 2: Combine I & V |`,() => {
        test(`(Step 1) Assert FileListRequest |`, async()=>{
            let FileListResponse = await msgController.getFileList(assertItem.filelist.directory, 0);
            expect(FileListResponse.success).toEqual(true);
        });

        let FileInfoResponse: any = [];
        let inputIndex = [0,3];
        inputIndex.map((input,index) => {
            test(`FILE_INFO_RESPONSE-${index+1} should arrive within ${openFileTimeout} ms" | `, async () => {
                FileInfoResponse = await msgController.getFileInfo(testSubdirectory, assertItem.fileInfoReq[input].file, assertItem.fileInfoReq[input].hdu)
                expect(FileInfoResponse.success).toEqual(true);
            }, openFileTimeout);
        });

        let ConcatStokesResponse: any = [];
        test(`(Step 2) Modify assert concatenate directory and request CONCAT_STOKES_FILES_ACK within ${concatStokeTimeout} ms | `,async()=>{
            assertItem.ConcatReqIV.stokesFiles.map((input,index) => {
                assertItem.ConcatReqIV.stokesFiles[index].directory = testSubdirectory;
            });
            msgController.closeFile(-1);
            let regionHistogramDataArray = [];
            let regionHistogramDataPromise = new Promise((resolve) => {
                msgController.histogramStream.subscribe({
                    next: (data) => {
                        regionHistogramDataArray.push(data)
                        resolve(regionHistogramDataArray)
                    }
                })
            });
            ConcatStokesResponse = await msgController.loadStokeFiles(assertItem.ConcatReqIV.stokesFiles, assertItem.ConcatReqIV.fileId, assertItem.ConcatReqIV.renderMode);
            let RegionHistogramData = await regionHistogramDataPromise;

            expect(RegionHistogramData[0].regionId).toEqual(assertItem.RegionHistogramDataResponseIV.regionId);
            expect(RegionHistogramData[0].progress).toEqual(assertItem.RegionHistogramDataResponseIV.progress);
            expect(RegionHistogramData[0].config.numBins).toEqual(assertItem.RegionHistogramDataResponseIV.config.numBins);
            expect(RegionHistogramData[0].histograms.binWidth).toBeCloseTo(assertItem.RegionHistogramDataResponseIV.histograms.binWidth, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.firstBinCenter).toBeCloseTo(assertItem.RegionHistogramDataResponseIV.histograms.firstBinCenter, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.mean).toBeCloseTo(assertItem.RegionHistogramDataResponseIV.histograms.mean, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.numBins).toEqual(assertItem.RegionHistogramDataResponseIV.histograms.numBins);
            expect(RegionHistogramData[0].histograms.stdDev).toBeCloseTo(assertItem.RegionHistogramDataResponseIV.histograms.stdDev, assertItem.precisionDigits); 
        },concatStokeTimeout);

        test(`(Step 3) Check CONCAT_STOKES_FILES_ACK response | `,()=>{
            expect(ConcatStokesResponse.success).toEqual(assertItem.ConcatResponse[1].success);
            expect(ConcatStokesResponse.openFileAck.success).toEqual(assertItem.ConcatResponse[1].openFileAck.success);
            expect(ConcatStokesResponse.openFileAck.beamTable.length).toEqual(assertItem.ConcatResponse[1].OpenFileAckBeamLength);
            expect(ConcatStokesResponse.openFileAck.fileInfo.name).toEqual(assertItem.ConcatResponse[1].openFileAck.fileInfo.name);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.dimensions).toEqual(assertItem.ConcatResponse[1].openFileAck.fileInfoExtended.dimensions);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.stokes).toEqual(assertItem.ConcatResponse[1].openFileAck.fileInfoExtended.stokes);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.width).toEqual(assertItem.ConcatResponse[1].openFileAck.fileInfoExtended.width);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.height).toEqual(assertItem.ConcatResponse[1].openFileAck.fileInfoExtended.height);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.depth).toEqual(assertItem.ConcatResponse[1].openFileAck.fileInfoExtended.depth);
        })
    });

    describe(`Case 3: Combine Q & U |`,() => {
        test(`(Step 1) Assert FileListRequest |`, async()=>{
            let FileListResponse = await msgController.getFileList(assertItem.filelist.directory, 0);
            expect(FileListResponse.success).toEqual(true);
        });

        let FileInfoResponse: any = [];
        let inputIndex = [1,2];
        inputIndex.map((input,index) => {
            test(`FILE_INFO_RESPONSE-${index+1} should arrive within ${openFileTimeout} ms" | `, async () => {
                FileInfoResponse = await msgController.getFileInfo(testSubdirectory, assertItem.fileInfoReq[input].file, assertItem.fileInfoReq[input].hdu)
                expect(FileInfoResponse.success).toEqual(true);
            }, openFileTimeout);
        });

        let ConcatStokesResponse: any = [];
        test(`(Step 2) Modify assert concatenate directory and request CONCAT_STOKES_FILES_ACK within ${concatStokeTimeout} ms | `,async()=>{
            assertItem.ConcatReqQU.stokesFiles.map((input,index) => {
                assertItem.ConcatReqQU.stokesFiles[index].directory = testSubdirectory;
            });
            msgController.closeFile(-1);
            let regionHistogramDataArray = [];
            let regionHistogramDataPromise = new Promise((resolve) => {
                msgController.histogramStream.subscribe({
                    next: (data) => {
                        regionHistogramDataArray.push(data)
                        resolve(regionHistogramDataArray)
                    }
                })
            });
            ConcatStokesResponse = await msgController.loadStokeFiles(assertItem.ConcatReqQU.stokesFiles, assertItem.ConcatReqQU.fileId, assertItem.ConcatReqQU.renderMode);
            let RegionHistogramData = await regionHistogramDataPromise;

            expect(RegionHistogramData[0].regionId).toEqual(assertItem.RegionHistogramDataResponseQU.regionId);
            expect(RegionHistogramData[0].progress).toEqual(assertItem.RegionHistogramDataResponseQU.progress);
            expect(RegionHistogramData[0].config.numBins).toEqual(assertItem.RegionHistogramDataResponseQU.config.numBins);
            expect(RegionHistogramData[0].histograms.binWidth).toBeCloseTo(assertItem.RegionHistogramDataResponseQU.histograms.binWidth, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.firstBinCenter).toBeCloseTo(assertItem.RegionHistogramDataResponseQU.histograms.firstBinCenter, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.mean).toBeCloseTo(assertItem.RegionHistogramDataResponseQU.histograms.mean, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.numBins).toEqual(assertItem.RegionHistogramDataResponseQU.histograms.numBins);
            expect(RegionHistogramData[0].histograms.stdDev).toBeCloseTo(assertItem.RegionHistogramDataResponseQU.histograms.stdDev, assertItem.precisionDigits); 
        },concatStokeTimeout);

        test(`(Step 3) Check CONCAT_STOKES_FILES_ACK response | `,()=>{
            expect(ConcatStokesResponse.success).toEqual(assertItem.ConcatResponse[2].success);
            expect(ConcatStokesResponse.openFileAck.success).toEqual(assertItem.ConcatResponse[2].openFileAck.success);
            expect(ConcatStokesResponse.openFileAck.beamTable.length).toEqual(assertItem.ConcatResponse[2].OpenFileAckBeamLength);
            expect(ConcatStokesResponse.openFileAck.fileInfo.name).toEqual(assertItem.ConcatResponse[2].openFileAck.fileInfo.name);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.dimensions).toEqual(assertItem.ConcatResponse[2].openFileAck.fileInfoExtended.dimensions);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.stokes).toEqual(assertItem.ConcatResponse[2].openFileAck.fileInfoExtended.stokes);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.width).toEqual(assertItem.ConcatResponse[2].openFileAck.fileInfoExtended.width);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.height).toEqual(assertItem.ConcatResponse[2].openFileAck.fileInfoExtended.height);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.depth).toEqual(assertItem.ConcatResponse[2].openFileAck.fileInfoExtended.depth);
        })
    });

    describe(`Case 4: Combine I, Q & U |`,() => {
        test(`(Step 1) Assert FileListRequest |`, async()=>{
            let FileListResponse = await msgController.getFileList(assertItem.filelist.directory, 0);
            expect(FileListResponse.success).toEqual(true);
        });

        let FileInfoResponse: any = [];
        let inputIndex = [0,1,2];
        inputIndex.map((input,index) => {
            test(`FILE_INFO_RESPONSE-${index+1} should arrive within ${openFileTimeout} ms" | `, async () => {
                FileInfoResponse = await msgController.getFileInfo(testSubdirectory, assertItem.fileInfoReq[input].file, assertItem.fileInfoReq[input].hdu)
                expect(FileInfoResponse.success).toEqual(true);
            }, openFileTimeout);
        });

        let ConcatStokesResponse: any = [];
        test(`(Step 2) Modify assert concatenate directory and request CONCAT_STOKES_FILES_ACK within ${concatStokeTimeout} ms | `,async()=>{
            assertItem.ConcatReqIQU.stokesFiles.map((input,index) => {
                assertItem.ConcatReqIQU.stokesFiles[index].directory = testSubdirectory;
            });
            msgController.closeFile(-1);
            let regionHistogramDataArray = [];
            let regionHistogramDataPromise = new Promise((resolve) => {
                msgController.histogramStream.subscribe({
                    next: (data) => {
                        regionHistogramDataArray.push(data)
                        resolve(regionHistogramDataArray)
                    }
                })
            });
            ConcatStokesResponse = await msgController.loadStokeFiles(assertItem.ConcatReqIQU.stokesFiles, assertItem.ConcatReqIQU.fileId, assertItem.ConcatReqIQU.renderMode);
            let RegionHistogramData = await regionHistogramDataPromise;

            expect(RegionHistogramData[0].regionId).toEqual(assertItem.RegionHistogramDataResponseIQU.regionId);
            expect(RegionHistogramData[0].progress).toEqual(assertItem.RegionHistogramDataResponseIQU.progress);
            expect(RegionHistogramData[0].config.numBins).toEqual(assertItem.RegionHistogramDataResponseIQU.config.numBins);
            expect(RegionHistogramData[0].histograms.binWidth).toBeCloseTo(assertItem.RegionHistogramDataResponseIQU.histograms.binWidth, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.firstBinCenter).toBeCloseTo(assertItem.RegionHistogramDataResponseIQU.histograms.firstBinCenter, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.mean).toBeCloseTo(assertItem.RegionHistogramDataResponseIQU.histograms.mean, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.numBins).toEqual(assertItem.RegionHistogramDataResponseIQU.histograms.numBins);
            expect(RegionHistogramData[0].histograms.stdDev).toBeCloseTo(assertItem.RegionHistogramDataResponseIQU.histograms.stdDev, assertItem.precisionDigits); 
        }, concatStokeTimeout);

        test(`(Step 3) Check CONCAT_STOKES_FILES_ACK response | `,()=>{
            expect(ConcatStokesResponse.success).toEqual(assertItem.ConcatResponse[3].success);
            expect(ConcatStokesResponse.openFileAck.success).toEqual(assertItem.ConcatResponse[3].openFileAck.success);
            expect(ConcatStokesResponse.openFileAck.beamTable.length).toEqual(assertItem.ConcatResponse[3].OpenFileAckBeamLength);
            expect(ConcatStokesResponse.openFileAck.fileInfo.name).toEqual(assertItem.ConcatResponse[3].openFileAck.fileInfo.name);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.dimensions).toEqual(assertItem.ConcatResponse[3].openFileAck.fileInfoExtended.dimensions);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.stokes).toEqual(assertItem.ConcatResponse[3].openFileAck.fileInfoExtended.stokes);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.width).toEqual(assertItem.ConcatResponse[3].openFileAck.fileInfoExtended.width);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.height).toEqual(assertItem.ConcatResponse[3].openFileAck.fileInfoExtended.height);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.depth).toEqual(assertItem.ConcatResponse[3].openFileAck.fileInfoExtended.depth);
        })
    });

    describe(`Case 5: Combine Q, U & V |`,() => {
        test(`(Step 1) Assert FileListRequest |`, async() => {
            let FileListResponse = await msgController.getFileList(assertItem.filelist.directory, 0);
            expect(FileListResponse.success).toEqual(true);
        });

        let FileInfoResponse: any = [];
        let inputIndex = [1,2,3];
        inputIndex.map((input,index)=>{
            test(`FILE_INFO_RESPONSE-${index+1} should arrive within ${openFileTimeout} ms" | `, async () => {
                FileInfoResponse = await msgController.getFileInfo(testSubdirectory, assertItem.fileInfoReq[input].file, assertItem.fileInfoReq[input].hdu)
                expect(FileInfoResponse.success).toEqual(true);
            }, openFileTimeout);
        });

        let ConcatStokesResponse: any = [];
        test(`(Step 2) Modify assert concatenate directory and request CONCAT_STOKES_FILES_ACK within ${concatStokeTimeout} ms | `,async()=>{
            assertItem.ConcatReqQUV.stokesFiles.map((input,index) => {
                assertItem.ConcatReqQUV.stokesFiles[index].directory = testSubdirectory;
            });
            msgController.closeFile(-1);
            let regionHistogramDataArray = [];
            let regionHistogramDataPromise = new Promise((resolve) => {
                msgController.histogramStream.subscribe({
                    next: (data) => {
                        regionHistogramDataArray.push(data)
                        resolve(regionHistogramDataArray)
                    }
                })
            });
            ConcatStokesResponse = await msgController.loadStokeFiles(assertItem.ConcatReqQUV.stokesFiles, assertItem.ConcatReqQUV.fileId, assertItem.ConcatReqQUV.renderMode);
            let RegionHistogramData = await regionHistogramDataPromise;

            expect(RegionHistogramData[0].regionId).toEqual(assertItem.RegionHistogramDataResponseQUV.regionId);
            expect(RegionHistogramData[0].progress).toEqual(assertItem.RegionHistogramDataResponseQUV.progress);
            expect(RegionHistogramData[0].config.numBins).toEqual(assertItem.RegionHistogramDataResponseQUV.config.numBins);
            expect(RegionHistogramData[0].histograms.binWidth).toBeCloseTo(assertItem.RegionHistogramDataResponseQUV.histograms.binWidth, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.firstBinCenter).toBeCloseTo(assertItem.RegionHistogramDataResponseQUV.histograms.firstBinCenter, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.mean).toBeCloseTo(assertItem.RegionHistogramDataResponseQUV.histograms.mean, assertItem.precisionDigits);
            expect(RegionHistogramData[0].histograms.numBins).toEqual(assertItem.RegionHistogramDataResponseQUV.histograms.numBins);
            expect(RegionHistogramData[0].histograms.stdDev).toBeCloseTo(assertItem.RegionHistogramDataResponseQUV.histograms.stdDev, assertItem.precisionDigits); 
        }, concatStokeTimeout);

        test(`(Step 3) Check CONCAT_STOKES_FILES_ACK response | `,()=>{
            expect(ConcatStokesResponse.success).toEqual(assertItem.ConcatResponse[4].success);
            expect(ConcatStokesResponse.openFileAck.success).toEqual(assertItem.ConcatResponse[4].openFileAck.success);
            expect(ConcatStokesResponse.openFileAck.beamTable.length).toEqual(assertItem.ConcatResponse[4].OpenFileAckBeamLength);
            expect(ConcatStokesResponse.openFileAck.fileInfo.name).toEqual(assertItem.ConcatResponse[4].openFileAck.fileInfo.name);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.dimensions).toEqual(assertItem.ConcatResponse[4].openFileAck.fileInfoExtended.dimensions);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.stokes).toEqual(assertItem.ConcatResponse[4].openFileAck.fileInfoExtended.stokes);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.width).toEqual(assertItem.ConcatResponse[4].openFileAck.fileInfoExtended.width);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.height).toEqual(assertItem.ConcatResponse[4].openFileAck.fileInfoExtended.height);
            expect(ConcatStokesResponse.openFileAck.fileInfoExtended.depth).toEqual(assertItem.ConcatResponse[4].openFileAck.fileInfoExtended.depth);
        })
    });

    afterAll(() => msgController.closeConnection());
});
