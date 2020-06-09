import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar(props: {open: boolean, handleClose: () => void}) {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={props.open}
                onClose={props.handleClose}
                message="Something went wrong, please try again later!"
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            style={{color: '#fc6355'}}
                            onClick={props.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}