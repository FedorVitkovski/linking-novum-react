import React from 'react';

import './bookview.css';
import FilterNav from '../FilterNav';

const BookView = (props) => (
    <div>
        <FilterNav setVerses={props.setVerses} />
        {props.verses.map(verse => {
            return (
                <div
                    onClick={props.onClick}
                    id={verse.verseNumber}
                    className="verse"
                    style={{ cursor: 'pointer', marginRight: '4rem' }}
                >
                    <strong>{verse.verseNumber}</strong>{verse.body}
                    {console.log('props.verseBlocks', props.verseBlocks)}
                    {props.verseBlocks.map(verseBlock => <style jsx>{`
                        .verse:nth-child(n + ${verseBlock.startVerse + 1}):nth-child(-n+${verseBlock.endVerse + 1}) {
                            background-color: rgba(${verseBlock.color}, 0.3);
                        }
                        .verse:nth-child(${verseBlock.endVerse + 1})::after {
                            content: "";
                            display: block;
                            width: 100%;
                            border-bottom: 3px dashed rgba(${verseBlock.color}, 0.4);
                        }
                    `}</style>
                    )}
                </div>
            )
        })}
    </div>
)

export default BookView;