import styles from '../styles/register.module.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import DatePicker from '@mui/material/DatePicker';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Types } from '../constants/actionTypes';
import { connect } from 'react-redux';
import React, { useState, createRef } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Home = (props) => {
  const ref = createRef();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      date_birth: '',
      mobile: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required(
          'Name is required'),
      date_birth: Yup
        .date()
        .nullable()
        .required(
          'Birth date is required'),
      mobile: Yup
        .string()
        .min(10)
        .max(10)
        .required(
          'Mobile number is required'),
    }),
    onSubmit: () => {
      saveData()
    },
  });
  const saveData = () => {
    const object = {
      name: formik.values.name,
      mobile: formik.values.mobile,
      date_birth: formik.values.date_birth
    }
    const userDetails = props.profile
    const findObject = userDetails.find(item => item.name === object.name && item.mobile === object.mobile && item.date_birth === object.date_birth);
    if (!!findObject) {
      toast.error("Records Exist")
    } else {
      userDetails.push(object)
      props.save_user_data({ user: userDetails });
      formik.resetForm()
      toast.success("Succesfully Added data")
      router.push('./aravind')
    }

  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4} className={styles.fullheight} display={'flex'} alignItems={'center'} justifyContent={'center'}>

          <form onSubmit={formik.handleSubmit}>

            <Typography variant="h3" mt={2} mb={4} > Registration </Typography>
            <Box className={styles.inputMain}>
              <TextField
                label="Name"
                fullWidth
                id="outlined-basic" variant="outlined"
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />


            </Box>

            
            <Box className={styles.inputMain}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                maxDate = {new Date('')}
                fullWidth
                error={Boolean(formik.touched.date_birth && formik.errors.date_birth)}
                helperText={formik.touched.date_birth && formik.errors.date_birth}
                name="date_birth"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.date_birth}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: new Date().toISOString().slice(0, 10),
                  //max: new Date().toISOString().slice(0, 16)
                }}
                //type="datetime-local"
              />


            </Box>

            {/* <DatePicker
    
    mode="landscape"
    
    floatingLabelText="Date"
    
    maxDate={new Date()}  //maxDate
/> */}
            <Box className={styles.inputMain}>
              <TextField
                id="outlined-basic"
                error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                inputRef={ref}
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="mobile"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mobile}
              /></Box>        <Box>
              <Button className={styles.btn} type='submit'>Submit</Button>
            </Box>
          </form>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>


    </>
  )
}

const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);


