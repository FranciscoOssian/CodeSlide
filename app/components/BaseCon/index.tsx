import React from 'react';
import Component from './Component';
import Fallback from './Fallback';

export default function Con() {
  return (
    <Fallback>
      <Component />
    </Fallback>
  );
}
