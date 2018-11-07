// External Imports
import React from 'react';
import { Button } from 'antd';

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
                        onClick={() => handleClickOnVerse(verse)}
                        value={verse}
                        id={verse.verseNumber}
                        currVerseNumber={currVerse != null ? currVerse.verseNumber : 0}
                        className="verse"
                    >
                        <strong>{verse.verseNumber}</strong>{verse.body}
                    </Verse>
                    {currVerse != null && verse.verseNumber == currVerse.verseNumber && 
                        <Button style={{ marginTop: '3px' }} onClick={showCreateLinkModal} shape='circle' icon='plus'></Button>   
                    }
                    {currVerse != null && verse.verseNumber == currVerse.verseNumber && 
                        <Button onClick={() => history.push('/links')} shape='circle' icon='eye'></Button>   
                    }
                </div>
            )}
        </VerseView>
    </React.Fragment>
)

export default BookView;