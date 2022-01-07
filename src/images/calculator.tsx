import React from 'react';

interface OwnProps {
  height: number;
  width: number;
}

export const Calculator: React.FunctionComponent<OwnProps> = ({ height, width }) => {
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`} version='1.1'
         xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <title>Combined Shape Copy</title>
      <desc>Created with Sketch.</desc>
      <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
        <g id='1' transform='translate(-222.000000, -38.000000)' fill='#3E3832'>
          <path
            d='M230.052632,54 L230.052632,61.5 L230.947368,61.5 L230.947368,54 L239,54 L239,59 C239,60.654 237.795684,62 236.315789,62 L236.315789,62 L224.684211,62 C223.204316,62 222,60.654 222,59 L222,59 L222,54 L230.052632,54 Z M225.379421,55.463 L224.744158,56.168 L225.848263,57.413 L224.745947,58.646 L225.378526,59.353 L226.478158,58.123 L227.567947,59.352 L227.885579,59 L228.204105,58.649 L227.111632,57.417 L228.203211,56.197 L227.569737,55.491 L226.480842,56.706 L225.379421,55.463 Z M236.315789,58 L232.736842,58 L232.736842,59 L236.315789,59 L236.315789,58 Z M236.315789,56 L232.736842,56 L232.736842,57 L236.315789,57 L236.315789,56 Z M230.052632,47 L230.052632,53 L222,53 L222,47 L230.052632,47 Z M239,47 L239,53 L230.947368,53 L230.947368,47 L239,47 Z M226.921053,48 L226.026316,48 L226.026316,49.5 L224.684211,49.5 L224.684211,50.5 L226.026316,50.5 L226.026316,52 L226.921053,52 L226.921053,50.5 L228.263158,50.5 L228.263158,49.5 L226.921053,49.5 L226.921053,48 Z M236.315789,50 L232.736842,50 L232.736842,51 L236.315789,51 L236.315789,50 Z M236.315789,38 C237.795684,38 239,39.346 239,41 L239,41 L239,46 L222,46 L222,41 C222,39.346 223.204316,38 224.684211,38 L224.684211,38 Z M235.963263,39.5 L225.037632,39.5 C224.348684,39.5 223.789474,40.126 223.789474,40.894 L223.789474,40.894 L223.789474,43.106 C223.789474,43.873 224.348684,44.5 225.037632,44.5 L225.037632,44.5 L235.962368,44.5 C236.650421,44.5 237.210526,43.873 237.210526,43.106 L237.210526,43.106 L237.210526,40.894 C237.210526,40.126 236.650421,39.5 235.963263,39.5 L235.963263,39.5 Z'
            id='Combined-Shape-Copy'></path>
        </g>
      </g>
    </svg>
  );
};