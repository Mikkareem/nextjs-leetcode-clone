'use client'

import { useFormStatus } from "react-dom";
import {Button, ButtonProps} from "@/components/ui/button";

const SubmitButton = (props: ButtonProps) => {

    const { pending } = useFormStatus()

    return (
        <Button type='submit' {...props} disabled={pending}>
            {pending ? '...' : props.children}
        </Button>
    );
};

export default SubmitButton;