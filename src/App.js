// External Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Internal Imports
import BookView from './routes/BookView';
import LinkView from './routes/LinkView';
import LinkForm from './components/LinkForm';
import { Container } from './styled';


class App extends Component {

  state = {
    verses: [],
    book: null,
    chapter: null,
    currVerse: null,
    currSections: [],
    linkedSections: [],
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

  handleClickOnVerse = async (verse) => {
    const currSections = await (await fetch(`${process.env.REACT_APP_API_HOST}/section/${this.state.book._id}/${verse.counter}`)).json();
    
    this.setState({
      currVerse: verse,
      currSections
    });
  }
  render() {
    const { currSections, linkedSections, verses, currVerse, book, chapter, createLinkModalVisible } = this.state;
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
                    currSections={currSections}
                    linkedSections={linkedSections}
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
