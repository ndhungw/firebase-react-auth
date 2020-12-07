import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TransitionAlerts from "./TransitionAlert";
import { useAuth } from "../contexts/AuthContext";
import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  routerLink: {
    textDecoration: "none",
  },
}));

export default function SignUp() {
  const classes = useStyles();

  // refs
  // const fnameRef = useRef();
  // const lnameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  const [values, setValues] = useState({
    // fname: "",
    // lname: "",
    email: "",
    password: "",
    // passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match");
    // }

    try {
      setError("");
      setLoading(true);
      // console.log(emailRef.current.value, "+", passwordRef.current.value);
      // await signup(emailRef.current.value, passwordRef.current.value);
      console.log(values.email, values.password);
      await signup(values.email, values.password);
      history.push("/login");
    } catch (err) {
      setError(err.message);
      console.log("err", err);
    }

    setLoading(false);
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs" component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {error && <TransitionAlerts severity="error" alertMessage={error} />}

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="outlined"
                id="first-name"
                name="fname"
                autoComplete="given-name"
                // inputRef={fnameRef}
                value={values.fname}
                label="First name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="outlined"
                id="last-name"
                name="lname"
                autoComplete="family-name"
                // inputRef={lnameRef}
                value={values.lname}
                label="Last name"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                id="email"
                name="email"
                autoComplete="email"
                // inputRef={emailRef}
                value={values.email}
                onChange={handleChange("email")}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  // inputRef={passwordRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={75}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={values.showPassword ? "text" : "password"}
                  //   value={values.passwordConfirm}
                  //   onChange={handleChange("passwordConfirm")}
                  inputRef={passwordConfirmRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={130}
                />
              </FormControl>
            </Grid> */}
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/login" className={classes.routerLink}>
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
