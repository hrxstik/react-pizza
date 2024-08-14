import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="134" cy="134" r="125" />
    <rect x="1" y="291" rx="10" ry="10" width="280" height="22" />
    <rect x="1" y="336" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="454" rx="10" ry="10" width="90" height="30" />
    <rect x="126" y="444" rx="22" ry="22" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
