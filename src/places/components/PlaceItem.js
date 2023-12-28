import React, { useState ,useContext} from "react";
import "./PlaceItem.css";
import Card from "../../shared/componets/ui elements/Card";
import Modal from 'react-bootstrap/Modal';
//import Modal from "../../shared/componets/ui elements/Modal";
import Button from "../../shared/componets/ui elements/Button";
//import Map from "../../shared/componets/ui elements/Map";
import { AuthContext } from "../../shared/componets/hooks/context/auth-context";
import MapComponent from "../../shared/componets/ui elements/Map";


const PlaceItem = (props) => {

  const auth= useContext(AuthContext)
  const [showMap, setShowMap] = useState(false);
  const [showConfirmation,setshowConfirmation]=useState(false);

  const openMapHandler = () => setShowMap(true);
  const openConfirmation = () => setshowConfirmation(true);

  const closeMapHandler = () => setShowMap(false);
  const closeConfirmation = () => setshowConfirmation(false);

  const apiKey = 'Yi4mEcQdVrHUljXoeTXlQa4Z8EDNpKZQMhCEq-BikHo';


  return (
    <React.Fragment>
      <Modal
      show={showMap} onHide={closeMapHandler} animation={false}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.address}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
      <MapComponent apiKey={apiKey} zoom={15} center={props.coordinates}/>
        
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeMapHandler}>Close</Button>
      </Modal.Footer>
    </Modal>


    <Modal
      show={showConfirmation} onHide={closeConfirmation} animation={false}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{fontWeight:"bold", backgroundColor:"blue", color:"white"}}>
        ARE YOU SURE?
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to proceed and delete this place?</p>
        
      
      </Modal.Body>
      <Modal.Footer>
        <Button inverse onClick={closeConfirmation}>CANCEL</Button>
        <Button danger onClick={closeConfirmation}>DELETE</Button>
      </Modal.Footer>
    </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {auth.isLoggedIn && <Button onClick={openConfirmation}>DELETE</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};
export default PlaceItem;
