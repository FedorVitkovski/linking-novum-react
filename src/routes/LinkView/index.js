import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse } from 'antd';

const { Panel } = Collapse;

class LinkView extends Component {
    
    state = {
        currSectionsVerses: [],
        linkedSectionsVerses: []
    }

    async componentDidMount() {
        currSectionsVerses = [];
        for (let i = 0; i < this.props.currSections; i++) {
            this.fetchSectionVerses(this.props.currSections[i]).then((verses) => {
                this.setState(state => ({ currSectionsVerses : [...state.currSectionsVerses, state.value]}));
            });
        }
    }

    fetchSectionVerses = (section) => {
        return new Promise((resolve, reject) => {
            // your AJAX request here
        })
    }

    render() {
        return (
            <div>
                <Link to="/">Select another verse</Link>
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