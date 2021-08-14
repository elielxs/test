import React from "react"
import { purple } from '@material-ui/core/colors';
const { Radio, withStyles } = require("@material-ui/core");
const PurpleRadio = withStyles({
    root: {
        color: purple[400],
        '&$checked': {
            color: purple[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
export default PurpleRadio