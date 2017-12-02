import React from 'react';

import LinkForm from '../../components/LinkForm';

const LinkView = (props) => (
    <div>
        <LinkForm currVerse={props.currVerse} />
        <h1>Book: {props.currVerse.book} Chapter: {props.currVerse.chapter} Verse: {props.currVerse.verse}</h1>
        <h2>Links to the following sections: </h2>
        {props.links.map(link => {
            return link.map((verse, index) => {
                return (
                    <div>
                        {(index === 0) ? <h3>Book: {verse.book} Chapter: {verse.chapter}</h3> : <p></p>}
                        <p><strong>{verse.verseNumber}</strong>{verse.body}</p>
                    </div>
                )
            })
        })}
    </div>
)

export default LinkView;