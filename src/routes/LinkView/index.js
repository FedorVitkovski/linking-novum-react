import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse } from 'antd';

const { Panel } = Collapse;

class LinkView extends Component {
    
    state = {
        currSectionsVerses: [],
        linkedSectionsVerses: []
    }

    componentDidMount() {
        for (let i = 0; i < this.props.currSections.length; i++) {
            this.fetchSectionVerses(this.props.currSections[i]).then(({ docs }) => {
    
                const filteredVerses = docs
                    .filter(verse => verse.chapter.book.name == this.props.currBook.name)
                    .sort((a, b) => a.counter > b.counter ? 1 : -1);

                console.log([...this.state.currSectionsVerses, filteredVerses]);

                this.setState(state => ({ currSectionsVerses : [...state.currSectionsVerses, filteredVerses]}));
                
                console.log(this.state.currSectionsVerses);
            });
        }
        
    }

    fetchSectionVerses = (section) => {
        return fetch(`${process.env.REACT_APP_API_HOST}/verse?$embed=chapter.book&$where={ "counter" : { "$gte" : ${section.startCounter}, "$lte": ${section.endCounter} } }`)
            .then(res => res.json())
    }

    render() {
        return (
            <div>
                <Link to="/">Select another verse</Link>
                <Row style={{ width: '100%' }}>
                    <Col span={5} style={{ width: '50%' }}>
                        <Collapse>
                        {this.state.currSectionsVerses.map((section) => (
                            <Panel header={`Book: ${section[0].chapter.book.name} From: ${section[0].chapter.name} To: ${section[5].chapter.name}`}>
                                {section.map(verse => {
                                    return (
                                        <div key={verse._id}>
                                            <p><strong>{verse.chapter.number}:{verse.verseNumber}</strong>{verse.body}</p>
                                        </div>
                                    )
                                })}
                            </Panel>
                        ))}
                        </Collapse>
                    </Col>
                </Row>
            </div>
        )
    }
}

// const LinkView = ({ linksVersesFrom, linksVersesTo, links }) => (
//     <div>
//         <Link to="/">Select another verse</Link>

//         <Row style={{ width: '100%' }}>
//             {linksVersesFrom.length > 0 &&
//             <Col span={5} style={{ width: '50%' }}>
//                 <Collapse>
//                 {linksVersesFrom.map((link, i) => 
//                     <Panel header={`to Book: ${link[0].book} Chapter: ${link[0].chapter} [${links[i].description}]`}>
//                         {link.map((verse, index) => {
//                             return (
//                                 <div key={index}>
//                                     <p><strong>{verse.verse}</strong>{verse.body}</p>
//                                 </div>
//                             )
//                         })}
//                     </Panel>
//                 )}
//                 </Collapse>
//             </Col>}
//             {links.length > 0 &&
//             <Col span={5} style={{ width: '50%' }}>
//                 <Collapse>
//                 {linksVersesTo.map((link, i) =>
//                     <Panel header={`to Book: ${link[0].book} Chapter: ${link[0].chapter} [${links[i].description}]`}>
//                         {link.map((verse, index) => {
//                             return (
//                                 <div key={index}>
//                                     <p><strong>{verse.verse}</strong>{verse.body}</p>
//                                 </div>
//                             )
//                         })}
//                     </Panel>
//                 )}
//                 </Collapse>
//             </Col>}
//         </Row>
//     </div>
// )

export default LinkView;