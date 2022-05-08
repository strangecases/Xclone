import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import allActions from "../../store/actions";

const AdminRoute = ({ children }) => {
    const [ok, setOk] = useState(true);

    const router = useRouter();

    const { admin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axios.get("/api/current-admin");
                if (data.ok) {
                    setOk(true);
                }
            } catch (err) {
                console.log(err);
                dispatch(allActions.adminActions.logOut());
                setOk(false);
                router.push("/login");
            }
        };
        fetchAdmin();
    }, [router, ok, dispatch, admin]);

    return (
        <div>
            {ok ? (
                <> {children} </>
            ) : (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-primary p-5"
                />
            )}
        </div>
    );
};

export default AdminRoute;