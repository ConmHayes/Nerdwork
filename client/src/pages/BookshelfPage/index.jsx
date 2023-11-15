import React from 'react';
import { Bookshelf } from '../../components';

const BookshelfPage = ({ books }) => {
  return (
    <Bookshelf items={books} />
  );
};

export default BookshelfPage;
