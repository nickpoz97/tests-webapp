import React from "react";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";

const displayInfo = async (mutation, input, sx) => {
    return await mutation(input)
        .then(
            r => {
                const severityLevel = r.success === true ? "success" : "warning"
                return <Box sx={sx}><Alert severity={severityLevel}>{r.message}</Alert></Box>
            }
        )
        .catch (error => <Box><Alert severity="error">{error.message}</Alert></Box>)
}

export default displayInfo;
