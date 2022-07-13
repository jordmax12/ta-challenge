/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {
    Grid,
    TextField,
    Paper,
    Button
} from '@mui/material'

function VerifyOtp ({ continueVerifyFlow, disabled, setOtp, isLoading }) {
    return ( 
        <div style={{ padding: '10px', width: '100%', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '300px', paddingTop: '25px' }}>
            <Paper elevation={3}>
                <Grid
                container
                spacing={3}
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                style={{ padding: '10px'}}
                >
                    <Grid item xs={12}>
                        <h3> Please enter your OTP you received: </h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="password" onChange={(e) => setOtp(e.currentTarget.value)}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={disabled} variant="contained" fullWidth onClick={() => continueVerifyFlow() }> {isLoading ? 'Loading': 'Continue'}  </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default VerifyOtp;