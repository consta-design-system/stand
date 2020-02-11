import React from 'react';
import File from '../../../File';

const SVG_S = (
  <React.Fragment>
    <path
      fill="#FCD55F"
      d="M19.6 0H1.4A1.4 1.4 0 000 1.4v25.2A1.4 1.4 0 001.4 28h18.2a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0019.6 0z"
    />
    <path
      fill="#fff"
      d="M6.5 4.382a1.494 1.494 0 00-1.7-.209V4H4v5h1V5.5a.5.5 0 011 0V9h1V5.5a.5.5 0 011 0V9h1V5.41l-.003-.002A1.5 1.5 0 006.5 4.382z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M14 7.4c0 .56-.14.967-.42 1.22-.273.253-.7.38-1.28.38h-.6c-.58 0-1.01-.127-1.29-.38-.273-.253-.41-.66-.41-1.22V5.6c0-.56.137-.967.41-1.22.28-.253.71-.38 1.29-.38h.6c.58 0 1.007.127 1.28.38.28.253.42.66.42 1.22v1.8zm-1-1.75c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17h-.5c-.247 0-.433.057-.56.17-.127.113-.19.273-.19.48v1.7c0 .207.063.367.19.48.127.113.313.17.56.17h.5c.247 0 .433-.057.56-.17.127-.113.19-.273.19-.48v-1.7z"
      clipRule="evenodd"
    />
    <path fill="#fff" d="M15 4h1v3h1V4h1v3l-1 2h-1l-1-2V4z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M17 12v13H4V12h13zm-3 12h2v-2h-2v2zm0-3h2v-2h-2v2zm-1-2v5.056H8V19h5zm0-1H8v-5.056h5V18zm1 0h2v-2h-2v2zm0-3h2v-2h-2v2zm-7 1v2H5v-2h2zm-2 5v-2h2v2H5zm0 1v2h2v-2H5zm2-7v-2H5v2h2z"
      clipRule="evenodd"
      opacity=".7"
    />
  </React.Fragment>
);

const SVG_M = (
  <React.Fragment>
    <path fill="#FCD55F" d="M28 0H2a2 2 0 00-2 2v36a2 2 0 002 2h26a2 2 0 002-2V2a2 2 0 00-2-2z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M24 18v17H7V18h17zm-3 .944h2V20h-2v-1.056zm0 15.112h2V33h-2v1.056zM21 32h2v-2h-2v2zm0-3h2v-2h-2v2zm-1-2v7.056h-9V27h9zm0-1h-9v-7.056h9V26zm1 0h2v-2h-2v2zm0-3h2v-2h-2v2zm-11 1v2H8v-2h2zm-2 5v-2h2v2H8zm0 1v2h2v-2H8zm0 4.056V33h2v1.056H8zM10 23v-2H8v2h2zm-2-4.056V20h2v-1.056H8z"
      clipRule="evenodd"
      opacity=".7"
    />
    <path
      fill="#fff"
      d="M10.5 7.382a1.494 1.494 0 00-1.7-.209V7H8v5h1V8.5a.5.5 0 011 0V12h1V8.5a.5.5 0 011 0V12h1V8.41l-.003-.002A1.5 1.5 0 0010.5 7.382z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M18 10.4c0 .56-.14.967-.42 1.22-.273.253-.7.38-1.28.38h-.6c-.58 0-1.01-.127-1.29-.38-.273-.253-.41-.66-.41-1.22V8.6c0-.56.137-.967.41-1.22.28-.253.71-.38 1.29-.38h.6c.58 0 1.007.127 1.28.38.28.253.42.66.42 1.22v1.8zm-1-1.75c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17h-.5c-.247 0-.433.057-.56.17-.127.113-.19.273-.19.48v1.7c0 .207.063.367.19.48.127.113.313.17.56.17h.5c.247 0 .433-.057.56-.17.127-.113.19-.273.19-.48v-1.7z"
      clipRule="evenodd"
    />
    <path fill="#fff" d="M19 7h1v3h1V7h1v3l-1 2h-1l-1-2V7z" />
  </React.Fragment>
);

const Mov = props => {
  let svg;

  if (props.size === 's') svg = SVG_S;
  else if (props.size === 'm') svg = SVG_M;

  return <File {...props}>{svg}</File>;
};

export default Mov;
