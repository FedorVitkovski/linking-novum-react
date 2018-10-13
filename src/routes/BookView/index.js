// External Imports
import React from 'react';

// Internal Imports
import { Verse, Header, VerseView } from './styled';
import FilterNav from '../../components/FilterNav';

const BookView = ({ verses, currVerse, setVerses, handleClickOnVerse, book, chapter, showCreateLinkModal, history }) => (
    <React.Fragment>
        <FilterNav setVerses={setVerses} />
        {chapter > 0 && <Header>Book: {book} Chapter: {chapter}</Header>}
        <VerseView>
            {verses.map(verse =>
                <div>
                    <Verse
                        onClick={handleClickOnVerse}
                        id={verse.verseNumber}
                        currVerseNumber={currVerse}
                        className="verse"
                    >
                        <strong>{verse.verseNumber}</strong>{verse.body}
                    </Verse>
                    {verse.verseNumber == currVerse && 
                        <button onClick={showCreateLinkModal}>Create a Link</button>   
                    }
                    {verse.verseNumber == currVerse && 
                        <button onClick={() => history.push('/links')}>View Links</button>   
                    }
                </div>
            )}
        </VerseView>
    </React.Fragment>
)

export default BookView;