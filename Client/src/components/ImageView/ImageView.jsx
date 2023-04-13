import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material';
import React,{ useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { setUser } from '../../Redux/store';

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const CoverPhoto = styled("img")({
  width: "95%",
  height: "95%",
  objectFit: "cover",
  marginLeft:'1rem'
});



const ImageView = ({ open, setOpen, image }) => {
  
  const token = useSelector((state) => state.token);
  // const userId = useSelector((state) => state.user?._id);
  const currentUser = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', currentUser._id);
    formData.append('image', image[0]);
    formData.append('imagePath', image[0].name);
    

    console.log("////////////",formData);

    const res = await axios.post(`api/users/profile-pic/${currentUser._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    })
    const updatedUser = await res.data;
    console.log(updatedUser);
    dispatch(setUser({
      user: updatedUser
    }));
    setLoading(false);
    setOpen(false);
  }
  
  useEffect(() => {
    
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => image.forEach(img => URL.revokeObjectURL(img.preview));
  }, [image]);

  return (
    <>
      <StyledModal
        open={open}
        onClose={e => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          height: "80vh", width: { sm: '100vw', md: "50vw" }
        }} bgcolor={"background.default"} color={"text.primary"} p={5} borderRadius={5}>
          <CoverPhoto
            src={image[0]?.preview}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(image[0]?.preview) }}
          />
          {/* <Card >
            <CardMedia
              sx={{
                height: "75vh", width: { sm: '100vw', md: "50vw" }
              }}
              component='video'
              image={image[0]?.preview}
              autoPlay
              controls
              onLoad={() => { URL.revokeObjectURL(image[0]?.preview) }}
            />
          </Card> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin:"1rem"
          }}
          >
            <ButtonGroup
              sx={{
                marginInline:"1rem"
              }}
              variant='contained' color='error' aria-label='outline primary button group'>
              <Button
               onClick={e=>setOpen(false)} 
              >Cancel</Button>
            </ButtonGroup>
            <LoadingButton
              size="small"
              fullWidth
              onClick={handleUpload}
              loading={loading}
              variant="contained"
            >
              <span>upload</span>
            </LoadingButton>
          </Box>
        </Box>
      </StyledModal>
    </>
  );
}



export default ImageView;
