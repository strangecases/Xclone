import { useDispatch } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Row, Col } from "antd";
import allActions from "../store/actions";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/pageStyles/Auth.module.css";
import { loginSchema } from "../yupUtil";
import IsNotLoggedIn from "../components/routes/IsNotLoggedIn";

const Login = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async ({ email, password }) => {
        dispatch(allActions.adminActions.logIn({ email, password }));
    };

    return (
        <IsNotLoggedIn>
            {console.log(
                process.env.NEXT_PUBLIC_NODE_ENV,
                process.env.NEXT_PUBLIC_BACK_URL
            )}
            <h2 className={authStyles.headingAuth}>Login</h2>

            <Row justify="center">
                <Col xs={22} sm={12} md={10} lg={8} span={8}>
                    <Card className={authStyles["blue-tint"]}>
                        <Form
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                            noValidate
                        >
                            <FormInput
                                control={control}
                                errors={errors}
                                name="email"
                                placeholder="Enter email"
                                type="email"
                            />
                            <FormInput
                                control={control}
                                errors={errors}
                                name="password"
                                placeholder="Enter password"
                                type="password"
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={authStyles["width-100"]}
                                disabled={!isDirty || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <SyncOutlined spin />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Form>

                        <p
                            className={`${authStyles["text-center"]}
                                ${authStyles["margin-top"]}`}
                        >
                            Not yet registered?
                            <Link href="/register">
                                <a> Register</a>
                            </Link>
                        </p>
                        <p className={authStyles["text-center"]}>
                            <Link href="/forgot-password">
                                <a className="text-danger"> Forgot Password</a>
                            </Link>
                        </p>
                    </Card>
                </Col>
            </Row>
        </IsNotLoggedIn>
    );
};
export default Login;
