import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';

import convert from 'xml-js'

var XMLParser = require('react-xml-parser');


function FlileUploader() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        console.log(event, "event");
        var file = event.target.files[0];


        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            const xmldata = event.target.result;
            console.log(xmldata, "xmldata");
            var xml = new XMLParser().parseFromString(xmldata);    // Assume xmlText contains the example XML
            console.log("xml", xml);
            var options = { ignoreCdata: false, indentAttributes: false };
            // var result1 = convert.xml2json(xmldata, options, { compact: true, spaces: 4 });
            var result3 = convert.xml2js(xmldata, { ignoreDeclaration: true, fullTagEmptyElement: true, compact: true, indentAttributes: false, ignoreAttributes: true, spaces: 4 });
            var result2 = convert.xml2json(xmldata, { ignoreDeclaration: true, fullTagEmptyElement: true, compact: true, indentAttributes: false, ignoreAttributes: false, spaces: 4 });
            console.log("result", result2, result3);
            console.log("sss", result3.Mcr.Rmla)

        };

        var data = reader.readAsText(file);

        console.log("reader", data)

    }

    const handleSubmission = () => {
    };

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select file one</Form.Label>
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
            {/* <input type="file" name="file"  /> */}



        </Fragment>
    )
}

export default FlileUploader