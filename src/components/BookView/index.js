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
                    style={{ cursor: 'pointer' }}
                >
                    <strong>{verse.verseNumber}</strong>{verse.body}
                    {console.log('props.verseBlocks', props.verseBlocks)}
                    {props.verseBlocks.map(verseBlock => <style jsx>{`
                        .verse:nth-child(n + ${verseBlock.startVerse + 1}):nth-child(-n+${verseBlock.endVerse + 1}) {
                            background-color: ${verseBlock.color};
                        }
                    `}</style>
                    )}
                </div>
            )
        })}
    </div>
)

export default BookView;