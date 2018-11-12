type WidthType = number;
export type EventResize = { target: Window | null };

const matchMaxMediaWidth = (
  e: Event | EventResize,
  maxMediaWidth: WidthType
) => {
  const event = <EventResize>e;

  if (event.target && event.target.innerWidth < maxMediaWidth) {
    return true;
  }

  return false;
};

export default (maxMediaWidth: WidthType) => (e: Event | EventResize) =>
  matchMaxMediaWidth(e, maxMediaWidth);
