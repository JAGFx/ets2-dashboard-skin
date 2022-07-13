import { changeLocale }                 from "@/translator/i18n.util";
import { computed, reactive, readonly } from "vue";

const state = reactive( {
  locale: "en-EN"
} );

const getters = {
  currentLocale: computed(() => state.locale)
};
const actions = {
  changeLocale: ( newLocale ) => {
    changeLocale( newLocale );
    state.locale = newLocale;
  }
};

export const useTranslator = () => ({
  state: readonly( state ),
  ...getters,
  ...actions
});