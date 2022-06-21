import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';


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

            var Rmla = xml.getElementsByTagName("Rmla");
            var rmla = [];
            var rmla_data = [];
            for (var i = 0; i < Rmla.length; i++) {
                var rmlaObj = {};
                rmlaObj.stateCode = Rmla[i].attributes.stateCode;
                rmlaObj.SectionISection = {};
                let children1 = Rmla[i].children[0].children;
                console.log(children1, "children1");
                for (var j = 0; j < children1.length; j++) {
                    rmlaObj.SectionISection[children1[j].name] = children1[j].value;

                }
                rmla.push(rmlaObj);
                rmla_data.push(rmlaObj);
            }

            console.log(JSON.stringify(rmla), "rmla");
            var StateCodeArray = [];
            var StateCodeArrayIndex = [];
            var StateCodeAlreadyExists = [];

            //get all status code
            for(i=0; i< rmla.length; i++){
                //if (StateCodeArray.indexOf(rmla[i].stateCode) !== -1){
                    for(j=i+1; j< rmla.length; j++){
                        if (rmla[i].stateCode==rmla[j].stateCode){
                            //let children1 = rmla[i].SectionISection;
                            //let children2 = rmla[j].SectionISection;
                            console.log("rmla[i].SectionISection", rmla[i].SectionISection, rmla[j].SectionISection);

                            for(var k=0;k<rmla[i].SectionISection.length;k++){
                                //var current = children1[k];
                                console.log("rmla[i].SectionISection[k].name", rmla[i].SectionISection[k].name);
                                for(var l=k+1;l< rmla[j].SectionISection.length;l++){
                                  if(rmla[i].SectionISection[k].name = rmla[j].SectionISection[l].name){
                                    rmla[i].SectionISection[k].value = rmla[i].SectionISection[k].value + rmla[j].SectionISection[l].value;
                                  }
                                  else {
                                    rmla[i].SectionISection[k].push(rmla[j].SectionISection[l]);
                                      //array.splice(l,1);
                                    l++;
                                  }
                                }
                              }

                            console.log("children1", rmla[i].SectionISection, rmla[j].SectionISection);
                            return;
                              
                            // for (var j = 0; j < children1.length; j++) {
                            //     console.log(children1[j].name);
                            //     //rmlaObj.SectionISection[children1[j].name] = children1[j].value;
                            // }
                            // for (var j = 0; j < children1.length; j++) {
                                
                                //rmlaObj.SectionISection[children1[j].name] = children1[j].value;
            
                            //}
                            //rmla.push(rmlaObj);




                        }
                    }
                    //console.log(rmla[i].stateCode, "duplicate");

                //}
                // else{
                //     StateCodeArray.push(rmla[i].stateCode);
                //     StateCodeArrayIndex.push(i);
                // }
            }

            console.log("StateCodeArray", StateCodeArray);
            // rmla_data.map((item, index) => {
            //     console.log(item.SectionISection, "item");
            //     const arr1 = Object.keys(item.SectionISection);
            //     const arr2 = Object.values(item.SectionISection);
            //     let arr3 = [...arr2];
            //     console.log(arr1, ...arr3, "arr1");

            //     var result1 = [];
            //     arr2.forEach(element => {
            //         element = + element;
            //         result1.push(element);

            //     });
            //     console.log(item.SectionISection, "item");
            //     console.log(result1, "index");
            // }
            // )


            // rmla.forEach(element => {

            //     rmla_data.forEach(element2 => {  
            //         console.log(element2, "element2");

            //         if (element.stateCode === element2.stateCode) {
            //             // var data2 = [(element.SectionISection)concat(element2.SectionISection)];
            //             var a = element.SectionISection
            //             var b = element2.SectionISection;
            //             var a_Data = [a]
            //             var b_Data = [b]

            //             let arr3 = a_Data.map((item, i) => Object.assign({}, item, b_Data[i]));
            //             console.log(arr3, "Object.keys(a).length");
            //             console.log(a, b, "elementtwo");
            //             // console.log(element2, "elementtwo");

            //             console.log("sss")

            //         }
            //     })



            //     // if (element.stateCode == ){
            //     //     var xyz = element.SectionISection.ac10_1;
            //     //     console.log("xyz", xyz);
            //     // }
            //     // console.log(element, "element");
            // });
            // console.log(rmla.length, "rmla");



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