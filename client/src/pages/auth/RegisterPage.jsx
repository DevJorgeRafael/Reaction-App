import { useUser } from "../../context/userContext"
import { Box, Button, 
  Container, TextField, 
  Typography, Grid, 
  Alert, CircularProgress 
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate()
  const { register: signup, loading, isAuthenticated, errors: signUpErrors } = useUser()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/posts');
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/posts');
    }
  }, [isAuthenticated]);

  const ErrorMessage = ({ error }) => {
    return error && <Alert sx={{ width: '100%' }} variant="filled" severity="error">{error}</Alert>;
  };

  if (loading) return (
    <Container component="main" maxWidth="xs" className='auth-container'>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="/ReactiOn-logo.png" alt="Logo" width={100} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>
        <CircularProgress />
      </Box>
    </Container>
  )

  return (
    <Box
      sx={{
        marginTop: 8,
        mx: {
          xs: 2,
          sm: 0
        }
      }}
    >
      <Container component="main" maxWidth="xs" className='auth-container' sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src="/ReactiOn-logo.png" alt="Logo" width={125} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('name')}
                error = {Boolean(errors.name)}
                label="Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{ backgroundColor: '#FFFFFF', borderRadius: 1, mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('username')}
                error = {Boolean(errors.username || signUpErrors.username)}
                label="Username"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{ backgroundColor: '#FFFFFF', borderRadius: 1, mt:1 }}
              />
            </Grid>
              <ErrorMessage error={errors.name?.message || signUpErrors.name} />
              <ErrorMessage error={errors.username?.message || signUpErrors.username} />
          </Grid>

          <TextField
            {...register('email')}
            error = {Boolean(errors.email || signUpErrors.email)}
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <ErrorMessage error={errors.email?.message || signUpErrors.email} />

          <TextField
            {...register('password')}
            error = {Boolean(errors.password)}
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <ErrorMessage error={errors.password?.message || signUpErrors.password} />

          <TextField
            {...register('confirmPassword', {
              validate: value =>
                value === password || "Las contraseñas no coinciden"
            })}
            error = {Boolean(errors.confirmPassword)}
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <ErrorMessage error={errors.confirmPassword?.message} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ my: 1 }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
          <Link to='/login' variant="body2" sx={{ color: '#FFFFFF' }}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
