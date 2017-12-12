import React from 'react';

import LinkForm from '../../components/LinkForm';

const LinkView = (props) => (
    <div>
        <LinkForm currVerse={props.currVerse} />
        <h1>Book: {props.currVerse.book} Chapter: {props.currVerse.chapter} Verse: {props.currVerse.verse}</h1>
        <h2 style={{marginBottom: '1em'}}>Links to the following sections: </h2>
        {props.links.map(link => {
            console.log(link);
            return link.map((verse, index) => {
                console.log(index);
                return (
                    <div key={index}>
                        {(index === 0) ? <div><h2>Book: {verse.book} Chapter: {verse.chapter}</h2><h3>Start Verse: {props.originLinks[index].startVerseFrom} End Verse: {props.originLinks[index].endVerseFrom}</h3><h4>{props.originLinks[index].description}</h4></div> : <p></p>}
                        <p><strong>{verse.verseNumber}</strong>{verse.body}</p>
                    </div>
                )
            })
        })}
    </div>
)

export default LinkView;