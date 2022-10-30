import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalProto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    const {horarios, restauranteNombre} = this.props;

    return (
      <div>
        <Button className="buttonOrange"  style={{
          width: "305px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor:"#FCC342",
          border: "none",
          color:"white",
          fontSize:"20px",
          marginTop:"15px"
          
        }} color="danger" onClick={this.toggle}>{this.props.buttonLabel} Ver Horarios</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{restauranteNombre}</ModalHeader>
          <ModalBody>
              {
              horarios != "" ?  horarios.map((item)=>(
                    <p>{item.dia}:      {item.horarios}</p>
                ))

                :
                (
                  <div>Cargando</div>
                )
              }  
          </ModalBody>
          <ModalFooter>
         
            <Button color="danger" onClick={this.toggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalProto;
