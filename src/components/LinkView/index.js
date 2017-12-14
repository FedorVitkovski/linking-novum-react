import React from 'react';

import { Card, Icon } from 'antd';
 
import LinkForm from '../../components/LinkForm';

import './linkview.css';

const { Meta } = Card;

const LinkView = (props) => (
    <div>
        <LinkForm currVerse={props.currVerse} />
        <h1>Book: {props.currVerse.book} Chapter: {props.currVerse.chapter} Verse: {props.currVerse.verse}</h1>
        <h2 style={{marginBottom: '1em'}}>Links to the following sections: </h2>
        {props.links.map((link, i) => {
            console.log(link);
            return link.map((verse, index) => {
                console.log(index);
                return (
                    <div key={index}>
                        {(index === 0) ? 
                            // <div>
                            //     <h3>Start Verse: {props.originLinks[i].startVerseFrom} End Verse: {props.originLinks[i].endVerseFrom}</h3>
                            //     <p>links to: </p>
                            //     <h3>Book: {verse.book} Chapter: {verse.chapter}</h3>
                            //     <h4>{props.originLinks[i].description}</h4>
                            // </div>
                            <Card
                                style={{ width: 300, backgroundColor: '#ECECEC', padding: '0 !important' }}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                                {/* <Meta
                                    title={`Start Verse: ${props.originLinks[i].startVerseFrom} End Verse: ${props.originLinks[i].endVerseFrom}`}
                                    description={`Book: ${verse.book} Chapter: ${verse.chapter}`}
                                /> */}
                                <h3>Start Verse: {props.originLinks[i].startVerseFrom} End Verse: {props.originLinks[i].endVerseFrom}</h3>
                                <h3>links to: </h3>
                                <h3>Book: {verse.book} Chapter: {verse.chapter}</h3>
                                <h4>{props.originLinks[i].description}</h4>  
                            </Card>
                            : <p></p>}
                        <p><strong>{verse.verseNumber}</strong>{verse.body}</p>
                    </div>
                )
            })
        })}
    </div>
)

export default LinkView;