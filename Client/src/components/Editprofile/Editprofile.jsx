import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../utils/axios";
import { Field, Form, Formik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import { setUser } from "../../Redux/store";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const EditProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validationSchemapass = Yup.object().shape({
    passwords: Yup.object().shape({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
  });

  const validationSchemabio = Yup.object().shape({
    bio: Yup.string(),
  });

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setIsSubmitting(true);
      const userId = user._id;
      const { firstName, lastName, bio } = values;

      const { currentPassword, newPassword, confirmPassword } =
        values.passwords;

      const data = { bio, userId };

      if (newPassword) {
        data.currentPassword = currentPassword;
        data.newPassword = newPassword;
      }

      const response = await axios.put(`/api/users/profile/${userId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile Edited");
      setSuccessMessage("Profile updated successfully");
      setIsSubmitting(false);
      setOpen(false);

      dispatch(setUser({ user: response.data }));
    } catch (error) {
      toast.error("Failed tp update profile");
      setErrorMessage("Failed to update profile");
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  //Bio sumiting
  const handleSubmitBio = async (values, { setSubmitting, setErrors }) => {
    try {
      setIsSubmitting(true);
      const userId = user._id;
      const { firstName, lastName, bio } = values;

      const data = { bio, userId };

      const response = await axios.put(
        `/api/users/profilebio/${userId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile Edited");
      setSuccessMessage("Profile updated successfully");
      setIsSubmitting(false);
      setOpen(false);

      dispatch(setUser({ user: response.data }));
    } catch (error) {
      toast.error("Failed tp update profile");
      setErrorMessage("Failed to update profile");
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  const [profileEdit, setProfileEdit] = useState(true);
  return (
    <>
      <Button onClick={(e) => setOpen(true)}>Edit</Button>

      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            height: "80vh",
            width: { sm: "100vw", md: "50vw" },
          }}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => setProfileEdit(true)}>
                    <ListItemText primary="Edit Profile" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => setProfileEdit(false)}>
                    <ListItemText primary="Change Password" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            {profileEdit && (
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <Formik
                  initialValues={{
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                  }}
                  validationSchema={validationSchemabio}
                  onSubmit={handleSubmitBio}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        name="username"
                        as={TextField}
                        label="User Name"
                        variant="standard"
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        disabled
                        style={{
                          margin: "5px",
                        }}
                      />
                      <Field
                        name="email"
                        as={TextField}
                        label="Email"
                        variant="standard"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        disabled
                        style={{
                          margin: "5px",
                        }}
                      />

                      <Field
                        name="bio"
                        as={TextField}
                        label="Bio"
                        variant="standard"
                        error={touched.bio && Boolean(errors.bio)}
                        helperText={touched.bio && errors.bio}
                        style={{
                          margin: "5px",
                          width: "100%",
                        }}
                      />

                      <Button
                        sx={{
                          alignItems: "center",
                          width: "30%",
                          backgroundColor: "black",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                          marginTop: "5px",
                          marginLeft: "5px",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                        }}
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
            {!profileEdit && (
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <Formik
                  initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    passwords: {
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    },
                  }}
                  validationSchema={validationSchemapass}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        name="passwords.currentPassword"
                        as={TextField}
                        label="Current Password"
                        variant="standard"
                        type="password"
                        error={
                          touched.passwords?.currentPassword &&
                          Boolean(errors.passwords?.currentPassword)
                        }
                        helperText={
                          touched.passwords?.currentPassword &&
                          errors.passwords?.currentPassword
                        }
                        style={{
                          margin: "5px",
                        }}
                      />

                      <Field
                        name="passwords.newPassword"
                        as={TextField}
                        label="New Password"
                        variant="standard"
                        type="password"
                        error={
                          touched.passwords?.newPassword &&
                          Boolean(errors.passwords?.newPassword)
                        }
                        helperText={
                          touched.passwords?.newPassword &&
                          errors.passwords?.newPassword
                        }
                        style={{
                          margin: "5px",
                        }}
                      />

                      <Field
                        name="passwords.confirmPassword"
                        as={TextField}
                        label="Confirm Password"
                        variant="standard"
                        type="password"
                        error={
                          touched.passwords?.confirmPassword &&
                          Boolean(errors.passwords?.confirmPassword)
                        }
                        helperText={
                          touched.passwords?.confirmPassword &&
                          errors.passwords?.confirmPassword
                        }
                        style={{
                          margin: "5px",
                        }}
                      />

                      <Button
                        type="submit"
                        sx={{
                          width: "50%",
                          backgroundColor: "#938eef",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "rebeccapurple",
                          },
                        }}
                        variant="contained"
                      >
                        submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
          </Stack>
        </Box>
      </StyledModal>
    </>
  );
};

export default EditProfile;
