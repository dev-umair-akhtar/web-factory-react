import { Box } from "@mui/material";
import { UserService } from "../../services/UserService";
import { TableOps } from "../../types";
import { RUDTable } from "../../utilities/table/RUDTable";

const columns = {
    id: "ID",
    name: "Name",
    email: "Email",
    username: "Username",
    password: "Password",
    roleName: "Role",
};
const userTableOps: TableOps = { read: "READ ADMIN" };

function processRows(user: User) {
    return { ...user, ...user.baseUser, roleName: user.baseUser.role.name };
}

const User = () => {
    return (
        <Box p={2}>
            <RUDTable
                getter={(page, limit, search) =>
                    UserService.getInstance().getUsers(page, limit, { search })
                }
                rowsPreprocessor={processRows}
                readables={columns}
                ops={userTableOps}
            />
        </Box>
    );
};

export default User;
