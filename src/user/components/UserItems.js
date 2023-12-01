import React from "react";
import "./UserItems.css";
import { Link } from "react-router-dom";
const UserItems = (props) => {
  return (
    
      <li style={{paddingTop:"20px" }}>
        <div className="card mb-3 " style={{maxWidth:"500px",display:"flex",margin:"auto",maxHeight:'150px' , color:"white" ,border:"none"}} >
          <Link to={`/${props.id}/places`} style={{color:"white" ,textDecoration:"none"} }>
          <div className="row g-0 hoveruser " >
            <div className="col-md-4 ">
              <img src={props.image} className="img-fluid rounded-circle " alt="..."  style={{padding:"20px",maxWidth: "80%"}}/>
            </div>
            <div className="col-md-8 ">
              <div className="card-body" >
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">
                {props.placecount} {props.placecount===1? " place visited":" places visited"} 
                </p>
                
              </div>
            </div>
          </div>
          </Link>
        </div>
      </li>

  );
};
export default UserItems;
