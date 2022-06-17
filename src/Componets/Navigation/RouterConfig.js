import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import FlileUploader from "../Pages/flileUploader";

export default function RouterConfig() {
  return (
    <Fragment>
      {" "}
      <Switch>
        <Route exact path="/" component={FlileUploader} />
      </Switch>
    </Fragment>
  );
}
