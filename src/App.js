import React, { Component } from 'react';

import TopNav from './components/TopNav';
import BookView from './components/BookView';
import LinkView from './components/LinkView';

import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {

  state = {
    verses: [],
    links: [],
    currVerse: {
      book: '',
      chapter: 0,
      verse: 0
    }
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

  setLinks = links => {
    this.setState({
      links: links
    })
  }

  onClick = (e) => {
    this.setState({
      currVerse: {
        ...this.state.currVerse,  
        verse: e.target.id
      }
    })
    fetch(`https://linking-novum-api.herokuapp.com/api/links/${this.state.currVerse.book}/${this.state.currVerse.chapter}/${e.target.id}`)
    .then(resp => resp.json())
    .then(links => {
      let linksArr = [];
      links.map((link, index) => {
      fetch(`https://linking-novum-api.herokuapp.com/api/verses/${link.bookTo}?startCh=${link.startChapterNameTo}&startVerse=${link.startVerseTo}&endCh=${link.endChapterNameTo}&endVerse=${link.endVerseTo}`)
      .then(resp => resp.json())
      .then(verses => {
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
        <Header>
          <TopNav />
        </Header>
        <Content style={{ padding: '20px' }}>
          <Row>
            <Col span={12}>
              <BookView verses={this.state.verses} setVerses={this.setVerses} onClick={this.onClick} />
            </Col>
            <Col span={12}>
              <LinkView links={this.state.links} currVerse={this.state.currVerse} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
