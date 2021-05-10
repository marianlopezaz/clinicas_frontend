import React from 'react';
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

export default function ModalAdd(props) {
    const [open, setOpen] = React.useState(false);
    const emptyHealthInsurance = {
        name: '',
        status: '',
    }
    const [healthInsurance, setHealthInsurance] = React.useState({
        name: '',
        status: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setHealthInsurance({...emptyHealthInsurance})
    };

    const handleChange = (prop) => (event) => {
        setHealthInsurance({ ...healthInsurance, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmitModalAdd(healthInsurance)
        handleClose();
    }

  return (
    <div>
      <Dialog maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className='center'>Nueva Obra Social</DialogTitle>
        <form id="add_health_insurance_form" action="" onSubmit={handleSubmit} method="post">
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={healthInsurance.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    id="standard-select-currency-native"
                    select
                    fullWidth
                    margin="dense"
                    label="Seleccionar Estado"
                    value={healthInsurance.status}
                    onChange={handleChange('status')}
                    >
                        <MenuItem key='activo' value='activo'>
                            Activo
                        </MenuItem>
                        <MenuItem key='inactivo' value='inactivo'>
                            No Activo
                        </MenuItem>
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
                              width:130, 
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
                <span>Nueva Obra Social</span>
            </Action>
        </Fab>
    </div>
  );
}