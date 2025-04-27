import React, { Suspense, lazy } from 'react';
import { Skeleton } from 'antd';

const Suspenselazy = (props: any) => {
  return (
    <Suspense fallback={(
      <>
        <Skeleton active />
      </>
    )}>
      {React.createElement(lazy(props))}
    </Suspense>
  );
};

export default Suspenselazy;
