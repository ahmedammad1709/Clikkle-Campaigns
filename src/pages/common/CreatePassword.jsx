import { Box, Button } from "@mui/material";
import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "../../components/Typography";
import { snackBar } from "../../hooks/Authorize";
import useHttpErrorHandler from "../../utilities/httpErrorHandler";
import { Form, Submit, useForm } from "./../../hooks/useForm";
import { Input } from "./../../hooks/useForm/inputs";

const CreatePassword = () => {
    const httpErrorHandler = useHttpErrorHandler();

    const { token } = useParams();
    const { showMessage } = useContext(snackBar);
    const navigate = useNavigate();

    const handlers = useForm(
        useMemo(
            () => ({
                password: { required: true },
                confirmPassword: { required: true, validator: values => values.confirmPassword },
            }),
            []
        )
    );

    const onSubmit = response => {
        const { success, message } = response.data;
        if (success) {
            showMessage({ success: message });
            navigate("/");
            return;
        }

        showMessage({ error: message });
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 5 } }}>
            <Typography
                variant='h4'
                sx={{
                    fontWeight: "500",
                }}
                gutterBottom>
                Create a password
            </Typography>
            <Typography variant='body2' sx={{ color: "rgba(0, 0, 0, 0.5)", mb: 7 }}>
                A strong password helps prevents unauthorized access to your account.
            </Typography>

            <Form
                handlers={handlers}
                onSubmit={onSubmit}
                method='post'
                action='/create-password'
                onError={httpErrorHandler}
                final={values => {
                    values.token = token;
                    return values;
                }}>
                <Typography variant='subtitle2' sx={{ fontWeight: " 500" }}>
                    New Password
                </Typography>
                <Input
                    variant='outlined'
                    type='password'
                    size='small'
                    fullWidth
                    name='password'
                    placeholder='contain at least 8 characters'
                    sx={{
                        mb: 3,
                        mt: 1,
                        "& .MuiInputBase-root": {
                            p: 0.8,
                        },
                    }}
                />
                <Typography variant='subtitle2' sx={{ fontWeight: " 500" }}>
                    Confirm new password
                </Typography>
                <Input
                    variant='outlined'
                    size='small'
                    fullWidth
                    type='password'
                    name='password'
                    placeholder='re-enter your password'
                    sx={{
                        mb: 3,
                        mt: 1,
                        "& .MuiInputBase-root": {
                            p: 0.8,
                        },
                    }}
                />

                <Submit>
                    {loader => (
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{ p: 1.5, my: 1 }}
                            disabled={Boolean(loader)}>
                            Change Password {loader}
                        </Button>
                    )}
                </Submit>
            </Form>
        </Box>
    );
};

export default CreatePassword;
