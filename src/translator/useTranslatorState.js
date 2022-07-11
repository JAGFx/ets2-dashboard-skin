import { changeLocale }       from "@/translator/i18n.util";
import { reactive, readonly } from "vue";

const state = reactive( {
  locale: "en-EN"
} );

const getters = {
  currentLocale: () => state.locale
};
const actions = {
  changeLocale: ( newLocale ) => {
    changeLocale( newLocale );
    state.locale = newLocale;
  }
};

export default () => ({
  state: readonly( state ),
  ...getters,
  ...actions
});