import React from 'react';
import {NonAcceptedSubmission} from "@/app/types";

const FailureSubmission = ({
   submission
}: {
    submission: NonAcceptedSubmission
}) => {
    return <div>
        <p>{submission.verdict}</p>
        <p>{submission.submittedCode}</p>
    </div>
}

export default FailureSubmission;