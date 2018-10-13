// External Imports
import React, { Component } from 'react';

// Internal Imports
import BookView from './components/BookView';
import LinkView from './components/LinkView';
import LinkForm from './components/LinkForm';
import { Container } from './styled';

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
    book: '',
    chapter: 0,
    currVerse: 0,
    verseBlocks: [],
    createLinkModalVisible: false,
    viewLinkModalVisible: false
  };

  showCreateLinkModal = () => {
    this.setState({ createLinkModalVisible: true });
  }

  hideCreateLinkModal = () => {
    this.setState({ createLinkModalVisible: false });
  }

  showViewLinkModal = () => {
    this.setState({ viewLinkModalVisible: true });
  }

  hideViewLinkModal = () => {
    this.setState({ viewLinkModalVisible: false });
  }

  setVerses = (verses, book, chapter) => {
    this.setState({
      verses: verses,
      book: book,
      chapter: chapter
    })
  }

  handleClickOnVerse = (e) => {
    this.setState({
      currVerse: e.target.id,
      links: []
    });

    // fetch all the links belonging to the current verses book/chapter/id
    fetch(`${process.env.REACT_APP_API_HOST}/api/links/${this.state.book}/${this.state.chapter}/${e.target.id}`)
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
    const { verses, verseBlocks, currVerse, book, chapter, originLinks, createLinkModalVisible, viewLinkModalVisible, links } = this.state;
    return (
        <Container>
          <BookView
            verses={verses}
            setVerses={this.setVerses}
            handleClickOnVerse={this.handleClickOnVerse}
            verseBlocks={verseBlocks}
            currVerse={currVerse}
            book={book}
            chapter={chapter}
            showCreateLinkModal={this.showCreateLinkModal}
            showViewLinkModal={this.showViewLinkModal}
          />
          <LinkForm
            currVerse={currVerse}
            modal={{
              show: this.showCreateLinkModal,
              hide: this.hideCreateLinkModal,
              visible: createLinkModalVisible
            }}
          />
          <LinkView
            currVerse={currVerse}
            links={links}
            originLinks={originLinks}
            modal={{
              show: this.showViewLinkModal,
              hide: this.hideViewLinkModal,
              visible: viewLinkModalVisible
            }}
          />
        </Container>
    );
  }
}

export default App;
