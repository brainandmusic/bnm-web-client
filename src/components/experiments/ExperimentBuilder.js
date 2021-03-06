import React from 'react';
import { useParams } from 'react-router-dom';
import LabjsBuilder from '../utils/experiments/builders/labjs/LabjsBuilder';

function ExperimentBuilder() {
  const { platform, experimentId } = useParams();

  if (platform === "labjs") {
    return <LabjsBuilder eid={experimentId} />
  }
  else {
    return (

      <div>
        <h2>{platform} builder is under construction.</h2>
        <p>Depending on the platform, admin/R.A. can compose experiments here</p>
        <p>After creation, user can go back to experiment page to see if it is published.</p>
        <p>Of course one can save and review draft later.</p>
      </div>
    );
  }
}

export default ExperimentBuilder;
