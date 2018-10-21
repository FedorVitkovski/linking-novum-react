// External Imports
import React, { Component } from 'react';

// Internal Imports
import FilterNavForm from './components/FilterNavForm';

class FilterNav extends Component {
    
    handleSearchChapter = (e) => {
        e.preventDefault();
        const form = this.form;
        form.validateFields(async (err, { book, chapter }) => {
            if (err) {
                return;
            }

            try {
                const bookData = await (await fetch(`${process.env.REACT_APP_API_HOST}/book?name=${book.toLowerCase()}`)).json();
                const bookId = bookData.docs[0]._id;
    
                const chapterData = await (await fetch(`${process.env.REACT_APP_API_HOST}/book/${bookId}/chapter?number=${chapter}`)).json();
                const chapterId = chapterData.docs[0]._id;
    
                const verseData = await (await fetch(`${process.env.REACT_APP_API_HOST}/chapter/${chapterId}/verse?$sort=counter`)).json();
                const verses = verseData.docs;

                this.props.setVerses(verses, book, chapter);
            } catch (e) {
                console.log(e);
            }

            form.resetFields();
        });
    }
      
    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        return (
            <FilterNavForm
                ref={this.saveFormRef}
                handleSearchChapter={this.handleSearchChapter}
            />
        );
    }
}

export default FilterNav;