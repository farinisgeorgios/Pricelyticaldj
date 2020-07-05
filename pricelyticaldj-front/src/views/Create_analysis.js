import React, {useState, useEffect} from 'react'
import { Container,Form, Col,Button, Headers, InputGroup,FormControl, Row, Popover, OverlayTrigger, Alert} from 'react-bootstrap'
import {SERVER_ADDRESS} from "../constants/config"
import {FaTimes,FaHotel,FaBroadcastTower} from 'react-icons/fa'
import { IconContext } from "react-icons";
import DatePicker from "react-datepicker";
import RangeSlider from 'react-bootstrap-range-slider';
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import '../App.css'

export default function Create(){
    const [hotel_input, setHotelInput] = useState('')
    const [hotelForm, setHotelForm] = useState(true)
    const [hotel_list, setHotelList] = useState([])
    const [hotels,setHotels] = useState([])
    const [checkindate,setCheckin] = useState(new Date())
    const [checkoutdate,setCheckout] = useState(new Date())
    const [perimeter, setPerimeter] = useState(3)
    const [redirect, setRedirect] = useState({  redirect: false,
        path: "",
        msg: ""
    });

    const [hotelBasedReq, setHotelBasedReq] = useState({
                                                        analysis_details : {
                                                            name : "",
                                                            rooms: 1,
                                                            adults : 0,
                                                            children : 0,
                                                            checkin_date : dateFormat(checkindate,"yyyy-mm-dd"),
                                                            checkout_date : dateFormat(checkoutdate,"yyyy-mm-dd"),
                                                            hotelBased : true,
                                                            perimeterBased : false
                                                        },
                                                            hotels : {}
                                                        })


    const [perimeterBasedReq, setPerimeterBasedReq] = useState({
                                                            analysis_details : {
                                                                name : "",
                                                                rooms: 1,
                                                                adults : 0,
                                                                children : 0,
                                                                checkin_date : dateFormat(checkindate,"yyyy-mm-dd"),
                                                                checkout_date : dateFormat(checkoutdate,"yyyy-mm-dd"),
                                                                hotelBased : false,
                                                                perimeterBased : true
                                                            },
                                                            startpoint_lat : 37.983810,
                                                            startpoint_lon : 23.727539,
                                                            perimeter : perimeter,
                                                            stars_min : 3.5,
                                                            stars_max : 4.5,
                                                            cust_rating_min : 7.5,
                                                            cust_rating_max : 9.5,
                                                            })

    // TODO Na balw ta states se ena form state
   
    
    useEffect(() => {
        const data = {
            searchstring : hotel_input
        } 
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }    
        }
        
         axios.post(SERVER_ADDRESS + 'api/search/hotel/',data,options)
            .then(response => {
                setHotelList(response.data)
                
            })
            .catch((error) =>{
              console.log("Search Hotel Failed");
            })
        
    },[hotel_input])

    const Searchpopover = (
        <Col md={5} className={" align-items-center "+ (hotel_input !== "" ? ('visible') : ('invisible'))} id="searchpop">
            
                <div className="list-group border">
                    {hotel_list.map((item)=><Button type="button" onClick={()=> setHotels([item,...hotels])} className="list-group-item border-0 list-group-item-action"> 
                                        {item.name+', '+item.locality}</Button>)}
                </div>
            
        </Col>
    )
    
    async function HandleSubmit(event){
        event.preventDefault();
        var dataSub = hotelBasedReq
        dataSub.hotels = {hotels}
        var l_url = "api/analysis/create-analysis-hotelbased/"
        if (!hotelForm){
            dataSub = perimeterBasedReq
            l_url = "api/analysis/create-analysis-perimeterbased/"
        } 
        const options = {
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }    
        }
        
        await axios.post(SERVER_ADDRESS + l_url ,dataSub,options)
            .then(response => {
                console.log("Analysis Created", response.data)
                // TODO redirect to analysis page maybe
                setRedirect({
                    redirect: true,
                    path : "/analysis/report/" + response.data.analysis_details.id,
                    msg : "Account Created"
                })
            })
            .catch((error) =>{
                setRedirect({
                    redirect: false,
                    path : "",
                    msg : "You are not permitted to complete this analysis!"
                })
              console.log("Analysis Creation Failed");
            })
    }
    // const DeleteHotel = (hotel) => {

    // }

    if (redirect.redirect) {
        return (
        <Redirect
            to= {redirect.path}
        />
        );
    }else{
        return(
            <div className="">
            <div className='row justify-content-md-center pt-xl-4 '>
                <h1>Start an Analysis</h1>
            </div>
            <div className='row justify-content-md-center pb-xl-3'>
                <p>Create an analysis to analyze your competition in a given area or specific hotels.</p>
            </div>
            
            <Container className='rounded-top shadow rounded-lg pt-xl-3 pb-xl-3'>
                <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item pt-xl-3">
                        <a className={hotelForm ? ('btn nav-link active ') : ('btn nav-link inactive')} onClick={()=>setHotelForm(true)} >
                            <IconContext.Provider value={{ size:'2em' ,color: "#B5C8D6", className: "global-class-name" }}>
                                <FaHotel/> Hotel Based Analysis
                            </IconContext.Provider>
                        </a>
                    </li>
                    <li className="nav-item pt-xl-3">
                        <a className={!hotelForm ? ('btn nav-link active ') : ('btn nav-link inactive')} onClick={()=>setHotelForm(false)} >
                            <IconContext.Provider value={{ size:'2em' ,color: "#FC7F47", className: "global-class-name" }}>
                                <FaBroadcastTower/> Perimeter Based Analysis   
                            </IconContext.Provider>
                            </a>
                    </li>
                </ul>
                <div className='p-xl-5 '>
                    {hotelForm ?(
                        <Form onSubmit ={HandleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Analysis Name</Form.Label>
                                    <Form.Control
                                        
                                        type="analysisname"
                                        placeholder="Analysis Name"
                                        onChange = {(e)=>{  let name_local=e.target.value
                                                            setHotelBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,name : name_local}}))}}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="align-items-center pt-xl-5">
                                <Col md={3}>
                                    <Form.Label>Check-In Date</Form.Label>
                                    <DatePicker
                                    className='form-control'
                                    selected={checkindate}
                                    
                                    selectsStart
                                    startDate={checkindate}
                                    endDate={checkoutdate}
                                    onChange={date=>{setCheckin(date)
                                                    setCheckout(date)
                                                    setHotelBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,checkin_date : dateFormat(date,"yyyy-mm-dd")}}))}}/>   
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Check-Out Date</Form.Label>
                                <DatePicker
                                    className='form-control'
                                    
                                    selected={checkoutdate}
                                    selectsEnd
                                    startDate={checkindate}
                                    endDate={checkoutdate}
                                    onChange={date => {setCheckout(date);
                                                    setHotelBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,checkout_date : dateFormat(date,"yyyy-mm-dd")}}))}}/>
                                    
                                </Col>
                                <Col md={1}>
                                    <Form.Label htmlFor="inlineFormCustomSelect" >
                                        Rooms
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange = {(e)=>{  let rooms_local=e.target.value
                                                            setHotelBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,rooms : rooms_local}}))}}
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Form.Label htmlFor="inlineFormCustomSelect" >
                                        Adults
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange = {(e)=>{  let adults_local=e.target.value
                                                            setHotelBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,adults : adults_local}}))}}
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Form.Label htmlFor="inlineFormCustomSelect" >
                                        Children
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange = {(e)=>{  let children_local=e.target.value
                                                            setHotelBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,children : children_local}}))}}
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row className="align-items-center pt-xl-4 pb-xl-4">
                            
                                <OverlayTrigger trigger="focus" placement="bottom" overlay={Searchpopover}>
                                    <Col md={6}>
                                        <Form.Label htmlFor="inlineFormInput" >
                                            Hotel Search
                                        </Form.Label>
                                        <Form.Control
                                        autoComplete="off"
                                        onChange = {(e)=>setHotelInput(e.target.value)}
                                        id="inlineFormInput"
                                        placeholder=" Search..."
                                        />
                                    </Col>
                                </OverlayTrigger>
                            </Form.Row>
                            
                        <div className="pt-xl-3">
                            {hotels.map((item)=>
                                <Col md={7} className="pt-xl-3 pb-xl-3">
                                    <Row> 
                                        <Col md={6}>
                                            {item.name+', '+item.locality+', '+item.coutry}
                                        </Col>
                                        <Col >
                                            <Button className='btn-sm rounded' variant='light' onClick={()=>setHotels(hotels.filter((h)=>(h.id !== item.id)))}><FaTimes/></Button>
                                        </Col>
                                    </Row>            
                                </Col>
                            )}
                        </div>
                        <div className="p-xl-5">
                        <Button variant="primary" type="submit" className="float-right"> 
                        {/* </div>type="submit" */}
                                Start Analysis
                        </Button>
                        </div>
                    </Form>
                    
                    )
                    
                    :(
                        <Form onSubmit ={HandleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Analysis Name</Form.Label>
                                    <Form.Control
                                        onChange = {(e)=>{  let name_local=e.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,name : name_local}}))}}
                                        type="analysisname"
                                        placeholder="Analysis Name"
                                        
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="align-items-center pt-xl-5">
                                <Col md={3}>
                                    <Form.Label>Check-In Date</Form.Label>
                                <DatePicker
                                    className='form-control'
                                    selected={checkindate}
                                    selectsStart
                                    startDate={checkindate}
                                    endDate={checkoutdate}
                                    onChange={date=>{setCheckin(date)
                                                    setCheckout(date)
                                                    setPerimeterBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,checkin_date : dateFormat(date,"yyyy-mm-dd")}}))}}/>   
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Check-Out Date</Form.Label>
                                <DatePicker
                                    className='form-control'
                                    selected={checkoutdate}
                                    selectsEnd
                                    startDate={checkindate}
                                    endDate={checkoutdate}
                                    onChange={date => {setCheckout(date);
                                        setPerimeterBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,checkout_date : dateFormat(date,"yyyy-mm-dd")}}))}}/>
                                    
                                </Col>
                                <Col md={1}>
                                    <Form.Label htmlFor="inlineFormCustomSelect" >
                                        Rooms
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange = {(e)=>{  let rooms_local=e.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,rooms : rooms_local}}))}}
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Form.Label htmlFor="inlineFormCustomSelect" >
                                        Adults
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange = {(e)=>{  let adults_local=e.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,adults : adults_local}}))}}
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Form.Label htmlFor="inlineFormCustomSelect" >
                                        Children
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange = {(e)=>{  let children_local=e.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState,analysis_details : {...prevState.analysis_details,children : children_local}}))}}
                                        id="inlineFormCustomSelect"
                                        custom
                                    >
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row className="align-items-center pt-xl-4">
                                <Col md={3} >
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control
                                        onChange = {(e)=>{  let lat_local=e.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState, startpoint_lat: lat_local}))}}
                                        type="latitude"
                                        placeholder="Insert Latitude (37.983810)"
                                        
                                    />
                                </Col>
                                <Col md={3} >
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control
                                        onChange = {(e)=>{  let lon_local=e.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState,startpoint_lon :  lon_local}))}}
                                        type="longitude"
                                        placeholder="Insert Longitude (23.727539)"
                                        
                                    />
                                </Col> 
                            </Form.Row>
                            <Form.Row className="pt-xl-4 pb-xl-4">
                                <Col md={2}>
                                    <Form.Label>Min. Star Rating</Form.Label>
                                        <Form.Control
                                            onChange = {(e)=>{  let minStar_local=e.target.value
                                                                setPerimeterBasedReq(prevState => ({...prevState,stars_min :  minStar_local}))}}
                                            type="minStar"
                                            placeholder="Star Rating (3.5)"
                                            
                                        />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Max. Star Rating</Form.Label>
                                        <Form.Control
                                            onChange = {(e)=>{  let maxStar_local=e.target.value
                                                                setPerimeterBasedReq(prevState => ({...prevState,stars_max :  maxStar_local}))}}
                                            type="maxStar"
                                            placeholder="Star Rating (4.5)"
                                            
                                        />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Min. Customer Rating</Form.Label>
                                        <Form.Control
                                            onChange = {(e)=>{  let minCust_local=e.target.value
                                                                setPerimeterBasedReq(prevState => ({...prevState,cust_rating_min :  minCust_local}))}}
                                            type="minCust"
                                            placeholder="Star Rating (7.5)"
                                            
                                        />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Max. Customer Rating</Form.Label>
                                        <Form.Control
                                            onChange = {(e)=>{  let maxCust_local=e.target.value
                                                                setPerimeterBasedReq(prevState => ({...prevState,cust_rating_max :  maxCust_local}))}}
                                            type="maxCust"
                                            placeholder="Star Rating (9.5)"
                                            
                                        />
                                </Col>
                            </Form.Row>
                            <Form.Row className="pt-xl-5 pb-xl-5">
                                <Col>
                                    <Row >                  
                                        <Col > 
                                            <Row className="justify-content-md-center">
                                                <Form.Label ><strong>Scan Perimeter</strong></Form.Label>
                                            </Row>
                                        </Col>
                                    </Row>  
                                    <Row className="justify-content-md-center">  
                                        <Col xs="8">
                                            <RangeSlider 
                                            tooltip="off"
                                            variant='secondary'
                                            min="1" 
                                            max="20" 
                                            value={perimeter} 
                                            onChange={per => {setPerimeter(Number(per.target.value))
                                                            let per_local= per.target.value
                                                            setPerimeterBasedReq(prevState => ({...prevState,perimeter : per_local }))}}
                                            />
                                        </Col>
                                    </Row> 
                                    <Row className="justify-content-md-center">
                                        <Col md={1}>
                                            <Form.Control value={perimeter + 'km'}/>
                                        </Col>
                                    
                                    </Row>   
                                </Col>
                            </Form.Row>
                            
                        <div className="p-xl-3">
                        <Button variant="primary" type='submit' className="float-right">
                                Start Analysis
                        </Button>
                        </div>
                    </Form>
                    )
                    }
                </div>
            </Container>
            <div className='row justify-content-md-center pt-xl-4'>
                {redirect.msg && redirect.redirect===false && <Alert variant='danger' >{redirect.msg}</Alert>}
            </div>
            </div>
        )
    }
}