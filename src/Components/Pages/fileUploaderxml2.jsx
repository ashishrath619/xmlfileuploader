import React, { useState, Fragment } from "react";
import { Form, Container, Col, Row, Button } from "react-bootstrap";
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


            var Obj = {
                Mcr: "Mcr",
                attributes: "attributes",
                Rmla: data

            }
            // console.log("Obj", data);
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
            // const exportType = xml
            // console.log(js2xmlparser.parse("person", data));

            // exportFromJSON({ xmldata2, fileName, exportType })
            //console.log(js2xmlparser.parse("person", data));
            // let fields = Obj. ? Obj : [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
            const exportType = 'xml';
            // exportFromJSON({ data, fileName, Obj, exportType })

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
            //  const data = [{ foo: 'foo'}, { bar: 'bar' }]

            var Mcr = xml.getElementsByTagName("Mcr");
            console.log("mcr2", Mcr)




            var newObj = []

            var newArrayObject = {}
            for (var i = 0; i < Mcr.length; i++) {

                var mcrnode = Mcr[i].children

                newObj.push(mcrnode)





            }

            console.log(newObj)
















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
