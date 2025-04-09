import * as S from './styles';

type Option = string | number;

interface OptionListProps {
  visible: boolean;
  handleOption?: (selected: string) => void;
  setSelected: (selected: string) => void;
  setVisible: (v: boolean) => void;
  options: Option[];
  convert?: (value: Option) => string;
}

export default function OptionList({
  visible,
  handleOption,
  setSelected,
  options,
  convert,
}: OptionListProps) {
  const handleClickOption = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string
  ) => {
    const { innerText } = e.target as HTMLLIElement;
    setSelected(innerText);
    handleOption?.(option);
  };

  return (
    <S.SelectOptions $visible={visible}>
      <S.Options $visible={visible}>
        {options.map((option: string | number) => {
          return (
            <li
              key={option}
              onClick={(e) => handleClickOption(e, String(option))}
            >
              {convert ? convert(option) : option}
            </li>
          );
        })}
      </S.Options>
    </S.SelectOptions>
  );
}
