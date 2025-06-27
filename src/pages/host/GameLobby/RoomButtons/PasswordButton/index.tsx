import ActionButton from '@components/ActionButton';
import useModalState from '@hooks/useModalState';

export default function PasswordButton() {
  const { openModal } = useModalState();

  return (
    <ActionButton
      value="PASSWORD"
      padding={2}
      borderRadius={25}
      fontSize={3.2}
      onClick={() => openModal('hostGameModal', 'password')}
    />
  );
}
