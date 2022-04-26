// import Link from "next/link";

// const Index = () => {
//     return (
//         <>
//             <h1 className="jumbotron text-center bg-primary">Hello world</h1>
//             <p>from next js</p>
//             <Link href="/prepare/test">
//                 <a>create test</a>
//             </Link>
//             <div className="site-layout-background" style={{ padding: 30 }}>
//                 ...
//                 <br />
//                 Really
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 <br />
//                 long
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 ...
//                 <br />
//                 content
//             </div>
//         </>
//     );
// };
// export default Index;

import { useState } from "react";
import { Modal, Button } from "antd";

const App = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                onClick={(e) => e.stopPropogation()}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default App;
