import React, { Component } from 'react';

import TopNav from './components/TopNav';
import BookView from './components/BookView';
import LinkView from './components/LinkView';

import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const blockColors = [
  '#F44336',
  '#FFC107',
  '#8BC34A'
]

class App extends Component {

  state = {
    verses: [],
    links: [],
    originLinks: [],
    currVerse: {
      book: '',
      chapter: 0,
      verse: 0
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

  onClick = (e) => {
    this.setState({
      currVerse: {
        ...this.state.currVerse,  
        verse: e.target.id
      },
      links: []
    })
    fetch(`https://linking-novum-api.herokuapp.com/api/links/${this.state.currVerse.book}/${this.state.currVerse.chapter}/${e.target.id}`)
    .then(resp => resp.json())
    .then((links, index) => {
      let linksArr = [];
      let originLinksArr = [];
      this.setState({
        verseBlocks: []
      })
      links.map((link, index) => {
      originLinksArr[index] = link;
      this.setState({
        originLinks: originLinksArr,
        verseBlocks: [...this.state.verseBlocks, {
          startVerse: link.startVerseFrom,
          endVerse: link.endVerseFrom,
          color: blockColors[index]
        }]
      })
      console.log('CLICKED ON THE LINK!', link);
  
      fetch(`https://linking-novum-api.herokuapp.com/api/verses/${link.bookTo}?startCh=${link.startChapterNameTo}&startVerse=${link.startVerseTo}&endCh=${link.endChapterNameTo}&endVerse=${link.endVerseTo}`)
      .then(resp => resp.json())
      .then(verses => {
          console.log('verses ---------------------- verses');
          console.log(verses);
          linksArr[index] = verses;
          this.setState({
            links: linksArr
          })
        })
      })
    })
  }

  render() {
    return (
      <Layout className='layout'>
        {/* <Header>
          <TopNav />
        </Header> */}
        <Content style={{ padding: '40px' }}>
          <Row>
            <Col span={12}>
              <BookView verses={this.state.verses} setVerses={this.setVerses} onClick={this.onClick} verseBlocks={this.state.verseBlocks} />
            </Col>
            <Col span={12}>
              <LinkView links={this.state.links} originLinks={this.state.originLinks} currVerse={this.state.currVerse} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
