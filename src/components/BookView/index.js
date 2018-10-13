// External Imports
import React from 'react';

// Internal Imports
import { Verse } from './styled';
import FilterNav from '../FilterNav';

const BookView = (props) => (
    <div>
        <FilterNav setVerses={props.setVerses} />
        {props.verses.map(verse => 
            <Verse
                onClick={props.handleClickOnVerse}
                id={verse.verseNumber}
                currVerseNumber={props.currVerse.verseNumber}
                className="verse"
            >
                <strong>{verse.verseNumber}</strong>{verse.body}
            </Verse>
        )}

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

export default BookView;