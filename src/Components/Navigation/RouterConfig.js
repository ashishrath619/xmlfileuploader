import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import FlileUploader from "../Pages/fileUploader";
import fileUploaderxml from "../Pages/fileUploaderxml";
import fileUploaderxml2 from "../Pages/fileUploaderxml2";

export default function RouterConfig() {
  return (
    <Fragment>
      {" "}
      <Switch>
        <Route exact path="/" component={FlileUploader} />
        <Route exact path="/fileUploaderxml" component={fileUploaderxml} />
        <Route exact path="/fileUploaderxml2" component={fileUploaderxml2} />
      </Switch>
    </Fragment>
  );
}
