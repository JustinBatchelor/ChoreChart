import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography, Card, CardContent, ButtonGroup} from "@material-ui/core/";
import { Link } from 'react-router-dom';



export default class Chore extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            last_completed: props.last_completed
        };  
        this.updateChoreTime = this.updateChoreTime.bind(this);
        this.deleteChore = this.deleteChore.bind(this);
    }


    updateChoreTime(){
        const requestOptions = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
        };
        const api_url = "/api/put/" + this.state.id;

        fetch(api_url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({last_completed: data.last_completed});
                this.forceUpdate();
                this.refreshPage();
            });
    }

    refreshPage(){
        window.location.reload();
    }

    deleteChore(){
        const requestOptions = {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        };
        const api_url = "/api/delete/" + this.state.id;
        fetch(api_url, requestOptions)
            .then(response => console.log(response));
        this.refreshPage();
    }

    
    formatTime(date_time){
        let new_date_time = date_time.toString();
        new_date_time = new_date_time.split(/[- : T]/);
        let formatDate = new_date_time[1] + "/" + new_date_time[2] + "/" + new_date_time[0] + " at ";
        let formatTime = "";
        if (parseInt(new_date_time[3], 10) > 12) {
            let new_hour = parseInt(new_date_time[3], 10) - 12;
            formatTime = new_hour.toString() + ":" + new_date_time[4] + " p.m";
        } 
        else if (parseInt(new_date_time[3], 10) === 12) {
            formatTime = new_date_time[3] + ":" + new_date_time[4] + " p.m";
        }
        else { 
            formatTime = new_date_time[3] + ":" + new_date_time[4] + " a.m";
        }

        return formatDate + formatTime;
    }



    render() {
        const dateTime = this.formatTime(this.state.last_completed);
        return(
            <Grid item xs={12} align="center" style={{maxWidth: 500}}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography component='h6' variant='h6' align="center">{this.state.title}</Typography>
                        <Typography component='div' variant='subtitle1' align="center">{dateTime}</Typography>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button style={{color: "#19e68a"}} onClick={this.updateChoreTime}>Mark as Clean</Button>
                            <Button color='secondary' onClick={this.deleteChore}>Delete Chore</Button>
                        </ButtonGroup>
                       
                    </CardContent>
                        
                </Card>
            </Grid>
        );
    }
}