import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, FormHelperText, FormControl} from "@material-ui/core/";
import { Link } from 'react-router-dom';



export default class CreateChorePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
        };
        this.getInputTitle = this.getInputTitle.bind(this);
        this.createButtonPressed = this.createButtonPressed.bind(this);
        
    }

    getInputTitle(e){
        this.setState({
            title: e.target.value,
        });
    }

    refreshPage(){
        window.location.reload();
    }

    createButtonPressed(){
        console.log(this.state)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title
                
            }),
        };
        fetch('/api/post', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
        this.forceUpdate();
    }

    render() {
        return(
            <Grid container spacing={3} justifyContent="center" alignItems="center" alignContent="center">
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>Create A Chore</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>Please fill in the information below to create your chore.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField id="title" label="Chore Title" required={true} onChange={this.getInputTitle}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <Button color='primary' variant="contained" onClick={this.createButtonPressed} to='/' component={Link}>Create Chore</Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <Button color='secondary' variant="outlined" to="/" component={Link}>Back</Button>
                    </FormControl>    
                </Grid>
            </Grid> 
        );
    }
}