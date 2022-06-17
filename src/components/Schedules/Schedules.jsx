import React from 'react'
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Schedules({ data, sport }) {
    let [year, setYear] = React.useState('')
    console.log(sport)
   
 
    React.useState(() => {
        for (let key in data) {
            setYear(key)
            console.log(key, 'key')
        }
    }, [data])

    console.log(year, 'year')

    let competitions = data[year]?.map(game => <Box sx={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', marginTop: '10px', backgroundColor: 'white' }}>
        <Grid container spacing={1} sx={{ margin: 'auto' }}>
            <Grid item md={1} >
                <Button sx={{ width: 100, height: 100 }}></Button>
            </Grid>
            <Grid item md={3} container >
                <Grid item container direction="column" spacing={1}>
                    <Grid item>
                        <Button variant="text" value="dateTime">{game.date}</Button>
                    </Grid>
                    <Grid item >
                        <Button variant="text" value="opponent">{game.at} {game.opponent}</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4}>
                <Grid item container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 100 }} spacing={1}>
                    <Grid item >
                        <Button  sx={{ fontSize: '12px' }} variant="text" value="location">{game.time}</Button>
                    </Grid>
                    <Grid item >
                        <Button  ssx={{ fontSize: '12px' }} variant="text" value="location">{game.location}</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4}>
                <Grid item container sx={{ display: 'flex', alignItems: 'center', height: 100 }} direction="row" spacing={1}>
                    <Grid item>
                        <Button variant="text" value="air">AIR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="text" value="bus">BUS</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="text" value="stay">STAY</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    )



    return (
        <>
            <div style={{ marginTop: '100px' }}>{year} {sport} Schedule</div>
            {competitions}
        </>
    )
}

export default Schedules