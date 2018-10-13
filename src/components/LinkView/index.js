import React from 'react';

import { Card, Row, Col, Collapse } from 'antd';
 
import LinkForm from '../../components/LinkForm';

const { Panel } = Collapse;

// const startVerseText = `Start Verse: ${props.originLinks[i].startVerseFrom} End Verse: ${props.originLinks[i].endVerseFrom}`;

const LinkView = ({ currVerse, links, originLinks }) => (
    <Row>
        {links.length > 0 &&
        <Col span={20}>
            <div>
                <h2>Book: {currVerse.book} Chapter: {currVerse.chapter} Verse: {currVerse.verse}</h2>
                <p>Links to the following sections:</p>
            </div>
            <Collapse>
            {links.map((link, i) => 
                <Panel header={`to Book: ${link[0].book} Chapter: ${link[0].chapter} [${originLinks[i].description}]`}>
                    {link.map((verse, index) => {
                        return (
                            <div key={index}>
                                <p><strong>{verse.verse}</strong>{verse.body}</p>
                            </div>
                        )
                    })}
                </Panel>
            )}
            </Collapse>
        </Col>}
        <Col span={7}>
            <LinkForm currVerse={currVerse} />
        </Col>
    </Row>
)

export default LinkView;