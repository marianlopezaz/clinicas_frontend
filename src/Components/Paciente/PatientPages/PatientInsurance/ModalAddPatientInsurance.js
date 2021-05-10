import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';
import CrudHealthInsurance from '../../../../Utils/CrudHealthInsurances';
import Alert from 'react-s-alert';

export default function ModalAddPatientInsurance(props) {

  
    useEffect(() => {
        setHI_id(null)
        if(props.client_host)
        {
        CrudHealthInsurance.list(props.auth_token,props.client_host).then((result)=>{
            if (result.success) {
                setHealthInsurance(result.result)
            }else{
                Alert.error(result.result, {
                    position: 'bottom-left',
                    effect: 'genie', 
                });
            }
        }).catch((e)=>{ })
        }

      },[]);

    const [healthInsurances,setHealthInsurance] = React.useState([]); 
    
    const [open, setOpen] = React.useState(false);

    const [HI_id,setHI_id] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setHI_id(null)
    };

    const handleChange =(event) => {
        console.log(event.target.value)
        setHI_id(event.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(HI_id !== null){
            props.handleSubmitModalAddHI(HI_id);
            handleClose();
        }
    }

  return (
    <div>
      <Dialog maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className='center'>Asignar Obra Social</DialogTitle>
        <form id="add_health_insurance_form" action="" onSubmit={handleSubmit} method="post">
            <DialogContent>

                    <TextField
                        id="standard-select-currency-native"
                        select
                        fullWidth
                        margin="dense"
                        label="Seleccionar Obra Social"
                        defaultValue=''
                        onChange={handleChange}
                        required
                        >
                            {
                                healthInsurances.map(element => {
                                    return(
                                        <MenuItem key={element.id} value={element.id || ''}>
                                            {element.name}
                                        </MenuItem>
                                    );
                                })
                            }
                    </TextField>

            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button type='submit' color="primary">
                Guardar
            </Button>
            </DialogActions>
        </form>
      </Dialog>
      <Fab icon={<AddBox />} mainButtonStyles={{
                                         backgroundColor:props.main_color, 
                                         position:'relative',
                                         top:0}} 
                                         onClick={handleClickOpen}>
            <Action style={{
                              width:170, 
                              height:30,
                              borderRadius:0,
                              borderBottomLeftRadius: 30, 
                              borderTopLeftRadius:30,
                              backgroundColor: props.main_color,
                              position:'relative',
                              top:72,
                              right:60       
                            }}
                >
                <span>Agregar Obra Social</span>
            </Action>
        </Fab>
    </div>
  );
}

