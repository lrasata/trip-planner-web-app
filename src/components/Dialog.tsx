import {Dialog as MuiDialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {ReactNode} from "react";

export interface DialogProps {
    open: boolean;
    onClose: (value: string) => void;
    title: string;
    content: ReactNode;
}

const Dialog = (props: DialogProps) => {
    const { onClose, open, title, content } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClose = () => {
        onClose('');
    };

    return (
        <MuiDialog onClose={handleClose} open={open} fullScreen={isMobile}>
            <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                {content}
            </DialogContent>
        </MuiDialog>
    );
}

export default Dialog;