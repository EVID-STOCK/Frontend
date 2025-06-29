import useSetName from '../hooks/useSetName';
import * as S from './styles';

export default function NameForm() {
  const { name, handleOnNameKeyPress, handleClickNameInput, handleChangeName } =
    useSetName();

  return (
    <S.NameFormWrapper $nameState={name.state} onSubmit={handleOnNameKeyPress}>
      <div>
        <S.NameInput
          $nameState={name.state}
          type="text"
          placeholder="이름을 입력해주세요"
          readOnly={name.state}
          maxLength={5}
          onClick={handleClickNameInput}
          onChange={handleChangeName}
        />
        <img src="icons/edit-icon.svg" />
      </div>
      <button type="submit" hidden />
    </S.NameFormWrapper>
  );
}
