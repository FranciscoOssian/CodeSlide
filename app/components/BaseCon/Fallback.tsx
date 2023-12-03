import { Skeleton } from '@mui/material';
import React, { ReactNode, Suspense } from 'react';

function ContributionsSkeleton() {
  return (
    <div>
      <Skeleton variant="rectangular" width={300} height={100} />
    </div>
  );
}

interface FallbackProps {
  children: ReactNode;
}

const Fallback: React.FC<FallbackProps> = ({ children }) => {
  return <Suspense fallback={<ContributionsSkeleton />}>{children}</Suspense>;
};

export default Fallback;
