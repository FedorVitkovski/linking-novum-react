import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Collapse, Modal} from 'antd';
 
import LinkForm from '../../components/LinkForm';

const { Panel } = Collapse;

// const startVerseText = `Start Verse: ${props.originLinks[i].startVerseFrom} End Verse: ${props.originLinks[i].endVerseFrom}`;

const LinkView = ({ linksVersesFrom, linksVersesTo, links }) => (
    <div>
        <Link to="/">Select another verse</Link>

        <Row style={{ width: '100%' }}>
            {linksVersesFrom.length > 0 &&
            <Col span={5} style={{ width: '50%' }}>
                <Collapse>
                {linksVersesFrom.map((link, i) => 
                    <Panel header={`to Book: ${link[0].book} Chapter: ${link[0].chapter} [${links[i].description}]`}>
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
            {links.length > 0 &&
            <Col span={5} style={{ width: '50%' }}>
                <Collapse>
                {linksVersesTo.map((link, i) =>
                    <Panel header={`to Book: ${link[0].book} Chapter: ${link[0].chapter} [${links[i].description}]`}>
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
        </Row>
    </div>
)

export default LinkView;