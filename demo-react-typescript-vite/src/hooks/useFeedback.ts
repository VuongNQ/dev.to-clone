
const useFeedback = () => {
  // const initFeedback = (store: CustomerDataState) => {
  //   window.shData.push({
  //     event: "init",
  //     data: {
  //       email: store.email,
  //       name: store.name,
  //       myshopify_domain: store.domain,
  //       plan_name: store.app_plan,
  //       language_code: "en",
  //     },
  //   });
  // };
  const createEleFeedback = (dataOpr: IPayloadEleFeedback) => {
    typeof window.createOprSuggestion == "function"
      ? window.createOprSuggestion(dataOpr)
      : (window.createOprSuggestion = dataOpr as unknown as (
          dataOpr: IPayloadEleFeedback
        ) => void | IPayloadEleFeedback); //handle case plugin script load slow than app
  };

  return {
    // initFeedback,
    createEleFeedback,
  };
};

interface IPayloadEleFeedback {
  el: HTMLDivElement;
  data: {
    domain: string;
  };
}

declare global {
  interface Window {
    createOprSuggestion: (
      dataOpr: IPayloadEleFeedback
    ) => void | IPayloadEleFeedback;
  }
}

export default useFeedback;
