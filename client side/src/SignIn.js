import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import getSignInTheme from "./theme/getSignInTheme";
import TemplateFrame from "./TemplateFrame";
import axios from "axios";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "gray",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "::placeholder": {
            color: "gray",
            opacity: 0.6,
          },
          color: "white",
          opacity: 0.9,
        },
      },
    },
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignIn() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  React.useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = async (event) => {
    event.preventDefault();
    const email = document.getElementById("eemail");
    const password = document.getElementById("password");
    const targetEmail = document.getElementById("target-email");
    const subject = document.getElementById("subject");
    const content = document.getElementById("content");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isValid) {
      try {
        const response = await axios.post("http://127.0.0.1:5000/login", {
          username: email.value,
          password: password.value,
          target_email: targetEmail.value,
          baslik: subject.value,
          icerik: content.value,
        });
        if (response.data.status === "success") {
          setSnackbarMessage(
            "[EN] Email sent successfully.\n[TR] Email başarıyla gönderildi."
          );
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage(
            "[EN] An error occurred while sending the email. Please check the parameters!\n[TR] Email gönderilirken hata oluştu. Lütfen parametreleri kontrol edin!"
          );
          setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage(
          "[EN] There was a problem connecting to the API. Please check that both programs are open. \n[TR] API'ye bağlanırken sorun oluştu. Lütfen her iki programın da açık olduğundan emin olun."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }

    return isValid;
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Send email
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <ThemeProvider theme={theme}>
                <FormControl>
                  <FormLabel htmlFor="eemail">Email</FormLabel>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="eemail"
                    type="email"
                    name="eemail"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? "error" : "primary"}
                    sx={{ ariaLabel: "email" }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Your app password</FormLabel>
                  <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="password"
                    placeholder="your app password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    variant="outlined"
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="target-email">Target Email</FormLabel>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="target-email"
                    type="email"
                    name="target-email"
                    placeholder="target @email.com"
                    autoComplete="email"
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? "error" : "primary"}
                    aria-label="target email"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <TextField
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    fullWidth
                    variant="outlined"
                    aria-label="subject"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <TextField
                    id="content"
                    type="text"
                    name="content"
                    placeholder="Content"
                    required
                    fullWidth
                    variant="outlined"
                    aria-label="content"
                  />
                </FormControl>
              </ThemeProvider>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                SEND
              </Button>
            </Box>
          </Card>
        </SignInContainer>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{
              width: "100%",
              bgcolor:
                snackbarSeverity === "success" ? "success.main" : "error.main",
              color: "#fff",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </TemplateFrame>
  );
}
