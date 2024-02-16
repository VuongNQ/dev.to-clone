import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@swift/store";
import { IAssessmentStatus, IFilterAuditProduct } from "@swift/types/boostSEO";

interface IDataAuditProdSEORedux {
  filterAudit: IFilterAuditProduct;
}

export const INIT_DATA_REDUX_AUDIT_PROD: IDataAuditProdSEORedux = {
  filterAudit: {
    assessment_status: [IAssessmentStatus.all],
    keyword: "",
  },
};

export const auditProdSEORedux = createSlice({
  name: "auditProdSEO",
  initialState: INIT_DATA_REDUX_AUDIT_PROD,
  reducers: {
    //update filter search audit product
    updateFilter: (state, action: PayloadAction<IFilterAuditProduct>) => {
      Object.assign(state.filterAudit, action.payload);
    },
  },
});

/* Actions */
export const { updateFilter } = auditProdSEORedux.actions;

/* Selectors */
export const getFilterAudit = (state: RootState) =>
  state.auditProdSEO.filterAudit;

/* Reducers */
const auditProdSEOReduxReducer = auditProdSEORedux.reducer;
export default auditProdSEOReduxReducer;
