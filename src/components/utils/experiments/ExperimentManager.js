import React from 'react';
import { useParams } from 'react-router-dom';


function ExperimentManager() {
  const { studyId, experimentId } = useParams();
  return (
    <div>
      study id is {studyId}. experiment id is {experimentId}.
      the experiment management page under a study goes here.
      In this page, admin can add/ remove participants from the experiment.
    </div>
  );
}

export default ExperimentManager;
