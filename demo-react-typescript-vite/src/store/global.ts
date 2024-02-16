/* Packages */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerDataState } from "@swift/store/type";
import { RootState } from ".";

interface globalState {
  customer: CustomerDataState | null;
  pricing: {
    trial_days: number | null;
    has_expert_ticket:boolean
  };
}

const initialState: globalState = {
  customer: null,
  pricing: {
    trial_days: null,
    has_expert_ticket:false
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateCustomer: (
      state,
      action: PayloadAction<Partial<CustomerDataState>>
    ) => {
      const update = { ...state.customer, ...action.payload };
      // console.log('updateCustomer>>>>', update)
      Object.assign(state, { customer: update });
    },

    updatePricingAction: (
      state,
      action: PayloadAction<{
        trial_days: number;
        has_expert_ticket:boolean
      }>
    ) => {
      Object.assign(state.pricing, action.payload);
    },
    updatePlanAndIntervalAction: (
      state,
      action: PayloadAction<Partial<CustomerDataState>>
    ) => {
      const { app_plan, app_plan_interval } = action.payload;
      const isUpdatePlan =
        state.customer?.app_plan && state.customer?.app_plan === app_plan;
      const isUpdateInterval =
        state.customer?.app_plan &&
        state.customer?.app_plan_interval === app_plan_interval;
        
      if (!isUpdatePlan || !isUpdateInterval) {
        const update = { ...state.customer, ...action.payload };
        Object.assign(state, { customer: update });
      }
    },
  },
});

/* Actions */
export const globalActions = globalSlice.actions;

/* Selectors */
export const customerData = (state: RootState) => state.global.customer;
export const getDomain = (state: RootState) => state.global.customer?.domain;
export const getPricingStore = (state: RootState) => state.global.pricing;

/* Reducers */
const globalReducer = globalSlice.reducer;
export default globalReducer;
