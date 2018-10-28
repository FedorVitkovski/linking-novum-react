import styled from 'styled-components';

export const Verse = styled.div`
    cursor: pointer;
    margin-right: '4rem';
    &:hover {
        background-color: grey;
        color: white;
    }
    background-color: ${({ currVerseNumber, id }) => currVerseNumber == id ? "#8BC34A" : null} !important
`;

export const Header = styled.h2`
    margin-top: 2rem;
`;

export const VerseView = styled.div`
    padding: 30px;
`;