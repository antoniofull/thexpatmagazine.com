import React from 'react';
import styled, { css } from 'styled-components';
import { Search } from 'styled-icons/fa-solid/Search';
import { Algolia } from 'styled-icons/fa-brands/Algolia';

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1rem;
`;

export const SearchIcon = styled(Search)`
  width: 1rem;
  pointer-events: none;
  color: #3a3a3a;
  @media (max-width: 1024px) {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
`;

const focus = css`
  background: white;
  color: #3a3a3a;
  cursor: text;
  width: 10rem;
  + ${SearchIcon} {
    color: var(--color-text);
  }
`;

const collapse = css`
  width: 0;
  cursor: pointer;
  color: #3a3a3a;
  + ${SearchIcon} {
    color: #3a3a3a;
  }
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: #dedede;
  }
`;

const expand = css`
  background: #ccc;
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0;
    @media (max-width: 1024px) {
      margin: 0;
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding: var(--padding);
    background: white;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: all 0.2s;
  border-radius: 4px;
  ${props => (props.collapse ? collapse : expand)};
  @media (max-width: 1024px) {
    ${expand};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
`;

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: inset 0px 4px 8px -3px rgba(17, 17, 17, 0.06);
  padding: 0.7em 1em 0.4em;
  background: white;
  border-radius: $4px;
  > * + * {
    padding-top: 1em;
    border-top: 2px solid #bbb;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid #dedede;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
    color: var(--color-text);
    background: yellow;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      background: #dedede;
      padding: 0.1em 0.4em;
      border-radius: 4px;
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding: var(--padding);
    background: white;
    max-width: 90%;
  }
`;

export const PoweredBy = () => (
  <span css='font-size: 0.6em; text-align: end; padding: 0;'>
    Powered by{` `}
    <a href='https://algolia.com'>
      <Algolia size='1em' /> Algolia
    </a>
  </span>
);
