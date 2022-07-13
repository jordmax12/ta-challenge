import React, { useEffect, useState } from 'react';
import { 
    Box,
    Button
 } from '@mui/material'
import { getPunkData, getRandomPunkData } from '../helpers/api';

const DEFAULT_BEER_IMG = 'https://media.beerdrop.com/catalog/product/placeholder/default/default-3_1.jpg';

function renderDashboard(isLoading, beers, updateRandom, random) {
    const toggleFetchRandom = () => {
        updateRandom(!random);
    }

    return <div style={{ height: '100%', position: 'relative'}}>
        <h1 style={{ color: '#6495ED' }}> Beers! </h1>
        <h3 style={{ color: 'darkgray' }}> By: Jordan Max </h3>
        <div style={{ marginTop: '10px', height: 'auto', width: '100%', position: 'relative' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <Button disabled={isLoading} variant="contained" fullWidth onClick={() => updateRandom(true)}> {isLoading ? 'Loading': 'Fetch Random Beer!'} </Button>
                    {
                        random
                        ? <Button style={{ marginTop: '10px' }} disabled={isLoading} variant="contained" fullWidth onClick={() => toggleFetchRandom()}> See All Beers </Button>
                        : <></>
                    }
                </div>
            </Box>
        </div>
        <div style={{ marginTop: '50px', height: '100%', position: 'relative' }}>
        {
            beers.map(({ name, brewers_tips: brewersTips, contributed_by: contributedBy, first_brewed: firstBrewed, description, image_url: imageUrl }) => {
                return <div style={{ height: '100%', position: 'relative', color: '#2F4F4F' }}>
                    <img src={imageUrl || DEFAULT_BEER_IMG} alt='Beer' style={{ width: 'auto', height: '250px' }} />
                    <p>Name: {name}</p>
                    <p>Brewers Tips: {brewersTips}</p>
                    <p>Description: {description}</p>
                    <p>Contributed By: {contributedBy}</p>
                    <p>First Brewed: {firstBrewed}</p>
                </div>
            })
        }
        </div>

    </div>
}

function Dashboard(props) {
    const [isLoading, setLoading] = useState(true);
    const [beers, setBeers] = useState([]);
    const [random, setRandom] = useState(false);

    const updateRandom = (random) => {
        setRandom(random);
        setLoading(true);
        if(random) {
            getRandomPunkData()
            .then((result) => {
                setLoading(false);
                setBeers(result);
            })
        } else {
            getPunkData()
            .then((result) => {
                setLoading(false);
                setBeers(result);
            })
        }

    }

    useEffect(() => {
        setLoading(true);
        if(!random) {
            getPunkData()
            .then((result) => {
                setLoading(false);
                setBeers(result);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div style={{ padding: '10px', width: '75%', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '100px', paddingTop: '25px' }}>
        {renderDashboard(isLoading, beers, updateRandom, random)}
    </div>
}

export default Dashboard;