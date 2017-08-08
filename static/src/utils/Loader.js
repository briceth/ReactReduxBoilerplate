import React, { Component } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader';

const Loader = () => {
  return(
    <ContentLoader height={120} speed={2} primaryColor={'#333'} secondaryColor={'#999'}>
      <Circle x={195} y={30} radius={10} />
      <Rect x={145} y={80} height={8} radius={4} width={100} />
      <Rect x={160} y={100} height={8} radius={4} width={75} />
    </ContentLoader>
  )
}
export default Loader;
