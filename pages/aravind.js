
import styles from '../styles/aravind.module.css'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import React, { useState } from "react";
import DialogContent from '@mui/material/DialogContent';
import { Types } from '../constants/actionTypes';
import { connect } from 'react-redux';
const aravind = (props) => {

  return (

    <div>
      
      <div >
        <Dialog open={true}>
          <DialogContent>
            <Button className={styles.leavebtn} href='./aravind'>Leave</Button>
            <Button className={styles.proceedbtn} href='./register'>Proceed </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>

  )
}
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(aravind);
