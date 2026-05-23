import firebaseRulesPlugin, { flatRecommended } from '@firebase/eslint-plugin-security-rules';
import next from "eslint-config-next";

export default [
    {
        ignores: ['dist/**/*', '.next/**/*']
    },
    // We omit the broken next spread and just use the plugin for rules
    flatRecommended,
];
