import React, { useState, Fragment } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';


var XMLParser = require('react-xml-parser');


function FlileUploader() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        // setSelectedFile(event.target.files[0]);
        // setIsFilePicked(true);
        console.log(event.target.result)
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            const xmldata = event.target.result;
            var xml = new XMLParser().parseFromString(xmldata);

            var Rmla = xml.getElementsByTagName("Rmla");
            var rmla = [];
            var rmla_data = [];
            for (var i = 0; i < Rmla.length; i++) {
                var rmlaObj = {};
                rmlaObj.stateCode = Rmla[i].attributes.stateCode;
                rmlaObj.SectionISection = {};
                let children1 = Rmla[i].children[0].children;

                for (var j = 0; j < children1.length; j++) {
                    rmlaObj.SectionISection[children1[j].name] = children1[j].value;
                }
                rmla.push(rmlaObj);
                rmla_data.push(rmlaObj);
            }

            for (i = 0; i < rmla.length; i++) {
                for (j = i + 1; j < rmla.length; j++) {
                    if (rmla[i].stateCode == rmla[j].stateCode) {
                        var matchedStateCodeArray1 = rmla[i].SectionISection;
                        var matchedStateCodeArray2 = rmla[j].SectionISection;
                        var combinedArrayData = [matchedStateCodeArray1, matchedStateCodeArray2];

                        const addCommonStateCodeData = objSectionISection => {
                            const combinedArrayResult = {};
                            objSectionISection.forEach(SectionISection => {
                                for (let [key, value] of Object.entries(SectionISection)) {
                                    if (combinedArrayResult[key]) {
                                        combinedArrayResult[key] += parseInt(value);
                                    } else {
                                        combinedArrayResult[key] = parseInt(value);
                                    }
                                }
                            });
                            return combinedArrayResult;
                        };

                        const combinedStateData = addCommonStateCodeData(combinedArrayData);
                        rmla[i].SectionISection = Object.assign({}, combinedStateData);
                        rmla.splice(j, 1);
                        console.log(rmla);
                    }
                }
            }


        };

        var data = reader.readAsText(file);
    }

    const handleSubmission = () => {
    };

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select file </Form.Label>
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

                </Row>
            </Container>
            {/* <input type="file" name="file"  /> */}



        </Fragment>
    )
}

export default FlileUploader