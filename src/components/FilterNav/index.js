// External Imports
import React, { Component } from 'react';

// Internal Imports
import FilterNavForm from './components/FilterNavForm';

class FilterNav extends Component {
    
    handleSearchChapter = (e) => {
        e.preventDefault();
        const form = this.form;
        form.validateFields((err, { book, chapter }) => {
            if (err) {
                return;
            }

            console.log(book);
    
            fetch(`${process.env.REACT_APP_API_HOST}/api/verses/${book}/${chapter}`)
                .then(resp => resp.json())
                .then(verses => {
                    this.props.setVerses(verses, book, chapter);
                });

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