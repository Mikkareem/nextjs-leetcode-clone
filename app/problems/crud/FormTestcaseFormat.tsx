'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useState} from "react";
import HiddenInput from "@/components/HiddenInput";
import {Minus, Plus} from "lucide-react";


// eslint-disable-next-line import/no-anonymous-default-export,react/display-name
export default () => {
    const [inputCount, setInputCount] = useState(1)

    return (
        <div className='flex flex-col gap-4'>
            <h3 className='text-2xl'>Testcases Format</h3>
            <div className="flex flex-col gap-2">
                <Label htmlFor='inputCount'>Input Count</Label>
                <div className='flex gap-2 items-center'>
                    <Minus
                        size={30}
                        className='p-2 rounded bg-muted'
                        onClick={() => setInputCount(value => value > 1 ? value-1: value)}
                    />
                    <Label className='font-bold'>{inputCount}</Label>
                    <Plus
                        size={30}
                        className='p-2 rounded bg-muted'
                        onClick={() => setInputCount(value => value < 10 ? value+1: value)}
                    />
                </div>
                <HiddenInput value={inputCount} name='inputCount' />
            </div>
            {
                [...Array(inputCount)].map((_, i) => i+1).map(i => (
                    <div key={i} className="flex flex-col gap-4">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor={`testcaseInputName${i}`} className='font-bold'>Input Name</Label>
                            <Input
                                name={`testcaseInputName${i}`}
                                id={`testcaseInputName${i}`}
                            />
                            <HiddenInput name={`order${i}`} value={`${i}`}/>
                        </div>
                        <div className='flex gap-4'>
                            <Label className='font-bold'>Type</Label>
                            <RadioGroup
                                name={`type${i}`}
                                defaultValue='NON_STRING'
                                className="flex">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="STRING" id="r1"/>
                                    <Label htmlFor="r1">String</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="NON_STRING" id="r2"/>
                                    <Label htmlFor="r2">Non String</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='flex gap-4'>
                            <Label className='font-bold'>Collection Type</Label>
                            <RadioGroup
                                name={`collection${i}`}
                                defaultValue='SINGLE'
                                className="flex">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="SINGLE" id="r1"/>
                                    <Label htmlFor="r1">Single</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="LIST" id="r2"/>
                                    <Label htmlFor="r2">List</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="LIST_LIST" id="r3"/>
                                    <Label htmlFor="r3">2D List</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}