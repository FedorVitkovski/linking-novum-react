import React from 'react';

import { Card, Row, Col, Collapse } from 'antd';
 
import LinkForm from '../../components/LinkForm';

import './linkview.css';

const { Meta } = Card;
const { Panel } = Collapse;

// const startVerseText = `Start Verse: ${props.originLinks[i].startVerseFrom} End Verse: ${props.originLinks[i].endVerseFrom}`;

const LinkView = (props) => (
    <Row>
        {props.links.length > 0 &&
        <Col span={20}>
            <div>
                <h2>Book: {props.currVerse.book} Chapter: {props.currVerse.chapter} Verse: {props.currVerse.verse}</h2>
                <p>Links to the following sections:</p>
            </div>
            <Collapse>
            {props.links.map((link, i) => {
                console.log(link);
                return <Panel header={`to Book: ${link[0].book} Chapter: ${link[0].chapter} [${props.originLinks[i].description}]`}>
                {link.map((verse, index) => {
                    console.log(index);
                    return (
                        <div key={index}>
                            <p><strong>{verse.verseNumber}</strong>{verse.body}</p>
                        </div>
                    )
                })}
                </Panel>
            })}
            </Collapse>
        </Col>}
        <Col span={7}>
            <LinkForm currVerse={props.currVerse} />
        </Col>
    </Row>
)

export default LinkView;