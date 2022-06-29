import React, { useState, Fragment } from "react";
import { Form, Container, Col, Row, Button } from "react-bootstrap";
import { saveAs } from "file-saver";

var jsonxml = require('jsontoxml');
var convert = require('xml-js');
var js2xmlparser = require("js2xmlparser");

const exportFromJSON = require('export-from-json')

var XMLParser = require("react-xml-parser");

function FlileUploader() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [data1, setData1] = useState();
    const [data2, setData2] = useState();
    const [xmldata1, setXmldata1] = useState();


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        var file1 = event.target.files[0];
        var file2 = event.target.files[1];
        //console.log(file1);

        var reader = new FileReader();
        var readerfile2 = new FileReader();
        reader.readAsText(file1);
        readerfile2.readAsText(file2);


        reader.onload = function (event) {
            const xmldata = event.target.result;
            setXmldata1(xmldata);
            var xml = new XMLParser().parseFromString(xmldata);
            //console.log(xml);

            var Rmla = xml.getElementsByTagName("Rmla");
            console.log("Rmla", Rmla);
            var rmla = [];
            for (var i = 0; i < Rmla.length; i++) {
                var rmlaObj = {};
                rmlaObj.stateCode = Rmla[i].attributes.stateCode;

                rmlaObj.SectionISection = {};
                let children1 = Rmla[i].children[0].children;
                // console.log(children1, "children1");
                for (var j = 0; j < children1.length; j++) {
                    rmlaObj.SectionISection[children1[j].name] = children1[j].value;
                }

                rmla.push(rmlaObj);
                // rmla.setAttribute("stateCode", Rmla[i].attributes.stateCode);
            }
            console.log("rmla1", rmla);
            setData1(rmla);

        };

        readerfile2.onload = function (event) {
            const xmldata = event.target.result;
            var xml = new XMLParser().parseFromString(xmldata);



            var Rmla = xml.getElementsByTagName("Rmla");
            var rmla = [];
            for (var i = 0; i < Rmla.length; i++) {
                var rmlaObj = {};
                rmlaObj.stateCode = Rmla[i].attributes.stateCode;
                rmlaObj.SectionISection = {};
                let children1 = Rmla[i].children[0].children;
                console.log(Rmla, "Rmla2");
                //console.log(children1, "children1");
                for (var j = 0; j < children1.length; j++) {
                    rmlaObj.SectionISection[children1[j].name] = children1[j].value;
                }
                rmla.push(rmlaObj);
            }
            console.log("rmla2", rmla);
            setData2(rmla);
        };
    };
    const handleSubmission = (event) => {
        let xmldata = xmldata1;
        let xml = new XMLParser().parseFromString(xmldata);
        console.log(xml);

        if (data1 && data2) {
            var data = [];
            for (var i = 0; i < data1.length; i++) {
                for (var j = 0; j < data2.length; j++) {
                    if (data1[i].stateCode === data2[j].stateCode) {
                        var dataObj = {};
                        dataObj.stateCode = data1[i].stateCode;
                        dataObj.SectionISection = {};
                        for (var k in data1[i].SectionISection) {
                            if (k in data2[j].SectionISection) {
                                let value1 = data1[i].SectionISection[k];
                                let value2 = data2[j].SectionISection[k];
                                let value = parseInt(value1) + parseInt(value2);
                                let valueStr = value.toString();
                                dataObj.SectionISection[k] = valueStr;
                            } else {
                                dataObj.SectionISection[k] = data1[i].SectionISection[k];
                            }
                        }
                        for (var key in data2[j].SectionISection) {
                            if (!(key in data1[i].SectionISection)) {
                                dataObj.SectionISection[key] = data2[j].SectionISection[key];
                            }
                        }
                        data.push(dataObj);
                    }
                }
            }



            console.log("Obj", JSON.stringify(data));
            // var newValu = JSON.stringify(data)
            // var xmldata2 = jsonxml({
            //     node: 'text content',
            //     parent: data
            // })
            // console.log("JSON", jsonxml({
            //     node: 'text content',
            //     parent: data
            // }));
            const fileName = 'dtypeownload'
            // console.log(js2xmlparser.parse("person", data));

            // exportFromJSON({ xmldata2, fileName, exportType })
            //console.log(js2xmlparser.parse("person", data));
            // let fields = Obj. ? Obj : [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
            const exportType = 'xml';
            // exportFromJSON({ data, fileName, exportType })

            // append data to xml
            var Rmla = xml.getElementsByTagName("Rmla");
            for (var i = 0; i < Rmla.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (Rmla[i].attributes.stateCode === data[j].stateCode) {
                        var SectionISection = Rmla[i].children[0].children;
                        for (var k = 0; k < SectionISection.length; k++) {
                            for (var key in data[j].SectionISection) {
                                if (SectionISection[k].name === key) {
                                    SectionISection[k].value = data[j].SectionISection[key];
                                }
                            }
                        }
                    }
                }
            }
            console.log("xml", xml);


            // convert xmlparser data into json object
            // xml data extract with nodes
            var parserData = xml.getElementsByTagName("Mcr");
            var dataxml = []
            var nameMcr = parserData[0].name
            var Mcrattributes = parserData[0].attributes

            for (var i = 0; i < parserData.length; i++) {
                var parserDataElement = parserData[i].getElementsByTagName("Rmla");
                var dataxmlElement = parserDataElement;
                console.log("dataxmlElement", parserDataElement)

                // for (var j = 0; j < children1.length; j++) {
                //     var children2 = children1[j].getElementsByTagName("children");
                //     for (var k = 0; k < children2.length; k++){
                //     children2[k].value = parserDataElement[children2[k].textContent];
                //     }
                // }
                // }
            }

            var objval = {

                "Mcr":
                {
                    "-type": "E",
                    "-year": "2022",
                    "-periodType": "MCRQ1",
                    "-formVersion": "v5",
                    "Rmla": [
                        {
                            "-stateCode": "AZ",
                            "SectionISection": {
                                "ac10_1": "100",
                                "ac10_2": "5",
                                "ac20_1": "200",
                                "ac20_2": "300",
                                "ac30_1": "10",
                                "ac30_2": "90"
                            }
                        },
                        {
                            "-stateCode": "CA",
                            "SectionISection": {
                                "ac10_1": "100",
                                "ac10_2": "5",
                                "ac20_1": "200",
                                "ac20_2": "3"
                            }
                        }
                    ]

                }
            }

            var dataObject = [];
            var propdata = {}


            propdata.Mcr = "mct"


            const newObjjson = {
                Mcr: {
                    ...Mcrattributes,
                    "Rmla":
                        data

                }





            }
            console.log("Mcrattributes", Object.keys(Mcrattributes))




            console.log("Mcrattributes...", Mcrattributes)








            console.log(Mcrattributes, "ObjMcrattributes");
            console.log("jsonObj", JSON.stringify(newObjjson))

            // add "-" before every keys and values will unchanged






            exportFromJSON({ data: newObjjson, fileName, exportType })

            // console.log("objval", newObjjson, JSON.stringify(newObjjson))

            // var result = convert.js2xml(newObjjson);

            // to convert javascript object to xml text
            // var json = require('fs').readFileSync(newObjjson, 'utf8');
            // var options = { compact: true, ignoreComment: true, spaces: 4 };
            // var result = convert.json2xml(newObjjson, options);
            // console.log(result);
            var xmljss = jsonxml(newObjjson)



            var blob = new Blob([xmljss], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "xmlfile.txt");

            console.log(xmljss);




























        }
    }


    //   const handleSubmission = () => 
    //   };

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select file one</Form.Label>
                            <Form.Control type="file" onChange={changeHandler} multiple />
                        </Form.Group>

                        {isFilePicked ? (
                            <div>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
                                <p>
                                    lastModifiedDate:{" "}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                        <div>
                            <Button onClick={handleSubmission}>Submit</Button>
                        </div>
                    </Col>
                    {/* <Col>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select file two</Form.Label>
                            <Form.Control type="file" onChange={changeHandler} />
                        </Form.Group>

                        {isFilePicked ? (
                            <div>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
                                <p>
                                    lastModifiedDate:{' '}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                        <div>
                            <Button onClick={handleSubmission}>Submit</Button>
                        </div>
                    </Col> */}
                </Row>
            </Container>
        </Fragment>
    );
}

export default FlileUploader;
