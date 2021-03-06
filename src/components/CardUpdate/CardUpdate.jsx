import {
    Box,
    TextField,
    Button,
    FormLabel,
    Dialog,
    Grid,
    Typography,
    IconButton,
  } from "@mui/material";
  
  
  import { ToggleButtonGroup, ToggleButton } from "@mui/material";
  import { api } from "../../services/api";
  import { useState } from "react";

function CardUpdate({ open, setOpen, updateUser, tech }) {
    const handleClose = () => {
        setOpen(false);
      };
    
      const handleChange = (event, newStatus) => {
        if (newStatus !== null) {
          setStatus(newStatus);
        }
      };
    
      const [status, setStatus] = useState(tech.status);
    
      const handleUpdate = (id) => {
        const data = { status: status };
        const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
        api
          .put(`/users/techs/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            updateUser();
            handleClose();
          })
          .catch((err) => console.log(err));
      };
    
      /* Exclui tecnologia */
      const deleteTech = (id) => {
        const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
        api
          .delete(`/users/techs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            updateUser();
            handleClose();
          })
          .catch((err) => console.log(err));
      };

    return (
        <Dialog open={open} onClose={handleClose}>
        <Box
          component="div"
          sx={{
            minWidth: "394px",
            padding: 2,
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography component="h4" variant="h4">
                Atualizar Tecnologia
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <Typography color={"gray"}> X </Typography>
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            disabled
            label={"Nome da Tech"}
            value={tech.title}
          />
  
          <FormLabel component="legend">Selecionar status:</FormLabel>
          <ToggleButtonGroup
            exclusive
            color="primary"
            fullWidth
            onChange={handleChange}
            value={status}
          >
            {/*  <Tooltip title="Primeiro m??dulo (Introdu????o ao Frontend)"> */}
            <ToggleButton value="Iniciante">Iniciante</ToggleButton>
            {/* </Tooltip> */}
  
            <ToggleButton value="Intermedi??rio">Intermedi??rio</ToggleButton>
            <ToggleButton value="Avan??ado">Avan??ado</ToggleButton>
          </ToggleButtonGroup>
          <Grid container xs={12} spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button
                onClick={() => handleUpdate(tech.tech_id)}
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: "#11995E",
                  width: "100%",
                }}
              >
                Salvar Altera????es
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => deleteTech(tech.tech_id)}
                variant="contained"
                sx={{
                  width: "100%",
                }}
              >
                Excluir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    )
}

export default CardUpdate
