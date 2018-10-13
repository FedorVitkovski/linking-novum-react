import styled from 'styled-components';

export const Verse = styled.div`
    cursor: pointer;
    margin-right: '4rem';
    &:hover {
        background-color: grey;
        color: white;
    }
    background-color: ${props => props.currVerseNumber == props.id ? "palevioletred" : null} !important
`;