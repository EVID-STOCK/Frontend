import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

export const networkErrorAlert = (
  content = '네트워크 에러<br/>다시 시도해주세요'
) => {
  Swal.fire({
    position: 'top-end',
    title: `${content}`,
    imageUrl: '/images/error-image.png',
    imageWidth: 100,
    imageHeight: 100,
    showConfirmButton: false,
    timer: 1500,
    padding: '2rem 0rem 2rem',
  });
};

export const defaultAlert = (title: string, text?: string) => {
  Swal.fire({
    title: `${title}`,
    ...(text && { text }),
    confirmButtonColor: '#A7C2E4',
    color: '#809dc1',
    background: 'rgba(228, 245, 255, 0.9)',
    width: 400,
    padding: '2rem 0rem 2rem',
  });
};

interface AlertProps {
  position?: SweetAlertPosition;
  title?: string;
  text?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  showConfirmButton?: boolean;
  timer?: number;
  width?: number;
  padding?: string;
  showClass?: string;
  hideClass?: string;
}

export const imageAlert = ({
  position = 'center',
  title = `게임이 종료되었습니다.`,
  text = '게임 결과창으로 이동합니다.',
  imageUrl = '/images/error-image.png',
  imageWidth = 200,
  imageHeight = 200,
  showConfirmButton = false,
  timer = 2300,
  width = 600,
  padding = '4em 0rem 4em',
  showClass = 'animate__animated animate__fadeInDown',
  hideClass = 'animate__animated animate__fadeOutUp',
}: Partial<AlertProps> = {}) => {
  Swal.fire({
    position,
    title,
    text,
    imageUrl,
    imageWidth,
    imageHeight,
    showConfirmButton,
    timer,
    width,
    padding,
    showClass: {
      popup: showClass,
    },
    hideClass: {
      popup: hideClass,
    },
  });
};

export const NoticeAlert = ({
  title,
  text,
  icon,
  position = 'top',
}: {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  position?: SweetAlertPosition;
}) => {
  Swal.fire({
    position,
    title: `${title}`,
    ...(text && { text }),
    ...(icon && { icon }),
    color: '#809dc1',
    background: 'rgba(228, 245, 255, 0.9)',
    width: 400,
    padding: '2rem 0',
    showConfirmButton: false,
    timer: 1500,
  });
};
