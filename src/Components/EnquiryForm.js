import React from "react";
import {Button} from '@material-ui/core';
import {Select} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {Input} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {CircularProgress} from '@material-ui/core';
import "./style.css";
import Paper from '@material-ui/core/Paper';


import SimpleTable from "./Table";

const baseURL = 'https://cors-anywhere.herokuapp.com/';

const deleteURL = baseURL + 'https://us-central1-form-manager-7234f.cloudfunctions.net/deleteCustomer';
const undoDeleteURL = baseURL + 'https://us-central1-form-manager-7234f.cloudfunctions.net/undoDeleteCustomer';

class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        customerPhoneNumber: '',
        gender: "Male",
        text: "",
        isLoading: false,
        data: [],
        deletedCustomer:[],
        deletedCustomerID:'',
        deletedCustomerIDIndex:'',
    };


    componentDidMount() {
        let data=JSON.parse(localStorage.getItem('userData'));
        if(data!==null){
            this.setState({
                data:data
            });
        }
    }

    // constructor(props) {
    //     super(props);
    //     // this.handelNameChange = this.handelNameChange.bind(this);
    // }
    //
    //
    // handelNameChange(event) {
    //     this.setState({
    //         customerName: event.target.value
    //
    //     });
    // }
    // handlePhoneNumberChange  = (event) => {
    //     console.log(this.state.customerPhoneNumber);
    //     this.setState({
    //         customerPhoneNumber: event.target.value
    //     })
    // }
    //
    // handleGenderChange = (event) =>{
    //     this.setState({
    //         gender : event.target.value
    //     })
    // }

    constructor(props) {
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        let updatedObject = {};
        let key = event.target.name;
        updatedObject[key] = event.target.value;
        this.setState(updatedObject);

        //console.log(updatedObject);

        // this.setState(
        //     [event.target.name] = event.target.value;
        // )
    }


    handleButtonCLick = async () => {


        this.setState({
            isLoading: true,

        })

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: this.state})
        };
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://us-central1-form-manager-7234f.cloudfunctions.net/saveCustomer', requestOptions);
        const data = await response.json();
        console.log(`printing response : ${data}`);
        console.log(data);
        this.setState({
            isLoading: false,
            customerID: data["customerID"],
        })

        let tempList = {
            "customerName": this.state.customerName,
            "gender": this.state.gender,
            "customerPhoneNumber": this.state.customerPhoneNumber,
            "customerID": this.state.customerID
        };
        let dataCopy = this.state.data;
        if (localStorage.getItem('userData') === null) {
            dataCopy = this.state.data;
        } else {
            dataCopy = JSON.parse(localStorage.getItem('userData'))
        }

        dataCopy.push(tempList);
        localStorage.setItem('userData', JSON.stringify(dataCopy));
        this.setState({
            data: dataCopy
        });

    }

    loadingText() {
        return this.state.isLoading ? this.state.text = "loading" : "";
    }

    deleteUser= async (customerID)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({customerID: customerID})
        };
        const response = await fetch(deleteURL, requestOptions);
        const responseJSON = await response.json();
        this.setState({
            deletedCustomerID:customerID,

        })
        let  dataCopy=this.state.data.slice();
        let newData = dataCopy.filter(function (e) {
            return e['customerID']!== customerID
            if(e['custmerID']===customerID){
                let deletedData = e;
                this.setState({
                    // deletedCustomerIDIndex:i,
                    deletedCustomer:deletedData,
                })
        }
        });

        localStorage.setItem('userData',JSON.stringify(newData));
        console.log(newData);
        this.setState({
            data:newData
        });
    }

    render() {
        return (
            <div>
                <Paper>
                    <form>
                        <p>Name</p>
                        <div className="inp">

                            <Input label="Customer Name" type="text" name="customerName"
                                   value={this.state.customerName} onChange={this.handleInputChange}/>
                        </div>
                        <p>Gender</p>
                        <div className="inp">

                            <Select name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>

                            </Select>
                        </div>
                        <p>Phone Number</p>
                        <div className="inp">

                            <Input label="Phone Number" type="number" name="customerPhoneNumber" color="primary"
                                   value={this.state.customerPhoneNumber}
                                   onChange={this.handleInputChange}/>
                        </div>
                    </form>
                    <div className="inp">
                    <Button variant="contained" color="primary" className="but" onClick={this.handleButtonCLick}>Save Info</Button>
                    </div>
                    {this.state.isLoading &&
                        <div className="inp">
                            <CircularProgress color="secondary"/>
                        </div>
                    }
                </Paper>

                {/*<div className="form">*/}
                {/*    <SimpleTable data={this.state.data}/>*/}
                {/*</div>*/}
                <div className="form">
                    <div>
                        {(this.state.data.length!==0)&&<SimpleTable data={this.state.data} deleteUser={this.deleteUser}/>}
                    </div>
                </div>

            </div>
        );
    }
}

export default EnquiryForm;