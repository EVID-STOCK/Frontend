import React from 'react';

import * as S from './ListLayoutStyle';

interface ListLayoutProps {
  title: string;
  src?: string;
  children?: React.ReactNode;
}

function ListLayout({ title, src, children }: ListLayoutProps) {
  return (
    <S.ListLayout>
      <S.Title>
        <img src={src} />
        <h2>{title}</h2>
      </S.Title>
      <S.List $title={title}>{children}</S.List>
    </S.ListLayout>
  );
}

export default ListLayout;
