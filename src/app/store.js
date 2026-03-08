import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeesSlice";

/**
 * @description Store Redux principal de l'application HRnet.
 * Contient l'état global des employés.
 * Accessible depuis n'importe quel composant via useSelector/useDispatch.
 */
export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
