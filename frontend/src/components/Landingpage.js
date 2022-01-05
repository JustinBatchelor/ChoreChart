import React, {Component} from "react";
import {  Button, Grid, Typography, Container} from "@material-ui/core/";
import { Link } from "react-router-dom";
import Chore from './Chore';


export default class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            choreData: []   
        };
        this.renderTableRows = this.renderTableRows.bind(this);

    }

    async componentDidMount(){
        try {
            fetch('/api/get?format=json')
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        id: 0,
                        choreData: result});
                })
                .catch(e => {
                    console.log(e)
                });
        } catch (error) {
            console.log(error);
        }
    }


    renderTableRows() {
        let result = [];
        let count = 0;
        this.state.choreData.forEach((chore) => {
            result.push(
                <Chore id={chore['id']} title={chore['title']} last_completed={chore['last_completed']} key={count}></Chore>
            );
            count++;
        });
        return result;
    }
    

    render() {
        return ( 
            <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center" alignContent="center">
                <Grid item xs={12} align="center" style={{backgroundColor: "#99badd"}}>
                    <Container maxWidth='sm'>
                        <Typography variant='h5' align="center" style={{color: "#fff"}}>Chore Chart</Typography>
                    </Container>
                </Grid>
                {this.renderTableRows()}
                <Grid item xs={12} align="center">
                    <Button color='primary' variant="contained" to='/create' component={Link}>Create a Chore</Button>
                </Grid>

                {/* <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center" >
                    
                    
                </Grid> */}
            </Grid>
        );  
    }
}