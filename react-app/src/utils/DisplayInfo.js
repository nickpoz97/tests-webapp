import React from "react";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";

const displayInfo = async (mutation, input, sx) => {
    return mutation(input)
        .then(
            r => <Box sx={sx}>
                <Alert severity={r.success === true ? "success" : "warning"}>
                    {r.message}
                </Alert>
            </Box>
        )
        .catch (error => <Box sx={sx}><Alert severity="error">{error.message}</Alert></Box>)
}

export default displayInfo;
