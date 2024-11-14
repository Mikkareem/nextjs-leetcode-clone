import React from 'react';
import {AcceptedSubmission} from "@/app/types";

const SuccessSubmission = ({
   submission
} : {
    submission: AcceptedSubmission
}) => {
    return <div>
        <p>{submission.verdict}</p>
        <p>{submission.submittedCode}</p>
    </div>
}

export default SuccessSubmission;