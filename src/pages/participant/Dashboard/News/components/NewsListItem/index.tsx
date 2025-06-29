import * as S from './styles';

export default function NewsListItem({
  companyName,
  description,
}: {
  companyName: string;
  description: string;
}) {
  return (
    <S.NewsListItem key={companyName}>
      <p>{description}</p>
      <p>{companyName}</p>
    </S.NewsListItem>
  );
}
