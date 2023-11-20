import React from 'react';

export default function Rating({ value }) {
  return (
    <div>
      {'★'.repeat(value)}
      {'☆'.repeat(5 - value)}
    </div>
  );
}