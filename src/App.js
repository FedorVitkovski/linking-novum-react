// External Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Internal Imports
import BookView from './routes/BookView';
import LinkView from './routes/LinkView';
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
    linksVersesFrom: [],
    linksVersesTo: [],
    book: '',
    chapter: 0,
    currVerse: 0,
    verseBlocks: [],
    createLinkModalVisible: false
  };

  showCreateLinkModal = () => {
    this.setState({ createLinkModalVisible: true });
  }

  hideCreateLinkModal = () => {
    this.setState({ createLinkModalVisible: false });
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
        let linksVersesFrom = [];
        let linksVersesTo = [];
        this.setState({
          links
        });
        links.map((link, index) => {
        //   originLinksArr[index] = link;
        //   this.setState({
        //     originLinks: originLinksArr,
        // });
          console.log(link);

          // fetch all the FROM verses belonging to each link
          fetch(`${process.env.REACT_APP_API_HOST}/api/verses/${link.bookFrom}?startCh=${link.startChapterNameFrom}&startVerse=${link.startVerseFrom}&endCh=${link.endChapterNameFrom}&endVerse=${link.endVerseFrom}`)
            .then(resp => resp.json())
            .then(verses => {
                linksVersesFrom[index] = verses;
                this.setState({
                  linksVersesFrom
                });
              });

          // fetch all the TO verses belonging to each link
          fetch(`${process.env.REACT_APP_API_HOST}/api/verses/${link.bookTo}?startCh=${link.startChapterNameTo}&startVerse=${link.startVerseTo}&endCh=${link.endChapterNameTo}&endVerse=${link.endVerseTo}`)
            .then(resp => resp.json())
            .then(verses => {
                linksVersesTo[index] = verses;
                this.setState({
                  linksVersesTo
                });
              });
        });
    });
  }

  render() {
    const { verses, verseBlocks, currVerse, book, chapter, createLinkModalVisible, linksVersesFrom, linksVersesTo, links } = this.state;
    return (
        <Container>
          <Router>
            <Switch>
              <Route
                exact
                path="/" 
                render={({ history }) => 
                  <BookView
                    history={history}
                    verses={verses}
                    setVerses={this.setVerses}
                    handleClickOnVerse={this.handleClickOnVerse}
                    verseBlocks={verseBlocks}
                    currVerse={currVerse}
                    book={book}
                    chapter={chapter}
                    showCreateLinkModal={this.showCreateLinkModal}
                    showViewLinkModal={this.showViewLinkModal}
                  />}
              />
              <Route
                path="/links" 
                render={({ history }) => 
                  <LinkView
                    history={history}
                    currVerse={currVerse}
                    linksVersesFrom={linksVersesFrom}
                    linksVersesTo={linksVersesTo}
                    links={links}
                  />}
              />
            </Switch>
          </Router>
          <LinkForm
            currVerse={currVerse}
            modal={{
              show: this.showCreateLinkModal,
              hide: this.hideCreateLinkModal,
              visible: createLinkModalVisible
            }}
          />
        </Container>
    );
  }
}

export default App;
