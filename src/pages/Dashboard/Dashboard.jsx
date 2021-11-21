import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import Skill from "../../components/Skill/Skill";
import CardUpdate from "../../components/CardUpdate/CardUpdate";
import CardCreate from "../../components/CardCraeate/CardCreate";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { api } from "../../services/api";

import Logo from "../../assets/logo.svg";

import React from "react";

function Dashboard({ authenticated, setAuthenticated }) {
  const [user, setUser] = useState({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [tech, setTech] = useState({});
  const [openTech, setOpenTech] = useState(false);
  const handleUpdate = (tech_id, title, status) => {
    setTech({ tech_id, title, status });
    setOpenTech(true);
  };

  const updateUser = () => {
    const userId = JSON.parse(
      localStorage.getItem("@Kenziehub:id", JSON.stringify("@kenziehub:id"))
    );
    api.get(`/users/${userId}`).then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    updateUser();
  }, []);

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  const logOut = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  return (
    <Container
      component="main"
      sx={{
        minWidth: "428px",
      }}
    >
      <Grid container spacing={4} alignItems={"stretch"}>
        <Grid item xs={12}>
          <Paper>
            <Grid container justifyContent="space-between">
              <Grid item>
                <img width={150} alt="logo" src={Logo} />
              </Grid>
              <Grid item>
                <Avatar alt="" src={user.avatar_url} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "100%",
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography component="h3" variant="h3">
                  Minhas Tecnologias
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClickOpen}>
                  <BsFillPlusSquareFill color={"#11995E"} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {user.techs?.map((item) => (
                <Grid key={item.id} item sx={{ width: "100%" }}>
                  <Skill
                    title={item.title}
                    status={item.status}
                    id={item.id}
                    handleUpdate={handleUpdate}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "100%",
            }}
          >
            Meus Trabalhos
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "100%",
            }}
          >
            <Typography>{user.name}</Typography>
            <Typography>{user.course_module}</Typography>
            <Typography>contato</Typography>
            <Typography>{user.contact}</Typography>
            <Typography>E-mail</Typography>
            <Typography>{user.email}</Typography>
            <Button onClick={() => logOut()}>Sair</Button>
          </Paper>
        </Grid>
      </Grid>
      <CardCreate open={open} setOpen={setOpen} updateUser={updateUser} />
      {openTech && (
        <CardUpdate
          open={openTech}
          setOpen={setOpenTech}
          tech={tech}
          updateUser={updateUser}
        />
      )}
    </Container>
  );
}

export default Dashboard;
