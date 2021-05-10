import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';
import { DatePicker } from "@material-ui/pickers";

const emptyUser = {
  name: "",
  surname: "",
  dni: "",
  cellphone: "",
  birth: new Date(),
  role: "",
  email: "",
  user_name: "",
  password: "",
  showPassword: false,
};

export default function ModalAdd(props) {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState(emptyUser);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUser(emptyUser)
    };

    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const handleDateChange = (date) => {
        setUser({ ...user, birth : date });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmitModalAdd(user)
        handleClose();
    }

  return (
    <div>
      <Dialog maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className='center'>Nuevo Usuario</DialogTitle>
        <form id="add_user_form" action="" onSubmit={handleSubmit} method="post">
            <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={user.name}
                        onChange={handleChange('name')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="surname"
                        name="surname"
                        label="Apellido"
                        type="text"
                        fullWidth
                        value={user.surname}
                        onChange={handleChange('surname')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dni"
                        name="dni"
                        label="DNI"
                        type="numeric"
                        fullWidth
                        value={user.dni}
                        onChange={handleChange('dni')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cellphone"
                        label="Celular"
                        type="numeric"
                        name="cellphone"
                        fullWidth
                        value={user.cellphone}
                        onChange={handleChange('cellphone')}
                    />
                    <DatePicker 
                        className='date_picker' 
                        color='#ffffff'
                        variant="inline"
                        onChange={(date) => handleDateChange(date)}
                        format="dd/MM/yyyy"
                        label='Fecha de Nacimiento'
                        value={user.birth}
                    />
                    <TextField
                        id="standard-select-currency-native"
                        select
                        fullWidth
                        margin="dense"
                        label="Seleccionar Rol"
                        value={user.role}
                        onChange={handleChange('role')}
                        >
                            <MenuItem key='admin' value='admin'>
                                Administrador
                            </MenuItem>
                            <MenuItem key='secretary' value='secretary'>
                                Secretaria/o
                            </MenuItem>
                            <MenuItem key='specialist' value='specialist'>
                                Especialista
                            </MenuItem>
                    </TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={user.email}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        name="user_name"
                        label="Nombre de Usuario"
                        type="text"
                        fullWidth
                        value={user.user_name}
                        onChange={handleChange('user_name')}
                    />
                    <InputLabel htmlFor="password_modal_users">Contraseña</InputLabel>
                    <Input
                        id="password_modal_users"
                        type={user.showPassword ? 'text' : 'password'}
                        value={user.password}
                        onChange={handleChange('password')}
                        name='password'
                        fullWidth
                        margin='dense'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {user.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
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
                <span>Nuevo Usuario</span>
            </Action>
        </Fab>
    </div>
  );
}