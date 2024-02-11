import React from 'react';
import { useState } from 'react';

import './Simulator.css';

function getChar(leftTape :any, rightTape : any, centerSpot : any, pos : any): string | null | undefined {
    if (pos == 0)
        return centerSpot;
    if (pos < 0) {
        if (Math.abs(pos) - 1 >= leftTape.length)
            return null;
        return leftTape[Math.abs(pos) - 1];
    }
    if (pos - 1 >= rightTape.length)
        return null;
    return rightTape[pos - 1];
}

function getEntriesStartingFromIndex<Type>(leftTape: string[], rightTape: string[], centerSpot: string, startIndex: number, count: number, func: (value: string | null | undefined, index: number) => Type): Type[] {
    let res: Type[] = [];
    for (let i = startIndex; i < startIndex + count; i++)
        res.push(func(getChar(leftTape, rightTape, centerSpot, i), i));
    return res;
}


function TapeViewComponent({ leftTape, rightTape, centerSpot, headLocation, editIndex, previousChar }:
    { leftTape: string[], rightTape: string[], centerSpot: string, headLocation: number, editIndex: number | undefined, previousChar: string |undefined }) {
    const [firstIndex, changeFirstIndex] = React.useState(0);



    const NumberOfBoxesShown = 20;

    React.useEffect(() => {

        const checkScroll = (event : any) => {
            var element = document.querySelector('.tape');
            if (element?.matches(':hover')) {
                if (event.deltaY < 0) {
                    changeFirstIndex(firstIndex + 1);
                }
                else if (event.deltaY > 0) {
                    changeFirstIndex(firstIndex - 1);
                }
            }
        }

        window.addEventListener('wheel', checkScroll);

        return () => {
            window.removeEventListener('wheel', checkScroll);
        }
    }, [firstIndex, changeFirstIndex])


    const TapeSize = leftTape.length + 1 + rightTape.length;

    if (TapeSize + 2 <= NumberOfBoxesShown) {
        return (

            <div className='tape-view' >
    
                <div className='tape'>
                {getEntriesStartingFromIndex(leftTape, rightTape, centerSpot, -(leftTape.length )-  Math.floor((NumberOfBoxesShown - TapeSize) / 2), NumberOfBoxesShown, (value, index) => {
    
                    if (index == editIndex) {
                        return (
                            <div className='tape-col'>
                                <div className='tape-index-box'>{index}</div> 
                                <div className={`tape-edit-box`}>  
                                <div> <del> {previousChar}</del> </div>
                                <div>{value} </div>
                                </div>
                            </div>
                        );
    
                    }
    
                    let a: string = 'regular';
                    if (value === null) {
                        a = 'invalid';
                    } else if (index == headLocation) {
                        a = 'head';
                    }
    
                    return <div className='tape-col'><div className='tape-index-box'>{index}</div> <div className={`tape-${a}-box`}>  {value}</div></div>;
                })}
                </div>
                
            </div>
    
    
        );
    }


    return (

        <div className='tape-view' >

            <div className='tape'>
            {getEntriesStartingFromIndex(leftTape, rightTape, centerSpot, firstIndex, NumberOfBoxesShown, (value, index) => {

                if (index == editIndex) {
                    return (
                        <div className='tape-col'>
                            <div className='tape-index-box'>{index}</div> 
                            <div className={`tape-edit-box`}>  
                            <div> <del> {previousChar}</del> </div>
                            <div>{value} </div>
                            </div>
                        </div>
                    );

                }

                let a: string = 'regular';
                if (value === null) {
                    a = 'invalid';
                } else if (index == headLocation) {
                    a = 'head';
                }

                return <div className='tape-col'><div className='tape-index-box'>{index}</div> <div className={`tape-${a}-box`}>  {value}</div></div>;
            })}
            </div>
            <div className = 'slide-container'>
                <div className = 'slider-track'>
                    <div style = {{position: 'relative', float: 'none', width: '50px', height: '100%',backgroundColor: '#3399ff', left: '0%'}} className = 'slider-thumb'></div>
                </div>
            </div>
        </div>


    );
}

//&nbsp; (space character)

export default TapeViewComponent;