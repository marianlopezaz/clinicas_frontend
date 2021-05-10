import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';

export default function ModalAdd(props) {
    const [open, setOpen] = React.useState(false);
    const emptyGralSpeciality = {
        name: ''
    }
    const [gralSpeciality, setGralSpeciality] = React.useState({
        name: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGralSpeciality({...emptyGralSpeciality})
    };

    const handleChange = (prop) => (event) => {
        setGralSpeciality({ ...gralSpeciality, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmitModalAdd(gralSpeciality)
        handleClose();
    }

  return (
    <div>
      <Dialog maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className='center'>Nueva Especialidad General</DialogTitle>
        <form id="add_general_speciality_form" action="" onSubmit={handleSubmit} method="post">
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={gralSpeciality.name}
                    onChange={handleChange('name')}
                />
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
                <span>Nueva</span>
            </Action>
        </Fab>
    </div>
  );
}