import * as appConstants from "@/app/app.constants";
import { reactive }      from "vue";

export function useAppState(){
  return reactive(appConstants)
}