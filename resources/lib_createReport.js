/*
    @fileoverview   create a Report in docx
    @autor          RAO Automation Team
    @version        1.0
    History
        v1.0        library
*/

var fs = require('fs');
var docx = require('docx');
var flowSteps;
var imgIzq;
var imgDer;
var totalScreens;
var docName = "";
var docNameAnexo = "";
const dirImgs_1 = "reports/" + browser.params.index;
const dirImgs_2 = "reports/" + browser.params.index + "/images/";
const dirImgs_3 = "reports/" + browser.params.index + "/imagesAnexo/";
let now = require('nano-time');

if (!fs.existsSync(dirImgs_1)) {
    fs.mkdirSync(dirImgs_1);
}

if (!fs.existsSync(dirImgs_2)) {
    fs.mkdirSync(dirImgs_2);
}

if (!fs.existsSync(dirImgs_3)) {
    fs.mkdirSync(dirImgs_3);
}

function writeToWord(doc) {
    browser.wait(
        function () {
            return docx.Packer.toBuffer(doc).then(
                function (buffer) {
                    if (fs.existsSync(dirImgs_1 + "/" + docName)) {
                        fs.unlinkSync(dirImgs_1 + "/" + docName);
                    } else {
                        fs.writeFileSync(dirImgs_1 + "/" + docName, buffer);
                    }
                    return true;
                });
        });
}

function writeToWordAnexo(docAnexo) {
    browser.wait(
        function () {
            return docx.Packer.toBuffer(docAnexo).then(
                function (buffer) {
                    if (fs.existsSync(dirImgs_1 + "/" + docNameAnexo)) {
                        fs.unlinkSync(dirImgs_1 + "/" + docNameAnexo);
                    } else {
                        fs.writeFileSync(dirImgs_1 + "/" + docNameAnexo, buffer);
                    }
                    return true;
                });
        });
}


exports.getScreenShot = function (option) {
    browser.takeScreenshot().then(
        png => {
            var file;
            var nom;
            if (option == "anexo") {
                file = fs.readdirSync(dirImgs_3);
                nom = dirImgs_3 + '/img_' + now() + '.png';
            } else {
                file = fs.readdirSync(dirImgs_2);
                nom = dirImgs_2 + '/img_' + now() + '.png';
            }
            const stream = fs.createWriteStream(nom);
            stream.write(Buffer.from(png, 'base64'));
            stream.end();
        });
}

function insertRow(flow, imgIzq, imgDer, stepNumber) {
    var borderColorLeft = "auto";
    var borderColorRight = "auto";
    var borderStyleLeft = 1;
    var borderStyleRight = 1;

    if (browser.params.status == "failed") {
        if (stepNumber == (totalScreens - 1)) {
            if (imgDer == "\n") {
                borderColorLeft = "FF4C33";
                borderStyleLeft = 5;
            } else {
                borderColorRight = "FF4C33";
                borderStyleRight = 5;
            }
        }
    }

    if (imgDer == "\n") {
        imgDer = "\t\t\t";
    }

    flow.addChildElement(
        new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph({ text: "Paso " + (stepNumber + 1), style: "BoldTableDescripcion" })],
                    margins: { top: 150, bottom: 150, left: 100, right: 100 }
                }
                ),
                new docx.TableCell({
                    children: [new docx.Paragraph({ text: "Paso " + (stepNumber + 2), style: "BoldTableDescripcion" })],
                    margins: { top: 150, bottom: 150, left: 100, right: 100 }
                })
            ]
        })
    )

    flow.addChildElement(
        new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph(imgIzq)],
                    margins: { top: 50, bottom: 50, left: 1200, right: 0 },
                    shading: { fill: 'FFFFFF', color: 'auto' },
                    borders: {
                        top: { style: 'single', size: borderStyleLeft, color: borderColorLeft },
                        bottom: { style: 'single', size: borderStyleLeft, color: borderColorLeft },
                        left: { style: 'single', size: borderStyleLeft, color: borderColorLeft },
                        right: { style: 'single', size: borderStyleLeft, color: borderColorLeft }
                    }
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph(imgDer)],
                    margins: { top: 50, bottom: 50, left: 1200, right: 0 },
                    shading: { fill: 'FFFFFF', color: 'auto' },
                    borders: {
                        top: { style: 'single', size: borderStyleRight, color: borderColorRight },
                        bottom: { style: 'single', size: borderStyleRight, color: borderColorRight },
                        left: { style: 'single', size: borderStyleRight, color: borderColorRight },
                        right: { style: 'single', size: borderStyleRight, color: borderColorRight }
                    }
                })
            ]
        })
    )
}

