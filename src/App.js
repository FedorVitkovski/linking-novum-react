// External Imports
import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

// Internal Imports
import BookView from './components/BookView';
import LinkView from './components/LinkView';

const { Content } = Layout;

const blockColors = [
  '255, 193, 7',
  '244, 67, 54',
  '139, 195, 74'
];

class App extends Component {

  state = {
    verses: [],
    links: [],
    originLinks: [],
    currVerse: {
      book: '',
      chapter: 0,
      verseNumber: 0
    },
    verseBlocks: []
  };

  setVerses = (verses, book, chapter) => {
    this.setState({
      verses: verses,
      currVerse: {
        book: book,
        chapter: chapter
      }
    })
  }

  handleClickOnVerse = (e) => {
    this.setState({
      currVerse: {
        ...this.state.currVerse,  
        verseNumber: e.target.id
      },
      links: []
    });

    // fetch all the links beloging to the current verses book/chapter/id
    fetch(`${process.env.REACT_APP_API_HOST}/api/links/${this.state.currVerse.book}/${this.state.currVerse.chapter}/${e.target.id}`)
      .then(resp => resp.json())
      .then(links => {
        let linksArr = [];
        let originLinksArr = [];
        this.setState({
          verseBlocks: []
        });
        links.map((link, index) => {
          originLinksArr[index] = link;
          this.setState({
            originLinks: originLinksArr,
            verseBlocks: [...this.state.verseBlocks, {
              startVerse: link.startVerseFrom,
              endVerse: link.endVerseFrom,
              color: blockColors[index]
            }]
        });
      // fetch all the verses belonging to each link
      fetch(`${process.env.REACT_APP_API_HOST}/api/verses/${link.bookTo}?startCh=${link.startChapterNameTo}&startVerse=${link.startVerseTo}&endCh=${link.endChapterNameTo}&endVerse=${link.endVerseTo}`)
      .then(resp => resp.json())
      .then(verses => {
          linksArr[index] = verses;
          this.setState({
            links: linksArr
          });
        });
      });
    });
  }

  render() {
    return (
      <Layout className='layout'>
        <Content style={{ padding: '40px' }}>
          <Row>
            <Col span={12}>
              <BookView
                verses={this.state.verses}
                setVerses={this.setVerses}
                handleClickOnVerse={this.handleClickOnVerse}
                verseBlocks={this.state.verseBlocks}
                currVerse={this.state.currVerse}
              />
            </Col>
            <Col span={12}>
              <LinkView
                links={this.state.links}
                originLinks={this.state.originLinks}
                currVerse={this.state.currVerse} 
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
