'use client';

import React, { Suspense } from 'react';
import { RequestQuotePage } from '../../../views/public/RequestQuotePage';
import { Loader } from '../../../components/common/Loader';

export default function RequestQuote() {
  return (
    <Suspense fallback={<Loader fullScreen message="Loading quotation form..." />}>
      <RequestQuotePage />
    </Suspense>
  );
}
