import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IDataPagination } from "@swift/types/general";
import { DataTicketType, ListTicket } from "@swift/types/oneExperts";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useOneExpertService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function getRecordTickets(): Promise<
    SwiftApiResponse<ListTicket[] | null>
  > {
    try {
      const result = await initFetchAction({
        url: "experts/speed/group-count-tickets-by-status",
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function getListTicket(
    page: number,
    limit: number
  ): Promise<SwiftApiResponse<IDataPagination<DataTicketType[]> | null>> {
    try {
      const result = await initFetchAction({
        url: "experts/speed/tickets",
        method: "GET",
        app,
        params: {
          page: page,
          limit: limit,
        },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function chargeTicket(
    redirect_url: string,
    totalPrice: number,
    numberTicket: number,
    extraPrice?: number
  ): Promise<SwiftApiResponse<ChargeTicketType>> {
    try {
      const result = await initFetchAction({
        url: "experts/speed/charge",
        method: "POST",
        body: {
          redirect_url: redirect_url,
          name: "Fireapps expert",
          price: totalPrice,
          number_of_tickets: numberTicket,
          id: 1,
          from_embedded: true,
          extra_price: extraPrice ? extraPrice : 0,
        },
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, message: "", data: { redirect_url: "" } };
    }
  }
  return { getRecordTickets, getListTicket, chargeTicket };
};

interface ChargeTicketType {
  redirect_url: string;
}

export { useOneExpertService };