exports.createPathReport = function () {

    var fillStatus;

    var width;

    var high = 260;


    if (browser.params.cellPhoneCapabilities.includes("iPad")) {

        width = 180;

    } else {

        width = 150;

    }

    if (browser.params.status == 'failed') {

        fillStatus = 'FD0505';

    } else {

        fillStatus = '4DFF33';

    }

    if (!fs.existsSync(dirImgs_1)) {

        fs.mkdirSync(dirImgs_1);

    }

    if (!fs.existsSync(dirImgs_2)) {

        fs.mkdirSync(dirImgs_2);

    }

    if (!fs.existsSync(dirImgs_3)) {

        fs.mkdirSync(dirImgs_3);
    }

    const doc = new docx.Document(

        {
            styles: {

                paragraphStyles: [
                    { id: 'BoldTable', name: 'Text Bold Table', quickFormat: true, run: { font: 'Tahoma', size: 30, bold: true, color: '#3b83bd' } },

                    { id: 'BoldTableBlue20', name: 'Text Bold Table Blue', quickFormat: true, run: { font: 'Tahoma', size: 20, bold: true, color: '4F81BD' } },

                    { id: 'BoldTableBlue16', name: 'Text Bold Table Blue', quickFormat: true, run: { font: 'Tahoma', size: 18, bold: true, color: '000000' } },

                    { id: 'TextTableBlack16', name: 'Text Table Black', quickFormat: true, run: { font: 'Calibri', size: 20, bold: false, color: '000000' } },

                    { id: 'TextTableBlack14', name: 'Text Table Black', quickFormat: true, run: { font: 'Calibri', size: 16, bold: false, color: '000000' } },

                    { id: 'BoldTableDescripcion', name: 'Text Bold Table descripcion', quickFormat: true, run: { font: 'Tahoma', size: 16, bold: true, color: '4F81BD' } },

                    { id: 'TableDescripcionRow2', name: 'Text Table descripcion', quickFormat: true, run: { font: 'Calibri', size: 22, bold: false, color: '000000' } },

                    { id: 'TableDescripcionRow1', name: 'Text Table descripcion', quickFormat: true, run: { font: 'Verdana', size: 20, bold: false, color: '000000' } },

                    { id: 'TableDescripcionRow', name: 'Text Table descripcion', quickFormat: true, run: { font: 'Calibri', size: 22, bold: true, color: 'FFFFFF' } },

                    { id: 'TableDatos', name: 'Text table datos', quickFormat: true, run: { font: 'Calibri', size: 24, bold: true, color: 'FFFFFF' } },

                    { id: 'TableDatosrow', name: 'Text table datos', quickFormat: true, run: { font: 'Calibri', size: 20, bold: false, color: '000000' } },

                    { id: 'TableContenido', name: 'Text table contenido', quickFormat: true, run: { font: 'Verdana', size: 20, bold: false, color: '000000' } },

                    { id: 'TableContenidoFail', name: 'Text table contenido', quickFormat: true, run: { font: 'Verdana', size: 20, bold: true, color: 'FF000F' } },

                    { id: 'TableContenidoInfo', name: 'Text table contenido', quickFormat: true, run: { font: 'Verdana', size: 20, bold: false, color: '002BFF' } }
                ]
            }
        });

    const docAnexo = new docx.Document(

        {

            styles: {

                paragraphStyles: [

                    { id: 'BoldTable', name: 'Text Bold Table', quickFormat: true, run: { font: 'Tahoma', size: 30, bold: true, color: '#3b83bd' } },

                    { id: 'BoldTableBlue20', name: 'Text Bold Table Blue', quickFormat: true, run: { font: 'Tahoma', size: 20, bold: true, color: '4F81BD' } },

                    { id: 'BoldTableBlue16', name: 'Text Bold Table Blue', quickFormat: true, run: { font: 'Tahoma', size: 18, bold: true, color: '000000' } },

                    { id: 'TextTableBlack16', name: 'Text Table Black', quickFormat: true, run: { font: 'Calibri', size: 20, bold: false, color: '000000' } },

                    { id: 'TextTableBlack14', name: 'Text Table Black', quickFormat: true, run: { font: 'Calibri', size: 16, bold: false, color: '000000' } },

                    { id: 'BoldTableDescripcion', name: 'Text Bold Table descripcion', quickFormat: true, run: { font: 'Tahoma', size: 16, bold: true, color: '4F81BD' } },

                    { id: 'TableDescripcionRow2', name: 'Text Table descripcion', quickFormat: true, run: { font: 'Calibri', size: 22, bold: false, color: '000000' } },

                    { id: 'TableDescripcionRow1', name: 'Text Table descripcion', quickFormat: true, run: { font: 'Verdana', size: 20, bold: false, color: '000000' } },

                    { id: 'TableDescripcionRow', name: 'Text Table descripcion', quickFormat: true, run: { font: 'Calibri', size: 22, bold: true, color: 'FFFFFF' } },

                    { id: 'TableDatos', name: 'Text table datos', quickFormat: true, run: { font: 'Calibri', size: 24, bold: true, color: 'FFFFFF' } },

                    { id: 'TableDatosrow', name: 'Text table datos', quickFormat: true, run: { font: 'Calibri', size: 20, bold: false, color: '000000' } },

                    { id: 'TableContenido', name: 'Text table contenido', quickFormat: true, run: { font: 'Verdana', size: 20, bold: false, color: '000000' } },

                    { id: 'TableContenidoFail', name: 'Text table contenido', quickFormat: true, run: { font: 'Verdana', size: 20, bold: true, color: 'FF000F' } },

                    { id: 'TableContenidoInfo', name: 'Text table contenido', quickFormat: true, run: { font: 'Verdana', size: 20, bold: false, color: '002BFF' } }
                ]
            }

        });

    const header = new docx.Table({

        rows: [

            new docx.TableRow({

                children: [

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Remote Account Opening', style: 'BoldTable' }),

                            new docx.Paragraph({ text: 'Fase: UT', style: 'BoldTable' })
                        ]
                    })
                ]
            })
        ],

        margins: { top: 50, bottom: 50, left: 100, right: 100 },

        width: { size: 50, type: docx.WidthType.PERCENTAGE },

        columnWidths: [25, 50, 25],

        layout: docx.TableLayoutType.AUTOFIT,

    });

    const details = new docx.Table({

        rows: [

            new docx.TableRow({

                children: [

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Dispositivo: ', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: browser.params.cellPhoneCapabilities, style: 'TextTableBlack16' })
                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    }),

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Nombre de Caso de Prueba:', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: browser.params.testCaseName, style: 'TextTableBlack16' })
                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    }),

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Funcionalidad:', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: browser.params.functionality, style: 'TextTableBlack16' })
                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    })
                ]
            }),

            new docx.TableRow({

                children: [

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Navegador:', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: browser.params.Navigator + " " + browser.params.browserVersion, style: 'TextTableBlack16' })
                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    }),

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Fecha de Ejecución:', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: browser.params.date_, style: 'TextTableBlack16' })
                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    }),

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Tester:', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: 'JG43273', style: 'TextTableBlack16' })

                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    })
                ]
            }),
        ],

        margins: { top: 50, bottom: 50, left: 100, right: 100 },

        width: { size: 100, type: docx.WidthType.PERCENTAGE },

        columnWidths: [25, 50, 25],

        layout: docx.TableLayoutType.AUTOFIT,

    });

    const purpose = new docx.Table({

        rows: [

            new docx.TableRow({

                children: [

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Objetivo: ', style: 'BoldTableBlue16' }),

                            new docx.Paragraph({ text: browser.params.purpose, style: 'TextTableBlack16' })
                        ],

                        shading: { fill: 'F7F7F7', color: 'auto' },

                    })
                ]
            }),

            new docx.TableRow({

                children: [

                    new docx.TableCell({

                        children: [

                            new docx.Paragraph({ text: 'Estatus: ' + browser.params.status, style: 'TextTableBlack14' }),

                            new docx.Paragraph({ text: 'Observaciones: ' + browser.params.description, style: 'TextTableBlack14' })
                        ],

                        shading: { fill: fillStatus, color: 'auto' },

                    })
                ]
            })
        ],

        margins: { top: 50, bottom: 50, left: 100, right: 100 },

        width: { size: 100, type: docx.WidthType.PERCENTAGE },

        layout: docx.TableLayoutType.AUTOFIT,

    });

    docName = browser.params.testCaseName + "_" + browser.params.Navigator + ".docx";

    docNameAnexo = browser.params.testCaseName + "_" + browser.params.Navigator + "_Anexo1.docx";

    const logo = docx.Media.addImage(

        doc,

        fs.readFileSync('media/logoCitibanamex.jpg'),

        180, 90,

        { floating: { horizontalPosition: { offset: 5020000 }, verticalPosition: { offset: 400000 } } }

    );

    const logo2 = docx.Media.addImage(

        docAnexo,

        fs.readFileSync('media/logoCitibanamex.jpg'),

        180, 90,

        { floating: { horizontalPosition: { offset: 5020000 }, verticalPosition: { offset: 400000 } } }

    );

    const flow = new docx.Table({

        rows: [],

        width: { size: 100, type: docx.WidthType.PERCENTAGE },

        columnWidths: [50, 50],

        layout: docx.TableLayoutType.AUTOFIT,

        float: {

            horizontalAnchor: docx.TableAnchorType.TEXT,

            verticalAnchor: docx.TableAnchorType.PAGE,

            relativeHorizontalPosition: docx.RelativeHorizontalPosition.LEFT,

            relativeVerticalPosition: docx.RelativeVerticalPosition.INLINE

        }
    });

    const flowAnexo = new docx.Table({

        rows: [],

        width: { size: 100, type: docx.WidthType.PERCENTAGE },

        columnWidths: [50, 50],

        layout: docx.TableLayoutType.AUTOFIT,

        float: {

            horizontalAnchor: docx.TableAnchorType.TEXT,

            verticalAnchor: docx.TableAnchorType.PAGE,

            relativeHorizontalPosition: docx.RelativeHorizontalPosition.LEFT,

            relativeVerticalPosition: docx.RelativeVerticalPosition.INLINE
        }
    });

    var array = [];

    var arrayAnexo = [];

    var files = fs.readdirSync(dirImgs_2);

    var filesAnexo = fs.readdirSync(dirImgs_3);

    files.forEach(file => {

        array.push(file);

    });

    filesAnexo.forEach(file => {

        arrayAnexo.push(file);

    });

    totalScreens = array.length + arrayAnexo.length;

    var counter = 0;

    for (var i = 0; i < arrayAnexo.length; i = i + 2) {
        var iInc = i + 1;
        if (arrayAnexo[i] !== undefined) {
            imgIzq = docx.Media.addImage(
                docAnexo,
                fs.readFileSync(dirImgs_3 + arrayAnexo[i]),
                width, high);
        }

        if (arrayAnexo[iInc] !== undefined) {
            imgDer = docx.Media.addImage(
                docAnexo,
                fs.readFileSync(dirImgs_3 + arrayAnexo[iInc]),
                width, high);
        } else {
            imgDer = "\n";
        }

        insertRow(flowAnexo, imgIzq, imgDer, counter);
        counter++;
    }

    for (var i = 0; i < array.length; i = i + 2) {
        var iInc = i + 1;
        console.log(array[i]);
        console.log(array[iInc]);

        if (array[i] !== undefined) {
            console.log("entro al primer if");
            var img = fs.readFileSync(dirImgs_2 + array[i]);
            imgIzq = docx.Media.addImage(
                doc,
                img,
                width, high);
        }

        if (array[iInc] !== undefined) {
            console.log("entro al segundo if");
            var img = fs.readFileSync(dirImgs_2 + array[iInc]);
            imgDer = docx.Media.addImage(
                doc,
                img,
                width, high);
        } else {
            imgDer = "\n";
        }

        insertRow(flow, imgIzq, imgDer, counter);
        counter++;
    }

    doc.addSection({

        properties: {

            orientation: docx.PageOrientation.PORTRAIT,

        },

        headers: {

            default: new docx.Header({

                children: [new docx.Paragraph("\n"), header, new docx.Paragraph(logo)]

            })
        },

        footers: {

            default: new docx.Footer({

                children: []

            })
        },

        children: [new docx.Paragraph("\n\n\n"), details, purpose, new docx.Paragraph("\n\n"), flow]

    });

    writeToWord(doc);

    docAnexo.addSection({

        properties: {

            orientation: docx.PageOrientation.PORTRAIT,

        },

        headers: {

            default: new docx.Header({

                children: [new docx.Paragraph("\n"), header, new docx.Paragraph(logo2)]

            })
        },

        footers: {

            default: new docx.Footer({

                children: []

            })
        },

        children: [new docx.Paragraph("\n\n\n"), details, purpose, new docx.Paragraph("\n\n"), flowAnexo]

    });

    writeToWordAnexo(docAnexo);
}