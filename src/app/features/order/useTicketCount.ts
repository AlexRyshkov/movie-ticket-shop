import {useMemo} from "react";

function useTicketCount(order: Order) {
  const count = useMemo(() => {
    return order.reduce(
      (count: number, currentItem) => count + currentItem.ticketCount,
      0
    );
  }, [order]);

  return count;
}

export default useTicketCount;
