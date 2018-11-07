import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse, Button } from 'antd';

const { Panel } = Collapse;

class LinkView extends Component {
    
    state = {
        currSectionsVerses: [],
        linkedSectionsVerses: [],
        descriptions: []
    }

    componentDidMount() {
        this.setSectionVerses(this.props.currSections);
    }

    fetchSectionVerses = (section) => {
        return fetch(`${process.env.REACT_APP_API_HOST}/verse?$embed=chapter.book&$where={ "counter" : { "$gte" : ${section.startCounter}, "$lte": ${section.endCounter} } }`)
            .then(res => res.json())
    }

    handleCurrSectionClick = async (e) => {
        this.setState({
            linkedSectionsVerses: []
        });

        const currSectionId = e.target.id;

        const links = await (await fetch(`${process.env.REACT_APP_API_HOST}/section/${currSectionId}/link`)).json();

        const descriptions = [];

        const linkedSectionsIds = links.map(link => {
            descriptions.push(link.description);
            if (link.section1 == currSectionId) {
                return link.section2;
            } else {
                return link.section1;
            }
        });

        this.setState({
            descriptions
        });

        const linkedSections = await (await fetch(`${process.env.REACT_APP_API_HOST}/section?_id=${linkedSectionsIds.join(',')}&$embed=book`)).json();
        const bookName = linkedSections.docs[0].book.name;
        this.setSectionVerses(linkedSections.docs, false, bookName);
    }

    setSectionVerses = (sections, current = true, bookName = '') => {
        for (let i = 0; i < sections.length; i++) {
            this.fetchSectionVerses(sections[i]).then(({ docs }) => {
    
    

                if (current) {
                    const filteredVerses = docs
                        .filter(verse => verse.chapter.book.name == this.props.currBook.name)
                        .sort((a, b) => a.counter > b.counter ? 1 : -1)
                    this.setState(state => ({ currSectionsVerses : [...state.currSectionsVerses, filteredVerses]}));
                } else {
                    const filteredVerses = docs
                        .filter(verse => verse.chapter.book.name == bookName)
                        .sort((a, b) => a.counter > b.counter ? 1 : -1)
                    this.setState(state => ({ linkedSectionsVerses : [...state.linkedSectionsVerses, filteredVerses] }));
                }
            });
        }
    }

    render() {
        return (
            <div>
                <Link to="/">Select another verse</Link>
                <Row style={{ width: '100%', minWidth: '1200px' }}>
                    <Col span={5} style={{ width: '50%' }}>
                        <Collapse>
                        {this.state.currSectionsVerses.map((section, index) => (
                            <Panel
                                header={`Book: ${section[0].chapter.book.name} From: ${section[0].chapter.name} To: ${section[section.length - 1].chapter.name}`}
                            >
                                <Button
                                    onClick={this.handleCurrSectionClick}
                                    id={this.props.currSections[index]._id}
                                    style={{ marginBottom: '2px' }}
                                >
                                    Show sections this section links to
                                </Button>
        
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
                    <Col span={5} style={{ width: '50%' }}>
                        <Collapse>
                        {this.state.linkedSectionsVerses.map((section, index) => (
                            <Panel
                                header={`Book: ${section[0].chapter.book.name} | From: ${section[0].chapter.name} To: ${section[section.length - 1].chapter.name} | "${this.state.descriptions[index]}"`}
                            >
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