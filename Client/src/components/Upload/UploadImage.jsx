import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDropzone} from "react-dropzone";
import { styled } from '@mui/material';
import ImageView from '../ImageView/ImageView';
import React, {  useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const UploadImage = ({ open, setOpen }) => {
    const [files, setFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            setOpen(false)
            setImagePreview(open)
        }
    });


    return (
        <>

<div className="images">
        
        <AddCircleIcon onClick={e => setOpen(true)}/>
          
      </div>
            <StyledModal
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={190} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>
                    <Typography variant="h6" color="gray" textAlign="center">
                       Upload Image
                    </Typography>
                        <Box {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <Box
                                border={"2px dashed "}
                                sx={{
                                padding: "3rem",
                                marginTop:"1rem",
                                textAlign: "center",
                                "&:hover": { cursor: "pointer" }
                            }}>
                                <p>Add Picture Here</p>
                            </Box>
                        </Box>
                </Box>
            </StyledModal>
            <ImageView open={ imagePreview } setOpen={ setImagePreview } image={files} />
        </>
    )
}

export default UploadImage
