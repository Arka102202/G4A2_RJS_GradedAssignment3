export const extraInfo = (
  show: boolean,
  message: string,
  event: React.MouseEvent | null,
  y: number,
  x: number
) => {
  return {
    show,
    message,
    style: event
      ? {
          top: event.clientY + window.scrollY + y + "px",
          left: event.clientX + x + "px",
        }
      : {},
  };
};

export const clearExtraInfo = extraInfo(false, "", null, 0, 0);
