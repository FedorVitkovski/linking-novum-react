import React from 'react';

import { Button } from 'antd';

import FilterNav from '../FilterNav';

const BookView = (props) => (
    <div>
        <FilterNav setVerses={props.setVerses} />
        {props.verses.map((verse, index) => {
            return (
                <div
                    onClick={props.onClick}
                    id={verse.verseNumber}
                    style={{ cursor: 'pointer' }}
                >
                    <strong>{verse.verseNumber}</strong>{verse.body}
                </div>
            )
        })}
    </div>
)

export default BookView;