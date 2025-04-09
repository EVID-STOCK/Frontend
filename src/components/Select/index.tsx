import { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import OptionList from './OptionList';

type Option = string | number;

interface SelectProps {
  title?: string;
  value: string;
  handleOption?: (selected: string) => void;
  options: Option[];
  convert?: (value: Option) => string;
}

export default function Select({
  title,
  value,
  handleOption,
  options,
  convert,
}: SelectProps) {
  const selectRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string>(value ? value : '');

  const handleClickSelect = () => {
    setVisible((pre) => !pre);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        !selectRef.current ||
        !selectRef.current.contains(e.target as Document)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectRef]);

  return (
    <S.SelectLayout>
      {title ? <S.Title>{title}</S.Title> : null}

      <S.SelectWrapper>
        <S.SelectBtn
          ref={selectRef}
          onClick={handleClickSelect}
          $visible={visible}
        >
          <div>
            <p>{selected}</p>
            <img src="/icons/select_icon.svg" />
          </div>
        </S.SelectBtn>
        <OptionList
          visible={visible}
          setVisible={setVisible}
          setSelected={setSelected}
          handleOption={handleOption}
          options={options}
          {...(convert ? { convert } : {})}
        />
      </S.SelectWrapper>
    </S.SelectLayout>
  );
}
