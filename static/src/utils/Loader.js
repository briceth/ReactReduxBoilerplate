import React, { Component } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader';

const Loader = () => {
  return(
    <ContentLoader height={140} speed={1} primaryColor={'#333'} secondaryColor={'#999'}>
      <Circle x={195} y={30} radius={30} />
      <Rect x={50} y={80} height={10} radius={5} width={300} />
      <Rect x={75} y={100} height={10} radius={5} width={250} />
    </ContentLoader>
  )
}
export default Loader;
